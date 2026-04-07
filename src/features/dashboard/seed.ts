import type { LayoutItem } from 'react-grid-layout'
import type { AppBreakpoint, WidgetType } from './types'

export const seedWidgetTypes: Record<string, WidgetType> = {
  w1: 'spinner',
  w2: 'table',
  w3: 'barchart',
  w4: 'stats',
  w5: 'clock',
  w6: 'spinner',
  w7: 'stats',
  w8: 'barchart',
}

export const seedLayouts: Record<AppBreakpoint, LayoutItem[]> = {
  // 12 columns — desktop
  lg: [
    { i: 'w1', x: 0, y: 0, w: 4, h: 4, minW: 2, minH: 3 },
    { i: 'w2', x: 4, y: 0, w: 8, h: 4, minW: 1, minH: 3 },
    { i: 'w3', x: 0, y: 4, w: 6, h: 4, minW: 2, minH: 3 },
    { i: 'w4', x: 6, y: 4, w: 3, h: 4, minW: 1, minH: 3 },
    { i: 'w5', x: 9, y: 4, w: 3, h: 4, minW: 1, minH: 3 },
    { i: 'w6', x: 0, y: 8, w: 3, h: 4, minW: 2, minH: 3 },
    { i: 'w7', x: 3, y: 8, w: 5, h: 4, minW: 1, minH: 3 },
    { i: 'w8', x: 8, y: 8, w: 4, h: 4, minW: 2, minH: 3 },
  ],
  // 8 columns — tablet
  md: [
    { i: 'w1', x: 0, y: 0, w: 2, h: 4, minW: 1, minH: 3 },
    { i: 'w2', x: 2, y: 0, w: 6, h: 4, minW: 1, minH: 3 },
    { i: 'w3', x: 0, y: 4, w: 4, h: 4, minW: 2, minH: 3 },
    { i: 'w4', x: 4, y: 4, w: 2, h: 4, minW: 1, minH: 3 },
    { i: 'w5', x: 6, y: 4, w: 2, h: 4, minW: 1, minH: 3 },
    { i: 'w6', x: 0, y: 8, w: 2, h: 4, minW: 1, minH: 3 },
    { i: 'w7', x: 2, y: 8, w: 4, h: 4, minW: 1, minH: 3 },
    { i: 'w8', x: 6, y: 8, w: 2, h: 4, minW: 2, minH: 3 },
  ],
  // 4 columns — mobile
  sm: [
    { i: 'w1', x: 0, y: 0,  w: 2, h: 3, minW: 1, minH: 2 },
    { i: 'w2', x: 2, y: 0,  w: 2, h: 4, minW: 1, minH: 3 },
    { i: 'w3', x: 0, y: 4,  w: 4, h: 4, minW: 2, minH: 3 },
    { i: 'w4', x: 0, y: 8,  w: 2, h: 3, minW: 1, minH: 2 },
    { i: 'w5', x: 2, y: 8,  w: 2, h: 3, minW: 1, minH: 2 },
    { i: 'w6', x: 0, y: 11, w: 2, h: 3, minW: 1, minH: 2 },
    { i: 'w7', x: 2, y: 11, w: 2, h: 3, minW: 1, minH: 2 },
    { i: 'w8', x: 0, y: 14, w: 4, h: 4, minW: 2, minH: 3 },
  ],
}
