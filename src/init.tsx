import { ThemeProvider } from 'styled-components'
import themeSchema from './style/theme'

import React from 'react'
import Router from './Router'
import { useTheme } from './style/themes/use-theme'
import { Switch } from 'antd'
import { QueryClient, QueryClientProvider } from 'react-query'

const theme = 'light'

const Init: React.FC = () => {
  const [darkMode, setDarkMode] = useTheme()
  const queryClient = new QueryClient()
  console.log(darkMode)
  return (
    <>
      <QueryClientProvider client={queryClient}>
          <div className='container'>
        <Switch checked={darkMode} onChange={setDarkMode} />
      </div>
      </QueryClientProvider>
    
      {/* <Router /> */}
        </>
          
        
  )
}

export default Init
