import React from 'react'
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      {/* Dashboard is our homepage. Making sure the url matches exactly */}
      <Route path='/' exact={true}>
        <Dashboard></Dashboard>
      </Route>
      <Route path='/login'>
        <Login></Login>
      </Route>
      {/* <Error /> */}
    </Router>
  )
}

export default App
