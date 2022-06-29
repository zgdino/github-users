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
  const [isLoading, setIsLoading] = useState(false)
  // error
  const [error, setError] = useState({ show: false, msg: '' })

  const searchGithubUser = async (user) => {
    // we can just invoke toggleError, because the function is setup in a way that has default values... and toggled like below will grab those defaults - in this case it is 'false' and empty message... so when searched for user that does not exist, it will throw an error message and if you are searchiong for something else right after that, the error message will disappear
    toggleError()
    setIsLoading(true)
    // axios is GET by defualt
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    )
    if (response) {
      setGithubUser(response.data)
      const { login, followers_url } = response.data
      // making sure that all the data presented is loaded and presented at the same time
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          console.log(results)
          const [repos, followers] = results
          const status = 'fulfilled'
          if (repos.status === status) {
            setRepos(repos.value.data)
          }
          if (followers.status === status) {
            setFollowers(followers.value.data)
          }
        })
        .catch((err) => console.log(err))
    } else {
      toggleError(true, 'invalid username')
    }
    checkRequests()
    setIsLoading(false)
  }

  // check rate
  const checkRequests = () => {
    // axios returns promise
    axios(`${rootUrl}/rate_limit`)
      // instant destructuring of 'data'
      .then(({ data }) => {
        // destructuring 'remaining' from data, making it <<let>> because it changes
        let {
          rate: { remaining },
        } = data
        setRequests(remaining)
        if (remaining === 0) {
          // throw an error
          toggleError(
            true,
            'sorry, you have exceeded your hourly limit of 60 requests!'
          )
        }
      })
      .catch((err) => console.log(err))
  }
  // error toggle function and its default values passed as an arguments
  function toggleError(show = false, msg = '') {
    setError({ show, msg })
  }
  // once the app loads, use checkRequests as our callback function
  useEffect(checkRequests, [])
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext }
