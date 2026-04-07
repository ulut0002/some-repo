export type WidgetType = 'spinner' | 'table' | 'barchart' | 'stats' | 'clock'
export type ViewMode = 'auto' | 'card' | 'table'

export type AppBreakpoint = 'lg' | 'md' | 'sm'

export const BREAKPOINTS: Record<AppBreakpoint, number> = { lg: 1200, md: 768, sm: 0 }
export const COLS: Record<AppBreakpoint, number> = { lg: 12, md: 8, sm: 4 }

export function getBreakpoint(width: number): AppBreakpoint {
  if (width >= 1200) return 'lg'
  if (width >= 768) return 'md'
  return 'sm'
}
