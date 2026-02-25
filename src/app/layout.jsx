'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './globals.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea'
    },
    secondary: {
      main: '#764ba2'
    }
  }
})

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
