import { Trash2, Wand2, LayoutGrid, Table2 } from 'lucide-react'
import { Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { ViewMode } from './types'

interface Props {
  id: string
  title: string
  children: React.ReactNode
  onDeleteRequest: (id: string) => void
  supportsViewMode?: boolean
  viewMode?: ViewMode
  onViewModeChange?: (mode: ViewMode) => void
}

const VIEW_MODES: { mode: ViewMode; Icon: React.ElementType; labelKey: string }[] = [
  { mode: 'auto',  Icon: Wand2,       labelKey: 'dashboard.viewMode.auto' },
  { mode: 'card',  Icon: LayoutGrid,  labelKey: 'dashboard.viewMode.card' },
  { mode: 'table', Icon: Table2,      labelKey: 'dashboard.viewMode.table' },
]

export default function WidgetWrapper({
  id, title, children, onDeleteRequest,
  supportsViewMode, viewMode, onViewModeChange,
}: Props) {
  const { t } = useTranslation('dashboard')

  return (
    <div className="@container flex h-full flex-col overflow-hidden border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="drag-handle flex cursor-grab items-center justify-between border-b border-gray-100 px-3 py-2 active:cursor-grabbing dark:border-gray-700">
        <span className="truncate text-sm font-medium text-gray-600 dark:text-gray-300">{title}</span>
        <div className="flex shrink-0 items-center gap-1 pl-2">
          {/* View mode toggle — only for widgets that support it */}
          {supportsViewMode && (
            <div
              className="flex items-center rounded border border-gray-200 dark:border-gray-600"
              role="group"
              aria-label={t('dashboard.viewMode.ariaLabel')}
            >
              {VIEW_MODES.map(({ mode, Icon, labelKey }) => (
                <Tooltip key={mode} title={t(labelKey)} placement="top" arrow>
                  <button
                    type="button"
                    onClick={() => onViewModeChange?.(mode)}
                    className={`rounded p-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 ${
                      viewMode === mode
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                        : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                    }`}
                    aria-label={t(labelKey)}
                    aria-pressed={viewMode === mode}
                  >
                    <Icon size={12} aria-hidden />
                  </button>
                </Tooltip>
              ))}
            </div>
          )}
          {/* Delete */}
          <Tooltip title={t('dashboard.removeWidget')} placement="top" arrow>
            <button
              type="button"
              onClick={() => onDeleteRequest(id)}
              className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400 dark:text-gray-500 dark:hover:bg-red-900/30 dark:hover:text-red-400"
              aria-label={t('dashboard.removeWidget')}
            >
              <Trash2 size={14} aria-hidden />
            </button>
          </Tooltip>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
