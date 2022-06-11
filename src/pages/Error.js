import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const Error = () => {
  // wrapper is not pulling its styles from global styles, but from bellow set properties
  return <Wrapper>
    <div>
      <h1>404</h1>
      <h3>sorry, page does not exist</h3>
      {/* Link is comming from react-router-dom library */}
      <Link to='/' className='btn'>back home</Link>
    </div>
  </Wrapper>
}
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-primary-10);
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
`
export default Error
