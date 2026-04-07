import {
  Dialog, DialogTitle, DialogContent,
  List, ListItemButton, ListItemText,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { widgetRegistry } from './widgetRegistry'
import type { WidgetType } from './types'

interface Props {
  open: boolean
  onClose: () => void
  onAdd: (type: WidgetType) => void
}

const WIDGET_TYPES = Object.keys(widgetRegistry) as WidgetType[]

export default function AddWidgetDialog({ open, onClose, onAdd }: Props) {
  const { t } = useTranslation('dashboard')

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="add-widget-title">
      <DialogTitle id="add-widget-title" className="text-base font-semibold">
        {t('dashboard.addWidget')}
      </DialogTitle>
      <DialogContent className="min-w-64 p-0">
        <List disablePadding>
          {WIDGET_TYPES.map((type) => (
            <ListItemButton
              key={type}
              onClick={() => { onAdd(type); onClose() }}
              className="border-b border-gray-100 last:border-0"
            >
              <ListItemText primary={t(widgetRegistry[type].labelKey)} />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}
