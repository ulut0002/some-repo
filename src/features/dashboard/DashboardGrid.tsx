import { useState, useCallback, useEffect, useRef } from 'react'
import { GridLayout, useContainerWidth } from 'react-grid-layout'
import type { Layout, LayoutItem } from 'react-grid-layout'
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import type { WidgetType, AppBreakpoint, ViewMode } from './types'
import { COLS, getBreakpoint } from './types'
import { widgetRegistry } from './widgetRegistry'
import WidgetWrapper from './WidgetWrapper'
import { seedWidgetTypes, seedLayouts } from './seed'

const TYPES_KEY = 'dashboard-widget-types'
const LAYOUTS_KEY = 'dashboard-layouts'
const PREFS_KEY = 'dashboard-widget-prefs'

type Layouts = Record<AppBreakpoint, LayoutItem[]>

function loadWidgetTypes(): Record<string, WidgetType> {
  try {
    const raw = localStorage.getItem(TYPES_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return seedWidgetTypes
}

function loadLayouts(): Layouts {
  try {
    const raw = localStorage.getItem(LAYOUTS_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return seedLayouts
}

function saveWidgetTypes(types: Record<string, WidgetType>) {
  localStorage.setItem(TYPES_KEY, JSON.stringify(types))
}

function saveLayouts(layouts: Layouts) {
  localStorage.setItem(LAYOUTS_KEY, JSON.stringify(layouts))
}

function loadWidgetPrefs(): Record<string, ViewMode> {
  try {
    const raw = localStorage.getItem(PREFS_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return {}
}

function saveWidgetPrefs(prefs: Record<string, ViewMode>) {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
}

interface Props {
  pendingAdd: { type: WidgetType } | null
  onPendingAddConsumed: () => void
}

export default function DashboardGrid({ pendingAdd, onPendingAddConsumed }: Props) {
  const { t } = useTranslation(['dashboard', 'common'])
  const { width, containerRef } = useContainerWidth()

  const [widgetTypes, setWidgetTypes] = useState<Record<string, WidgetType>>(loadWidgetTypes)
  const [layouts, setLayouts] = useState<Layouts>(loadLayouts)
  const [widgetPrefs, setWidgetPrefs] = useState<Record<string, ViewMode>>(loadWidgetPrefs)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const breakpoint = getBreakpoint(width)
  const cols = COLS[breakpoint]
  const layout: LayoutItem[] = layouts[breakpoint] ?? []

  // Add widget
  const lastProcessed = useRef<{ type: WidgetType } | null>(null)

  useEffect(() => {
    if (!pendingAdd || pendingAdd === lastProcessed.current) return
    lastProcessed.current = pendingAdd

    const id = `${pendingAdd.type}-${Date.now()}`
    const meta = widgetRegistry[pendingAdd.type]

    setWidgetTypes((prev) => {
      const updated = { ...prev, [id]: pendingAdd.type }
      saveWidgetTypes(updated)
      return updated
    })

    setLayouts((prev) => {
      const updated = { ...prev } as Layouts
      for (const bp of Object.keys(COLS) as AppBreakpoint[]) {
        const maxCols = COLS[bp]
        const newItem: LayoutItem = {
          i: id,
          x: 0,
          y: Infinity,
          w: Math.min(meta.defaultW, maxCols),
          h: meta.defaultH,
          minW: Math.min(meta.minW ?? 1, maxCols),
          minH: meta.minH,
        }
        updated[bp] = [...(prev[bp] ?? []), newItem]
      }
      saveLayouts(updated)
      return updated
    })

    onPendingAddConsumed()
  }, [pendingAdd, onPendingAddConsumed])

  // Layout change (drag/resize)
  const handleLayoutChange = useCallback((newLayout: Layout) => {
    setLayouts((prev) => {
      const updated = {
        ...prev,
        [breakpoint]: Array.from(newLayout),
      }
      saveLayouts(updated)
      return updated
    })
  }, [breakpoint])

  // View mode preference
  const handleViewModeChange = useCallback((id: string, mode: ViewMode) => {
    setWidgetPrefs((prev) => {
      const updated = { ...prev, [id]: mode }
      saveWidgetPrefs(updated)
      return updated
    })
  }, [])

  // Delete
  const confirmDelete = useCallback(() => {
    if (!confirmId) return
    setWidgetTypes((prev) => {
      const { [confirmId]: _, ...rest } = prev
      saveWidgetTypes(rest)
      return rest
    })
    setLayouts((prev) => {
      const updated = {} as Layouts
      for (const bp of Object.keys(COLS) as AppBreakpoint[]) {
        updated[bp] = (prev[bp] ?? []).filter((item) => item.i !== confirmId)
      }
      saveLayouts(updated)
      return updated
    })
    setConfirmId(null)
  }, [confirmId])

  // Visible widget ids (intersection of types + current layout)
  const visibleIds = layout.map((l) => l.i).filter((id) => widgetTypes[id])

  return (
    <>
      <div ref={containerRef as React.RefObject<HTMLDivElement>}>
        {width > 0 && (
          <GridLayout
            layout={layout}
            width={width}
            onLayoutChange={handleLayoutChange}
            gridConfig={{ cols, rowHeight: 60, margin: [0, 0], containerPadding: [0, 0] }}
            dragConfig={{ handle: '.drag-handle' }}
            resizeConfig={{ handles: ["s", "w", "e", "n", "sw", "nw", "se", "ne"] }}
          >
            {visibleIds.map((id) => {
              const type = widgetTypes[id]
              const { component: WidgetComponent, labelKey, supportsViewMode } = widgetRegistry[type]
              const viewMode: ViewMode = (supportsViewMode ? widgetPrefs[id] : undefined) ?? 'auto'
              return (
                <div key={id}>
                  <WidgetWrapper
                    id={id}
                    title={t(labelKey)}
                    onDeleteRequest={setConfirmId}
                    supportsViewMode={supportsViewMode}
                    viewMode={viewMode}
                    onViewModeChange={(mode) => handleViewModeChange(id, mode)}
                  >
                    <WidgetComponent viewMode={viewMode} />
                  </WidgetWrapper>
                </div>
              )
            })}
          </GridLayout>
        )}
      </div>

      <Dialog
        open={confirmId !== null}
        onClose={() => setConfirmId(null)}
        aria-labelledby="confirm-remove-title"
      >
        <DialogTitle id="confirm-remove-title" className="text-base font-semibold">
          {t('dashboard.removeWidget')}
        </DialogTitle>
        <DialogContent>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t('dashboard.confirmRemove')}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmId(null)}>{t('common:common.cancel')}</Button>
          <Button onClick={confirmDelete} color="error">{t('common:common.delete')}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
