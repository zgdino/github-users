import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const PrivateRoute = ({ children, ...rest }) => {
  const isUser = true
  return (
    <Route
      {...rest}
      render={() => {
        // if isUser is true return children, else redirect to login page
        return isUser ? children : <Redirect to='login'></Redirect>
      }}
    ></Route>
  )
}
export default PrivateRoute
