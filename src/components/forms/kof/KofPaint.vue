<template>
  <ion-modal :is-open="open" @didPresent="openModal" @didDismiss="closeModal" class="kof-modal">
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>Areale</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeModal" color="primary">
              Zurück
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content :force-overscroll="false">

        <div class="layout">
          <div class="layout--paintarea">

            <div class="kof-paint">
              <div class="stage" ref="stageEl">
                <img :src="mannequinSource" ref="mannequinImg"
                  class="stage--bg" draggeable="false"
                  @load="initPaint">
                </img>

                <!-- painting layer -->
                <canvas ref="burns" :style="mannequinStageRatio" :class="{ hidden: isLoading }"></canvas>
                <canvas ref="scratch" :style="mannequinStageRatio" class="scratch" :class="{ hidden: isLoading }"></canvas>

                <!-- hidden canvases: mask & weights -->
                <canvas ref="mask" :style="mannequinStageRatio" class="hidden"></canvas>
                <canvas ref="weights" :style="mannequinStageRatio" class="hidden"></canvas>

              </div>
            </div>

          </div>
          <div class="layout--ageselectarea">
            <ns-button-group v-model="selectedAge" oneliner class="ion-padding" :options="[
              { label: 'Erwachs.', value: 'adult' },
              { label: 'Kind', value: 'child' },
              { label: 'Baby', value: 'baby' } ]">
            </ns-button-group>
          </div>
          <div class="layout--toolselectarea">
            <kof-paint-tool-selector v-model="selectedTool" @clear="clearPaint" class="ion-padding">
            </kof-paint-tool-selector>
          </div>
        </div>

      </ion-content>
    </ion-page>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonModal, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/vue'
import NsButtonGroup from '@/components/NsButtonGroup.vue';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import KofPaintToolSelector from './KofPaintToolSelector.vue';

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (event: 'update:open', value: boolean): void,
  (e: 'closed'): void
}>()

// ########################################################

type AgeValue = 'adult'|'child'|'baby'
type ToolValue = '1st'|'2nd'|'3rd'|'erase'

const selectedAge = ref<AgeValue>('adult')
const selectedTool = ref<ToolValue>('1st')

// ########################################################

const stageEl = ref<HTMLDivElement|null>(null);
const mannequinImg = ref<HTMLImageElement|null>(null);

const burns = ref<HTMLCanvasElement|null>(null)
const scratch = ref<HTMLCanvasElement|null>(null)
const mask = ref<HTMLCanvasElement|null>(null)
const weights = ref<HTMLCanvasElement|null>(null)

// #region Mannequin

  import mannequinSourceAdult from '@/data/assets/mannequins/mannequin-adult.png'
  import mannequinSourceChild from '@/data/assets/mannequins/mannequin-child.png'
  import mannequinSourceBaby from '@/data/assets/mannequins/mannequin-baby.png'
  import maskSourceAdult from '@/data/assets/mannequins/mask-adult.png'
  import maskSourceChild from '@/data/assets/mannequins/mask-child.png'
  import maskSourceBaby from '@/data/assets/mannequins/mask-baby.png'

  const mannequinSource = computed(() => {
    if (selectedAge.value == 'child') { return mannequinSourceChild }
    if (selectedAge.value == 'baby') { return mannequinSourceBaby }
    return mannequinSourceAdult
  })
  const maskSource = computed(() => {
    if (selectedAge.value == 'child') { return maskSourceChild }
    if (selectedAge.value == 'baby') { return maskSourceBaby }
    return maskSourceAdult
  })

  const mannequinImgBounding = ref<DOMRect|null>(null)

  const mannequinSourceNaturalHeight = computed(() => {
    if (selectedAge.value == 'child') { return 721 }
    if (selectedAge.value == 'baby') { return 541 }
    return 1024
  })
  const mannequinStageRatio = computed(() => {
    return `aspect-ratio: 789/${mannequinSourceNaturalHeight.value};`
  })

  const waitForImages = async () => {
    const boundMannequing = mannequinImg.value!.getBoundingClientRect()
    const boundMask = mask.value!.getBoundingClientRect()
  }

// #endregion
// #region Painting

  const brushPx = ref(14)
  const isDrawing = ref(false)
  let lastX = 0, lastY = 0

  let classMap: Uint8Array|null = null
  let maskData: Uint8ClampedArray|null = null
  let allowMask: Uint8Array|null = null
  let W = 0, H = 0

  const initBackstores = () => {

    const rect = mannequinImg.value!.getBoundingClientRect()
    const cssW = Math.max(1, Math.round(rect.width))
    const cssH = Math.max(1, Math.round(rect.height))
    const dpr = Math.max(1, Math.round(window.devicePixelRatio || 1))
    brushPx.value = Math.floor(Math.min(rect.width, rect.height) / 10)

    // Style size (CSS pixels)
    for (const c of [burns.value!, scratch.value!, mask.value!, weights.value!]) {
      c.style.width = `${cssW}px`
      c.style.height = `${cssH}px`

      // Backing store size (device pixels)
      c.width  = cssW * dpr
      c.height = cssH * dpr
    }

    // IMPORTANT: our logical grid matches the backing pixels
    W = burns.value!.width
    H = burns.value!.height
    classMap = new Uint8Array(W * H)

  }

  const loadMaskToCanvas = async () => {
    const m = new Image()
    m.src = maskSource.value
    await m.decode().catch(() => new Promise<void>(res => (m.onload = () => res())))
    const mctx = mask.value!.getContext('2d')!
    mctx.clearRect(0, 0, W, H)
    mctx.drawImage(m, 0, 0, W, H)
    maskData = mctx.getImageData(0, 0, W, H).data
    allowMask = new Uint8Array(W * H)

    const TH = 50
    for (let i=0, p=0; i<maskData.length; i+=4, p++) {
      const r = maskData[i], g = maskData[i+1], b = maskData[i+2]
      const avg = (r + g + b) / 3
      allowMask[p] = avg > TH ? 1 : 0
    }

  }

  const insideSilhouette = (i: number) => !!allowMask && allowMask[i] === 1
  const idx = (x: number, y: number) => y * W + x

  const toCanvasXY = (ev: PointerEvent) => {
    const el = scratch.value!
    const r = el.getBoundingClientRect()
    const x = (ev.clientX - r.left) * (el.width  / r.width)
    const y = (ev.clientY - r.top)  * (el.height / r.height)
    return { x, y }
  }

  const writeClass = (i: number, v: 0 | 1 | 2 | 3) => {
    if (!insideSilhouette(i)) return
    if (v === 0) { classMap![i] = 0; return }
    classMap![i] = Math.max(classMap![i], v)
  }

  const paintDot = (cx: number, cy: number, radius: number, v: 0|1|2|3) => {
    const x0 = Math.max(0, Math.floor(cx - radius))
    const x1 = Math.min(W - 1, Math.ceil(cx + radius))
    const y0 = Math.max(0, Math.floor(cy - radius))
    const y1 = Math.min(H - 1, Math.ceil(cy + radius))
    const r2 = radius * radius
    for (let y = y0; y <= y1; y++) {
      const dy = y - cy
      for (let x = x0; x <= x1; x++) {
        const dx = x - cx
        if (dx * dx + dy * dy <= r2) {
          const i = idx(x, y)
          if (v === 0) classMap![i] = 0
          else writeClass(i, v)
        }
      }
    }
  }

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const paintStrokeSegment = (x0: number, y0: number, x1: number, y1: number, radius: number, v: 0|1|2|3) => {
    const dx = x1 - x0, dy = y1 - y0
    const dist = Math.hypot(dx, dy) || 1
    const step = Math.max(1, radius * 0.6)
    const n = Math.ceil(dist / step)
    for (let k = 0; k <= n; k++) {
      const t = k / n
      paintDot(lerp(x0, x1, t), lerp(y0, y1, t), radius, v)
    }
  }

  const classValueForTool = (t: ToolValue): 0|1|2|3 => {
    if (t === '1st') return 1
    if (t === '2nd') return 2
    if (t === '3rd') return 3
    return 0 // erase
  }

  const redrawDisplay = () => {
    const ctx = burns.value!.getContext('2d')!
    const img = ctx.createImageData(W, H)
    const data = img.data
    for (let i = 0; i < classMap!.length; i++) {
      const v = classMap![i]
      const o = i * 4
      if (v === 0) { data[o+3] = 0; continue }
      let r=0, g=0, b=0, a=160
      if (v === 1) { r=255; g=225; b=0 }     // 1° yellow
      if (v === 2) { r=255; g=120; b=0 }     // 2° orange
      if (v === 3) { r=220; g=0;   b=0 }     // 3° red
      data[o] = r; data[o+1] = g; data[o+2] = b; data[o+3] = a
    }
    ctx.putImageData(img, 0, 0)
  }

  // #region PointerEvents

    function onPointerDown(e: PointerEvent) {
      isDrawing.value = true
      const { x, y } = toCanvasXY(e)
      lastX = x; lastY = y
      const v = classValueForTool(selectedTool.value)
      paintDot(x, y, brushPx.value, v)
      redrawDisplay()
      e.preventDefault()
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDrawing.value) return
      const { x, y } = toCanvasXY(e)
      const v = classValueForTool(selectedTool.value)
      paintStrokeSegment(lastX, lastY, x, y, brushPx.value, v)
      lastX = x; lastY = y
      redrawDisplay()
      e.preventDefault()
    }

    function onPointerUp() {
      isDrawing.value = false
    }

    const pointerEventsRegistered = ref(false)
    function bindPointerEvents() {
      if (pointerEventsRegistered.value) { return }

      const el = scratch.value!

      el.style.pointerEvents = 'auto'
      el.addEventListener('pointerdown', onPointerDown, { passive: false })
      el.addEventListener('pointermove', onPointerMove, { passive: false })
      window.addEventListener('pointerup', onPointerUp)
      pointerEventsRegistered.value = true

    }

    function unbindPointerEvents() {

      const el = scratch.value!

      el.style.pointerEvents = 'none'
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      pointerEventsRegistered.value = false

    }

  // #endregion
  // #region Loading/Resizing

    const isLoading = ref<boolean>(true)

    watch(() => selectedAge.value, () => {
      isLoading.value = true
    })

    let imgResizeObserver: ResizeObserver|null = null
    let imgResizeDebounceTimer: number|null = null
    let imgResizeGen = 0

    const attachResizeObserver = () => {
      if (imgResizeObserver || !mannequinImg.value) { return }
      imgResizeObserver = new ResizeObserver(() => {
        isLoading.value = true
        if (imgResizeDebounceTimer) { window.clearTimeout(imgResizeDebounceTimer) }
        imgResizeDebounceTimer = window.setTimeout(async () => {
          await nextTick()
          const myGen = ++imgResizeGen
          await initPaint()
          if (myGen !== imgResizeGen) { return }
        })
      })
      imgResizeObserver.observe(mannequinImg.value)
    }

    const detachResizeObserver = () => {
      if (imgResizeObserver) {
        imgResizeObserver.disconnect()
        imgResizeObserver = null
      }
      if (imgResizeDebounceTimer) {
        window.clearTimeout(imgResizeDebounceTimer)
        imgResizeDebounceTimer = null
      }
    }

  // #endregion

  const initPaint = async () => {

    const img = mannequinImg.value!
    if (!img.complete) {
      await img.decode().catch(() => new Promise<void>(res => (img.onload = () => res())))
    }

    await nextTick()
    initBackstores()
    await loadMaskToCanvas()
    redrawDisplay()
    isLoading.value = false

  }

  const closePaint = () => {
    unbindPointerEvents()
    detachResizeObserver()
  }

// #endregion

const clearPaint = () => {
  console.log(classMap)
  debugger
}

const openModal = async () => {
  await nextTick()
  attachResizeObserver()
  bindPointerEvents()
  await initPaint()
}

const closeModal = () => {
  emit('update:open', false)
  emit('closed')
  closePaint()
}

onBeforeUnmount(() => {
  closePaint()
})

</script>

<style>
:root {
  --minimal-kof-space: 200px;
}
</style>
<style scoped>

/* MODAL */
.kof-modal {
  --min-width: min(900px, 90vw);
}

/* LAYOUT */

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 0px 0px;
  height: 100%;
  min-height: 0;
}

.layout--ageselectarea {
  grid-area: 1 / 1 / 2 / 3;
}
.layout--paintarea {
  grid-area: 2 / 1 / 3 / 3;
  display:flex;
  justify-content:center;
  align-items:center;
}
.layout--toolselectarea {
  grid-area: 3 / 1 / 4 / 3;
}

@media (orientation: landscape) {

  .layout--ageselectarea { grid-area: 1 / 2 / 2 / 3; }
  .layout--paintarea { grid-area: 1 / 1 / 4 / 2; }
  .layout--toolselectarea { grid-area: 2 / 2 / 3 / 3; }

}

/* KOF-PAINT */

.kof-paint {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  min-width: 0;      /* avoid Firefox min-size clamping */
  position: relative;/* for absolutely positioned canvas overlay */
}

.kof-paint .stage {
  display: block;
  position: relative;
  text-align: center;
  max-width: 100%;
}
.kof-paint .stage--bg {
  max-width: min(420px, 100%);
  pointer-events: none;
  max-height: 100%;
}

.kof-paint .stage canvas {
  position: absolute;
  inset: 0;
  margin: 0 auto;
  pointer-events: none;
}

.kof-paint .stage canvas.scratch {
  pointer-events: auto;
}

.kof-paint .stage .hidden {
  display: none;
}

</style>
