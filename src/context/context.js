import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

// Provider - GithubContext.Provider is getting setup bellow
// User - GithubContext.Consumer will get set up in each component through useGlobalContext hook

const GithubProvider = ({ children }) => {
  return (
    <GithubContext.Provider value={'hello'}>{children}</GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext }
