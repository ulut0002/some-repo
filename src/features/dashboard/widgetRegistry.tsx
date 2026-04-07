import type { ComponentType } from 'react'
import type { WidgetType } from './types'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = ComponentType<any>
import SpinnerWidget from './widgets/SpinnerWidget'
import TableWidget from './widgets/TableWidget'
import BarChartWidget from './widgets/BarChartWidget'
import StatsWidget from './widgets/StatsWidget'
import ClockWidget from './widgets/ClockWidget'

export interface WidgetMeta {
  component: AnyComponent
  labelKey: string
  defaultW: number
  defaultH: number
  minW: number
  minH: number
  supportsViewMode?: boolean
}

export const widgetRegistry: Record<WidgetType, WidgetMeta> = {
  spinner:  { component: SpinnerWidget,  labelKey: 'dashboard.widgetTypes.spinner',  defaultW: 4, defaultH: 4, minW: 2, minH: 3 },
  table:    { component: TableWidget,    labelKey: 'dashboard.widgetTypes.table',    defaultW: 6, defaultH: 4, minW: 1, minH: 3, supportsViewMode: true },
  barchart: { component: BarChartWidget, labelKey: 'dashboard.widgetTypes.barchart', defaultW: 5, defaultH: 4, minW: 3, minH: 3 },
  stats:    { component: StatsWidget,    labelKey: 'dashboard.widgetTypes.stats',    defaultW: 3, defaultH: 4, minW: 2, minH: 3 },
  clock:    { component: ClockWidget,    labelKey: 'dashboard.widgetTypes.clock',    defaultW: 3, defaultH: 4, minW: 2, minH: 3 },
}
