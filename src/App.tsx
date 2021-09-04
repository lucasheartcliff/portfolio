import { ThemeProvider } from 'styled-components'
import themeSchema from './style/theme'

import React from 'react'
import Router from './Router'

const theme = 'light'

const App: React.FC = () => {
  return (
        <ThemeProvider theme={themeSchema[theme]}>
          <Router />
        </ThemeProvider>
  )
}

export default App
