import type { ThemeMode } from '@/types/config'

const DARK_PALETTE_CLASS = 'ion-palette-dark'

let currentThemeMode: ThemeMode = 'auto'
let mediaQuery: MediaQueryList | null = null
let hasMediaQueryListener = false

const getPrefersDarkMediaQuery = (): MediaQueryList | null => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return null
  }

  mediaQuery ??= window.matchMedia('(prefers-color-scheme: dark)')
  return mediaQuery
}

const setDarkPalette = (enabled: boolean) => {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.classList.toggle(DARK_PALETTE_CLASS, enabled)
  document.documentElement.style.colorScheme = enabled ? 'dark' : 'light'
}

const getShouldUseDarkPalette = (themeMode: ThemeMode): boolean => {
  if (themeMode === 'dark') {
    return true
  }

  if (themeMode === 'light') {
    return false
  }

  return getPrefersDarkMediaQuery()?.matches ?? false
}

const onSystemThemeChange = () => {
  if (currentThemeMode === 'auto') {
    setDarkPalette(getShouldUseDarkPalette(currentThemeMode))
  }
}

export const applyThemeMode = (themeMode: ThemeMode) => {
  currentThemeMode = themeMode
  setDarkPalette(getShouldUseDarkPalette(themeMode))

  const prefersDark = getPrefersDarkMediaQuery()
  if (!prefersDark || hasMediaQueryListener) {
    return
  }

  prefersDark.addEventListener('change', onSystemThemeChange)
  hasMediaQueryListener = true
}
