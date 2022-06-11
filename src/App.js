import React from 'react'
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      {/* switch renders the first route that matches; using it to avoid displaying multiple pages at the same time */}
      <Switch>
        {/* Dashboard is our homepage. Making sure the url matches exactly */}
        <Route path='/' exact={true}>
          <Dashboard></Dashboard>
        </Route>
        <Route path='/login'>
          <Login></Login>
        </Route>
        {/* sign '*' refers to the page that does not exist */}
        <Route path='*'>
          <Error></Error>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
