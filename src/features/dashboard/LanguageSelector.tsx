import { Select, MenuItem, type SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'fr', label: 'FR', full: 'Français' },
  { code: 'es', label: 'ES', full: 'Español' },
]

export default function LanguageSelector() {
  const { t, i18n } = useTranslation()

  // Normalize e.g. "en-US" → "en"
  const current = (i18n.language ?? 'en').slice(0, 2)
  const resolved = LANGUAGES.find((l) => l.code === current)?.code ?? 'en'

  const handleChange = (e: SelectChangeEvent) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <Select
      value={resolved}
      onChange={handleChange}
      size="small"
      variant="outlined"
      inputProps={{ 'aria-label': t('language.select') }}
      className="text-sm"
      renderValue={(value) =>
        LANGUAGES.find((l) => l.code === value)?.label ?? value.toUpperCase()
      }
    >
      {LANGUAGES.map((lang) => (
        <MenuItem key={lang.code} value={lang.code}>
          <span className="mr-2 text-xs font-bold text-gray-400 dark:text-gray-300">{lang.label}</span>
          <span className="text-sm text-gray-700 dark:text-gray-200">{lang.full}</span>
        </MenuItem>
      ))}
    </Select>
  )
}
