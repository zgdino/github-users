import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const PrivateRoute = ({ children, ...rest }) => {
  const isUser = false
  return (
    <Route
      {...rest}
      render={() => {
        // if isUser is true return children(dashboard in this case - look into App.js), else redirect to login page
        return isUser ? children : <Redirect to='/login'></Redirect>
      }}
    ></Route>
  )
}
export default PrivateRoute
