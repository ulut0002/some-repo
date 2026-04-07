import { useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
]

export default function SpinnerWidget() {
  const { t } = useTranslation('dashboard')
  const color = useMemo(
    () => COLORS[Math.floor(Math.random() * COLORS.length)],
    [],
  )

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="h-8 w-8 @sm:h-12 @sm:w-12 @md:h-16 @md:w-16">
        <Loader2
          className="h-full w-full animate-spin-slow"
          style={{ color }}
          aria-label={t('widgets.spinner.ariaLabel')}
        />
      </div>
      <span className="hidden @md:block text-xs text-gray-400">
        {t('widgets.spinner.loading')}
      </span>
    </div>
  )
}
