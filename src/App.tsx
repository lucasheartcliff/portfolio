import React from 'react'
import { useTheme } from './style/themes/use-theme'
import { Switch } from 'antd'

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useTheme()
  return (
    <>
          <div className='container'>
        <Switch checked={darkMode} onChange={setDarkMode} />
      </div>
        </>
          
        
  )
}

export default App
