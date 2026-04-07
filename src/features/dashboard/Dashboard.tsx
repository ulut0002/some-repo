import { useState, useCallback } from 'react'
import { Button, IconButton, Switch, Tooltip, FormControlLabel } from '@mui/material'
import { Plus, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import DashboardGrid from './DashboardGrid'
import AddWidgetDialog from './AddWidgetDialog'
import LanguageSelector from './LanguageSelector'
import ThemeToggle from '../theme/ThemeToggle'
import type { WidgetType } from './types'

const STORAGE_KEYS = ['dashboard-widget-types', 'dashboard-layouts', 'dashboard-widgets']

export default function Dashboard() {
  const { t } = useTranslation('dashboard')
  const [addOpen, setAddOpen] = useState(false)
  const [pendingAdd, setPendingAdd] = useState<{ type: WidgetType } | null>(null)
  const [resetKey, setResetKey] = useState(0)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  const handleReset = useCallback(() => {
    STORAGE_KEYS.forEach((k) => localStorage.removeItem(k))
    setResetKey((n) => n + 1)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('dashboard.title')}</h1>
        <div className="flex items-center gap-2">
          <FormControlLabel
            control={
              <Switch
                checked={animationsEnabled}
                onChange={(e) => setAnimationsEnabled(e.target.checked)}
                size="small"
              />
            }
            label={<span className="text-xs text-gray-600 dark:text-gray-300">{t('dashboard.animate')}</span>}
            labelPlacement="start"
            sx={{ marginLeft: 0, marginRight: 0, gap: '4px' }}
          />
          <Tooltip title={t('dashboard.resetLayout')} arrow>
            <IconButton
              size="small"
              onClick={handleReset}
              aria-label={t('dashboard.resetLayout')}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-200"
            >
              <RotateCcw size={16} aria-hidden />
            </IconButton>
          </Tooltip>
          <ThemeToggle />
          <LanguageSelector />
          <Button
            variant="contained"
            size="small"
            startIcon={<Plus size={16} aria-hidden />}
            onClick={() => setAddOpen(true)}
            disableElevation
            className="normal-case"
          >
            {t('dashboard.addWidget')}
          </Button>
        </div>
      </header>

      <main>
        <DashboardGrid
          key={resetKey}
          pendingAdd={pendingAdd}
          onPendingAddConsumed={useCallback(() => setPendingAdd(null), [])}
          animationsEnabled={animationsEnabled}
        />
      </main>

      <AddWidgetDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={(type) => setPendingAdd({ type })}
      />
    </div>
  )
}
