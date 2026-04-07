import { IconButton, Tooltip } from '@mui/material'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from './ThemeContext'
import type { ThemeMode } from './ThemeContext'

const CYCLE: ThemeMode[] = ['light', 'dark', 'system']

const ICONS: Record<ThemeMode, React.ElementType> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
}

export default function ThemeToggle() {
  const { t } = useTranslation('common')
  const { mode, setMode } = useTheme()

  const handleClick = () => {
    const idx = CYCLE.indexOf(mode)
    setMode(CYCLE[(idx + 1) % CYCLE.length])
  }

  const Icon = ICONS[mode]
  const label = t(`theme.${mode}`)

  return (
    <Tooltip title={label} arrow>
      <IconButton
        size="small"
        onClick={handleClick}
        aria-label={label}
        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-200"
      >
        <Icon size={16} aria-hidden />
      </IconButton>
    </Tooltip>
  )
}
