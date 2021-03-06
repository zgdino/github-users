import React from 'react'
import styled from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react'

// clear browser cache first while troubleshooting

const Navbar = () => {
  // eslint-disable-next-line
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0()
  const isUser = isAuthenticated && user
  return (
    <Wrapper>
      {/* displaying the photo of the user if it is logged in and the picture exists */}
      {isUser && user.picture && <img src={user.picture} alt={user.name} />}
      {/* displaying the username next to its photo if it is logged in and it has a username --- in our case username will be the same as email */}
      {isUser && user.name && (
        <h4>
          Welcome, <strong>{user.name.toUpperCase()}</strong>
        </h4>
      )}
      {/* display the logout button if the user is logged in and display login button if the user is not logged in */}
      {isUser ? (
        <button
          onClick={() => {
            logout({ returnTo: window.location.origin })
          }}
          className='btn'
        >
          logout
        </button>
      ) : (
        <button onClick={loginWithRedirect} className='btn'>
          login
        </button>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`

export default Navbar
