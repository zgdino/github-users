import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { GithubProvider } from './context/context'
import { Auth0Provider } from '@auth0/auth0-react'

// if necessary, set a .env variables to hide them from public
// DOMAIN
// dev-oeebqrcp.us.auth0.com
// CLIENT ID
// nUP3elnhoOV266IypdP33dZqy88cm334

ReactDOM.render(
  <React.StrictMode
    domain='dev-oeebqrcp.us.auth0.com'
    clientId='nUP3elnhoOV266IypdP33dZqy88cm334'
    redirectUri={window.location.origin}
  >
    <Auth0Provider>
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
