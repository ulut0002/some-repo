import { useMemo } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const METRICS = [
  { labelKey: 'widgets.stats.metrics.revenue', unit: '$', scale: 100000 },
  { labelKey: 'widgets.stats.metrics.users',   unit: '',  scale: 50000 },
  { labelKey: 'widgets.stats.metrics.orders',  unit: '',  scale: 2000 },
  { labelKey: 'widgets.stats.metrics.conversion', unit: '%', scale: 100, fixed: 1 },
]

export default function StatsWidget() {
  const { t } = useTranslation('dashboard')

  const { metric, value, change, up } = useMemo(() => {
    const m = METRICS[Math.floor(Math.random() * METRICS.length)]
    const v = Math.floor(Math.random() * m.scale)
    const c = (Math.random() * 30 - 10).toFixed(1)
    return { metric: m, value: v, change: c, up: parseFloat(c) >= 0 }
  }, [])

  const display =
    metric.unit === '$'
      ? `$${value.toLocaleString()}`
      : metric.unit === '%'
        ? `${(value / metric.scale * 100).toFixed(metric.fixed ?? 0)}%`
        : value.toLocaleString()

  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center @sm:gap-2 @md:p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {t(metric.labelKey)}
      </p>
      <p className="text-2xl font-bold text-gray-800 @sm:text-3xl @md:text-4xl dark:text-gray-100">
        {display}
      </p>
      <div
        className={`hidden items-center gap-1 text-sm font-medium @sm:flex ${up ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}
      >
        {up ? <TrendingUp size={16} aria-hidden /> : <TrendingDown size={16} aria-hidden />}
        <span>{up ? '+' : ''}{change}%</span>
      </div>
    </div>
  )
}
