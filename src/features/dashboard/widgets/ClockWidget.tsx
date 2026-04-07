import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function ClockWidget() {
  const { i18n } = useTranslation()
  const [now, setNow] = useState(new Date())
  const locale = i18n.language ?? 'en'

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const date = now.toLocaleDateString(locale, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })

  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center @md:p-4">
      <time
        dateTime={now.toISOString()}
        className="text-2xl font-bold tabular-nums text-gray-800 @sm:text-3xl @md:text-4xl dark:text-gray-100"
      >
        {time}
      </time>
      <p className="hidden text-gray-500 @sm:block @sm:text-xs @md:text-sm dark:text-gray-400">
        {date}
      </p>
    </div>
  )
}
