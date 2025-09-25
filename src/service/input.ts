export function gainFocus(inputCmp: any|null, selectAll: boolean = false)
{
  setTimeout(() => {

    if (!inputCmp) { return }
    if (!inputCmp.value) { return }
    if (!inputCmp.value.$el) { return }

    const EL = inputCmp.value.$el
    if (typeof EL.setFocus === "function") { EL.setFocus() }

    if (!selectAll) { return }
    if (typeof EL.querySelector === "function")
    {

      const nativeInput = EL.querySelector('input')
      if (typeof nativeInput.select === "function") { nativeInput.select() }

    }

  }, 300)
}