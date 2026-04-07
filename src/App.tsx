import { useMemo } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material'
import { ThemeProvider, useTheme } from './features/theme/ThemeContext'
import Dashboard from './features/dashboard/Dashboard'

function AppInner() {
  const { isDark } = useTheme()
  const muiTheme = useMemo(
    () => createTheme({ palette: { mode: isDark ? 'dark' : 'light' } }),
    [isDark],
  )
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Dashboard />
    </MuiThemeProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}
