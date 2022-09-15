import { ThemeProvider } from 'styled-components'
import themeSchema from './style/theme'

import React from 'react'
import Router from './Router'
import { useTheme } from './style/themes/use-theme'
import { Switch } from 'antd'

const theme = 'light'

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useTheme()
  console.log(darkMode)
  return (
    <>
      
      <div className='container'>
        <Switch checked={darkMode} onChange={setDarkMode} />
      </div>
      {/* <Router /> */}
        </>
          
        
  )
}

export default App
