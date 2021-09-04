import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={'/'} component={() => <>Error 404</>} />
    </Switch>
  )
}

export default Routes
