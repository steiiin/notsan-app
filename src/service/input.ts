export function gainFocus(inputCmp: any|null, selectAll: boolean = false)
{
  setTimeout(() => {

    if (!inputCmp) { return }
    if (!inputCmp.value) { return }
    if (!inputCmp.value.$el) { return }

    const EL = inputCmp.value.$el
    if (typeof EL.setFocus === "function") { EL.setFocus() }
    else
    {
      // fallback for multi-input components
      const fallbackEL = EL.querySelector('ion-input')
      if (fallbackEL && typeof fallbackEL.setFocus === "function") { fallbackEL.setFocus() }
    }

    if (!selectAll) { return }
    if (typeof EL.querySelector === "function")
    {

      const nativeInput = EL.querySelector('input')
      if (typeof nativeInput.select === "function") { nativeInput.select() }

    }

  }, 300)
}

export function scrollTo(contentCmp: any|null, pos: number)
{
  setTimeout(() => {

    if (!contentCmp) { return }
    if (!contentCmp.value) { return }
    if (!contentCmp.value.$el) { return }

    const EL = contentCmp.value.$el
    if (typeof EL.scrollToPoint === "function") { EL.scrollToPoint(0, pos, 400) }

  }, 300)
}