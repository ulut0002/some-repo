import { useMemo } from 'react'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { ViewMode } from '../types'

const NAMES = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve']
const STATUSES = ['Active', 'Idle', 'Offline'] as const
type Status = typeof STATUSES[number]

function randomRow(name: string) {
  return {
    name,
    value: Math.floor(Math.random() * 9000) + 1000,
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
  }
}

function statusClass(status: Status) {
  if (status === 'Active') return 'bg-green-100 text-green-700'
  if (status === 'Idle') return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-100 text-gray-500'
}

export default function TableWidget({ viewMode = 'auto' }: { viewMode?: ViewMode }) {
  const { t } = useTranslation('dashboard')
  const rows = useMemo(() => NAMES.map(randomRow), [])

  // Determine which views to show based on viewMode preference
  const showCard  = viewMode === 'card'  || viewMode === 'auto'
  const showTable = viewMode === 'table' || viewMode === 'auto'

  // When auto: use container queries. When forced: always show / always hide.
  const cardClass  = showCard
    ? (viewMode === 'auto' ? 'flex flex-col gap-2 p-2 @sm:hidden' : 'flex flex-col gap-2 p-2')
    : 'hidden'
  const tableClass = showTable
    ? (viewMode === 'auto' ? 'hidden h-full @sm:block' : 'block h-full')
    : 'hidden'

  return (
    <div className="h-full overflow-auto">
      {/* ── Card view ────────────────────────────────────────────── */}
      <ul className={cardClass} aria-label={t('widgets.table.ariaLabelList')}>
        {rows.map((row) => (
          <li
            key={row.name}
            className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-700/50"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">{row.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{row.value.toLocaleString()}</p>
            </div>
            <span className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusClass(row.status)}`}>
              {t(`widgets.table.statuses.${row.status}`)}
            </span>
          </li>
        ))}
      </ul>

      {/* ── Table view ───────────────────────────────────────────── */}
      <TableContainer className={tableClass}>
        <Table size="small" aria-label={t('widgets.table.ariaLabel')}>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">{t('widgets.table.columns.name')}</TableCell>
              <TableCell className="font-semibold" align="right">{t('widgets.table.columns.value')}</TableCell>
              <TableCell className="hidden font-semibold @md:table-cell">{t('widgets.table.columns.status')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} hover>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.value.toLocaleString()}</TableCell>
                <TableCell className="hidden @md:table-cell">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusClass(row.status)}`}>
                    {t(`widgets.table.statuses.${row.status}`)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
