import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const BAR_COLORS = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500']

function randomBars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    value: Math.floor(Math.random() * 80) + 10,
    color: BAR_COLORS[i],
  }))
}

export default function BarChartWidget() {
  const { t } = useTranslation('dashboard')
  const bars = useMemo(() => randomBars(Math.floor(Math.random() * 5) + 1), [])

  return (
    <div className="flex h-full flex-col gap-1 p-2">
      <p className="hidden text-xs font-semibold uppercase tracking-wide text-gray-500 @sm:block dark:text-gray-400">
        {t('widgets.barchart.title')}
      </p>

      <div className="flex flex-1 items-end gap-1 @sm:gap-2">
        {bars.map((bar) => (
          <div
            key={bar.id}
            className={`flex-1 rounded-t ${bar.color} transition-all`}
            style={{ height: `${bar.value}%` }}
            role="img"
            aria-label={t('widgets.barchart.item', { number: bar.id + 1 }) + ': ' + bar.value}
          />
        ))}
      </div>

      <div className="flex gap-1 @sm:gap-2">
        {bars.map((bar) => (
          <div key={bar.id} className="flex flex-1 flex-col items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">{bar.value}</span>
            <span className="hidden truncate text-xs text-gray-400 @sm:block dark:text-gray-500">
              {t('widgets.barchart.item', { number: bar.id + 1 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
