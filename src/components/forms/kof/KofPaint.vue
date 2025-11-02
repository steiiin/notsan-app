<template>
  <ion-modal :is-open="open" :keep-contents-mounted="true" :animated="true"
    @willPresent="openModal" @didDismiss="closeModal" class="kof-modal">
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
      <ion-content :force-overscroll="false" class="kof-modal--noscroll">

        <div class="layout">
          <div class="layout--paintarea" ref="observedEl">

            <div class="kof-paint">
              <div class="stage" ref="stageEl" :class="{ refreshing }">
                <img :src="mannequinSource" ref="mannequinImg"
                  class="stage--bg" draggeable="false" @load="initPaint(false)">
                </img>

                <!-- painting layer -->
                <canvas ref="burns" :class="{ hidden: refreshing }"></canvas>
                <canvas ref="scratch" class="scratch" :class="{ hidden: refreshing }"></canvas>

                <!-- hidden canvases: mask & weights -->
                <canvas ref="mask" class="hidden"></canvas>
                <canvas ref="weights" class="hidden"></canvas>

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
            <kof-paint-tool-selector v-model="selectedTool" class="ion-padding">
            </kof-paint-tool-selector>
          </div>
        </div>

      </ion-content>
    </ion-page>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonModal, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/vue'
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { KofAgeValue, KofCalculation, KofInfo, KofPaintState } from '@/types/forms/kof';

import NsButtonGroup from '@/components/NsButtonGroup.vue';
import KofPaintToolSelector from './KofPaintToolSelector.vue';

const props = defineProps<{
  modelValue: KofInfo
  open: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: KofInfo): void
  (event: 'update:open', value: boolean): void,
  (e: 'closed'): void
}>()

// ########################################################

type ToolValue = '1st'|'2nd'|'3rd'|'erase'

const selectedAge = ref<KofAgeValue>('adult')
const selectedTool = ref<ToolValue>('1st')

// ########################################################

const observedEl = ref<HTMLDivElement|null>(null);
const stageEl = ref<HTMLDivElement|null>(null);
const mannequinImg = ref<HTMLImageElement|null>(null);

const burns = ref<HTMLCanvasElement|null>(null)
const scratch = ref<HTMLCanvasElement|null>(null)
const mask = ref<HTMLCanvasElement|null>(null)
const weights = ref<HTMLCanvasElement|null>(null)

// #region image ressources

  import mannequinSourceAdult from '@/data/assets/mannequins/mannequin-adult.png'
  import mannequinSourceChild from '@/data/assets/mannequins/mannequin-child.png'
  import mannequinSourceBaby from '@/data/assets/mannequins/mannequin-baby.png'
  import maskSourceAdult from '@/data/assets/mannequins/mask-adult.png'
  import maskSourceChild from '@/data/assets/mannequins/mask-child.png'
  import maskSourceBaby from '@/data/assets/mannequins/mask-baby.png'
  import weightSourceAdult from '@/data/assets/mannequins/weights-adult.png'
  import weightSourceChild from '@/data/assets/mannequins/weights-child.png'
  import weightSourceBaby from '@/data/assets/mannequins/weights-baby.png'
import { brush, create, refresh } from 'ionicons/icons';

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
  const weightsSource = computed(() => {
    if (selectedAge.value == 'child') { return weightSourceChild }
    if (selectedAge.value == 'baby') { return weightSourceBaby }
    return weightSourceAdult
  })

// #endregion

// #region painting

  const initPaint = async (loadState = false) => {

    refreshing.value = true

    // ensure mannequin is completed (for layouting)
    const img = mannequinImg.value!
    if (!img.complete) {
      await img.decode().catch(() => new Promise<void>(res => (img.onload = () => res())))
    }

    // create necessary data
    await nextTick()
    initBackstores()
    await loadMaskToCanvas()
    await loadWeightsToCanvas()
    buildRegionUnits(percentTable.value)
    redrawDisplay()
    if (loadState) { loadKofInfoPaintState() }

    refreshing.value = false

  }

  const closePaint = () => {

    refreshing.value = true

    unbindPointerEvents()
    detachResizeObserver()

  }

  // #region scratch-logic

    const brushPx = ref(10)
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
      brushPx.value = Math.max(1, Math.min(cssW, cssH)) / 8

      // resize canvases
      for (const c of [burns.value!, scratch.value!, mask.value!, weights.value!]) {
        c.style.width = `${cssW}px`
        c.style.height = `${cssH}px`
        c.width  = cssW * dpr
        c.height = cssH * dpr
      }

      W = burns.value!.width
      H = burns.value!.height
      classMap = new Uint8Array(W * H)

    }

    // load images
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
    const loadWeightsToCanvas = async () => {
      const m = new Image()
      m.src = weightsSource.value
      await m.decode().catch(() => new Promise<void>(res => (m.onload = () => res())))
      const wctx = weights.value!.getContext('2d')!
      wctx.clearRect(0, 0, W, H)
      wctx.drawImage(m, 0, 0, W, H)
      const weightsData = wctx.getImageData(0, 0, W, H).data
      regionMap = new Uint8Array(W * H)

      // use RED channel as region id
      for (let i=0, p=0; i<weightsData.length; i+=4, p++) {
        const regionId = weightsData[i]
        regionMap[p] = regionId
      }
    }

    // helpers
    const insideSilhouette = (i: number) => !!allowMask && allowMask[i] === 1
    const idx = (x: number, y: number) => y * W + x
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const toCanvasXY = (ev: PointerEvent) => {
      const el = scratch.value!
      const r = el.getBoundingClientRect()
      const x = (ev.clientX - r.left) * (el.width  / r.width)
      const y = (ev.clientY - r.top)  * (el.height / r.height)
      return { x, y }
    }

    const writeClass = (i: number, v: 0 | 1 | 2 | 3) => {
      if (!insideSilhouette(i)) return
      classMap![i] = v
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
        if (v === 1) { r=212; g=172; b=13 }     // 1° yellow
        if (v === 2) { r=192; g=57; b=43 }     // 2° red
        if (v === 3) { r=142; g=68;   b=173 }     // 3° violet
        data[o] = r; data[o+1] = g; data[o+2] = b; data[o+3] = a
      }
      ctx.putImageData(img, 0, 0)
    }

  // #endregion
  // #region pointer events

    const onPointerDown = (e: PointerEvent) => {

      isDrawing.value = true
      scratch.value!.setPointerCapture(e.pointerId)

      const { x, y } = toCanvasXY(e)
      lastX = x; lastY = y

      paintDot(x, y, brushPx.value, classValueForTool(selectedTool.value))
      redrawDisplay()

      e.preventDefault()
      e.stopPropagation()

    }

    const onPointerMove = (e: PointerEvent) => {

      if (!isDrawing.value) return

      const { x, y } = toCanvasXY(e)

      paintStrokeSegment(lastX, lastY, x, y, brushPx.value, classValueForTool(selectedTool.value))
      redrawDisplay()

      lastX = x; lastY = y

      e.preventDefault()
      e.stopPropagation()

    }

    const onPointerUp = (e?: PointerEvent) => {

      isDrawing.value = false
      if (e && scratch.value?.hasPointerCapture(e.pointerId)) {
        scratch.value.releasePointerCapture(e.pointerId)
      }

      const info = createKofInfo()
      emit('update:modelValue', info)

    }

    const onPointerCancel = (e: PointerEvent) => {
      onPointerUp(e)
    }

    const pointerEventsRegistered = ref(false)
    const bindPointerEvents = () => {
      if (pointerEventsRegistered.value) { return }

      const el = scratch.value!

      el.style.pointerEvents = 'auto'
      el.addEventListener('pointerdown', onPointerDown, { passive: false })
      el.addEventListener('pointermove', onPointerMove, { passive: false })
      el.addEventListener('pointerup', onPointerUp, { passive: false })
      el.addEventListener('pointercancel', onPointerCancel, { passive: false })
      pointerEventsRegistered.value = true

    }
    const unbindPointerEvents = () => {

      const el = scratch.value!

      el.style.pointerEvents = 'none'
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerCancel)
      pointerEventsRegistered.value = false

    }

  // #endregion

  // #region resize/loading

    const refreshing = ref(true)

    watch(() => selectedAge.value, (v) => {
      refreshing.value = true
      emit('update:modelValue', { patientAge: v })
    })

    let imgResizeObserver: ResizeObserver|null = null
    let imgResizeDebounceTimer: number|null = null
    let imgResizeGen = 0

    const attachResizeObserver = () => {
      if (imgResizeObserver || !mannequinImg.value) { return }
      imgResizeObserver = new ResizeObserver(() => {
        refreshing.value = true
        if (imgResizeDebounceTimer) { window.clearTimeout(imgResizeDebounceTimer) }
        imgResizeDebounceTimer = window.setTimeout(async () => {
          await nextTick()
          const myGen = ++imgResizeGen
          await initPaint(true)
          if (myGen !== imgResizeGen) { return }
        })
      })
      imgResizeObserver.observe(observedEl.value!)
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

// #end region

// #region kof calculation

  const percCutoff = 0.03
  const critCutoff = 5

  const calculateKOF = (): KofCalculation => {
    const regionSums: Record<number, number> = {}
    let u1 = 0, u2 = 0, u3 = 0
    for (let i = 0; i < classMap!.length; i++) {
      if (!insideSilhouette(i)) continue
      const v = classMap![i]
      if (v === 0) continue
      const r = regionMap![i]
      const u = regionUnit[r] || 0
      if (v === 1) u1 += u
      else if (v === 2) u2 += u
      else if (v === 3) u3 += u
      if (v == 2 || v == 3) {
        regionSums[r] = (regionSums[r] ?? 0) + u
      }
    }

    const pctByRegion = (r: number) => (((regionSums[r] ?? 0) / scale) / percentTable.value[r])*100
    const regions = {
      face: pctByRegion(R.HEAD_F),
      hands: pctByRegion(R.HANDS),
      genital: pctByRegion(R.GENITAL),
    }

    const pct1 = u1 / scale
    const pct2 = u2 / scale
    const pct3 = u3 / scale
    const total = Math.min(100, (u1 + u2 + u3) / scale)

    return {
      perc1st: pct1,
      perc2nd: pct2,
      perc3rd: pct3,
      has1st: (pct1>percCutoff),
      has2nd: (pct2>percCutoff),
      has3rd: (pct3>percCutoff),
      percTotal: total,
      criticalRegions: {
        ...regions,
        hasFace: regions.face>critCutoff,
        hasHands: regions.hands>critCutoff,
        hasGenital: regions.genital>critCutoff,
      },
    }

  }

  const scale = 10000 // 100.00% resolution
  let regionMap: Uint8Array|null = null
  let regionUnit: number[] = []
  let totalUnits = 100 * scale

  const R = {
    NONE: 0,
    HEAD_F: 10,
    HEAD_B: 20,
    ARM_L: 40,
    ARM_R: 60,
    HANDS: 220,
    LEG_FL: 80,
    LEG_FR: 100,
    LEG_BL: 120,
    LEG_BR: 140,
    CHEST_F: 160,
    CHEST_B: 180,
    GENITAL: 200,
  }

  const percentTableAdult: Record<number, number> = {
    [R.HEAD_F]: 4.5,
    [R.HEAD_B]: 4.5,
    [R.ARM_L]: 6.5,
    [R.ARM_R]: 6.5,
    [R.HANDS]: 5,
    [R.LEG_FL]: 9,
    [R.LEG_FR]: 9,
    [R.LEG_BL]: 9,
    [R.LEG_BR]: 9,
    [R.CHEST_F]: 18,
    [R.CHEST_B]: 18,
    [R.GENITAL]: 1,
  }

  const percentTableChild: Record<number, number> = {
    [R.HEAD_F]: 6.5,
    [R.HEAD_B]: 6.5,
    [R.ARM_L]: 6.5,
    [R.ARM_R]: 6.5,
    [R.HANDS]: 5,
    [R.LEG_FL]: 8,
    [R.LEG_FR]: 8,
    [R.LEG_BL]: 8,
    [R.LEG_BR]: 8,
    [R.CHEST_F]: 18,
    [R.CHEST_B]: 18,
    [R.GENITAL]: 1,
  }

  const percentTableBaby: Record<number, number> = {
    [R.HEAD_F]: 8.5,
    [R.HEAD_B]: 8.5,
    [R.ARM_L]: 4.5,
    [R.ARM_R]: 4.5,
    [R.HANDS]: 5,
    [R.LEG_FL]: 7,
    [R.LEG_FR]: 7,
    [R.LEG_BL]: 7,
    [R.LEG_BR]: 7,
    [R.CHEST_F]: 18,
    [R.CHEST_B]: 18,
    [R.GENITAL]: 1,
  }

  const percentTable = computed(() => {
    if (selectedAge.value == 'child') { return percentTableChild }
    if (selectedAge.value == 'baby') { return percentTableBaby }
    return percentTableAdult
  })

  const buildRegionUnits = (percentTable: Record<number, number>) => {
    const counts: Record<number, number> = {}
    for (let i = 0; i < regionMap!.length; i++) {
      if (!insideSilhouette(i)) continue
      const r = regionMap![i]
      if (!percentTable[r]) continue
      counts[r] = (counts[r] ?? 0) + 1
    }

    // Compute unit per pixel for each region so sums equal 100% (scaled)
    regionUnit = []
    let sumPerc = 0
    for (const rStr of Object.keys(percentTable)) {
      const r = +rStr
      const perc = percentTable[r] || 0
      sumPerc += perc
      const n = counts[r] || 0
      regionUnit[r] = n > 0 ? (perc * scale) / n : 0
    }

    totalUnits = 100 * scale
  }

// #endregion

// #region saving/loading state

  const loadKofInfoPaintState = () => {

    if (props.modelValue.patientAge !== selectedAge.value) {
      selectedAge.value = props.modelValue.patientAge
      return
    }

    if (!props.modelValue.paintState) { return }

    const state = props.modelValue.paintState
    let _classMap = null, _regionMap = null

    if (state.width == W && state.height == H)
    {
      _classMap = rleDecode(state.classMapRLE, W*H)
      _regionMap = rleDecode(state.regionMapRLE, W*H)
    }
    else
    {
      const decClassMap = rleDecode(state.classMapRLE, state.width * state.height)
      const decRegionMap = rleDecode(state.regionMapRLE, state.width * state.height)
      _classMap = resampleNearest(decClassMap, state.width, state.height, W, H)
      _regionMap = resampleNearest(decRegionMap, state.width, state.height, W, H)
    }

    classMap = _classMap

    redrawDisplay()
  }

  const createKofInfo = (): KofInfo => {
    const state: KofPaintState = {
      width: W,
      height: H,
      classMapRLE: rleEncode(classMap!),
      regionMapRLE: rleEncode(regionMap!)
    }
    return <KofInfo>{ patientAge: selectedAge.value, paintState: state, calculation: calculateKOF() }
  }

  // classMap decoder/encoder

  const rleEncode = (u8: Uint8Array): number[] => {
    const out: number[] = []
    let i = 0
    while (i < u8.length) {
      const v = u8[i]
      let run = 1
      while (i + run < u8.length && u8[i + run] === v && run < 65535) run++
      out.push(v, run) // [value, length]
      i += run
    }
    return out
  }

  const rleDecode = (rle: number[], totalLen: number): Uint8Array => {
    const out = new Uint8Array(totalLen)
    let o = 0
    for (let i=0; i<rle.length; i+=2) {
      const v = rle[i], run = rle[i+1]
      out.fill(v, o, o + run)
      o += run
    }
    return out
  }

  const resampleNearest = (src: Uint8Array, sw: number, sh: number, dw: number, dh: number): Uint8Array => {
    const dst = new Uint8Array(dw * dh)
    for (let y=0; y<dh; y++) {
      const sy = Math.min(sh-1, Math.round(y * (sh / dh)))
      for (let x=0; x<dw; x++) {
        const sx = Math.min(sw-1, Math.round(x * (sw / dw)))
        dst[y*dw + x] = src[sy*sw + sx]
      }
    }
    return dst
  }

// #endregion

const openModal = async () => {
  selectedTool.value = '1st'
  await nextTick()
  attachResizeObserver()
  bindPointerEvents()
  await initPaint(true)
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
.kof-modal--noscroll {
  --overflow: hidden;
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
  overscroll-behavior: none;
}
.kof-paint .stage.refreshing {
  opacity: .2;
  pointer-events: none;
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
  touch-action: none;
  -ms-touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.kof-paint .stage .hidden {
  display: none;
}

</style>
