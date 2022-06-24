import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
// to perform an ajax requestAnimationFrame, we are using an axios library
import axios from 'axios'

// github API only gives 60 requests per user and that is why we are using mock values for building this app
const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

// Provider - GithubContext.Provider is getting setup bellow
// User - GithubContext.Consumer will get set up in each component through useContext hook

const GithubProvider = ({ children }) => {
  // useState hook returns an array of two values - default value(githunUser in this case) and a function that allows us to change it(setGithubUser)
  // we are using mock (static) data because of 60 requests limit by github API
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  // state hooks for loading and requests
  const [requests, setRequests] = useState(0)
  const [loading, setLoading] = useState(false)
  return (
    <GithubContext.Provider value={{ githubUser, repos, followers }}>
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext }
