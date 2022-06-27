import React from 'react'
// importing and exporting in index.js
import { Info, Repos, User, Search, Navbar } from '../components'
import loadingImage from '../images/preloader.gif'
import { GithubContext } from '../context/context'
const Dashboard = () => {
  const {isLoading} = React.useContext(GithubContext)
  if (isLoading) {
    return <main>
      <Navbar/>
      <Search/>
      <img src={loadingImage} className='loading-img' alt='lodaing' />
    </main>
  }
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  )
}

export default Dashboard
