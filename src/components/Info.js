import React from 'react'
import { GithubContext } from '../context/context'
import styled from 'styled-components'
import { GoRepo, GoGist } from 'react-icons/go'
import { FiUsers, FiUserPlus } from 'react-icons/fi'

const UserInfo = () => {
  // accessing GithubContext through useContext hook; this bellow is just one of the ways to access the hook
  // pulling guthubUser from context
  const { githubUser } = React.useContext(GithubContext)
  // since githubUser contains multiple values, bellow destructuring ones I am using in this case
  const { public_repos, followers, following, public_gists } = githubUser

  // setting up all the items that will be displayed by Info component
  const items = [
    {
      id: 1,
      icon: <GoRepo className='icon' />,
      label: 'repos',
      value: public_repos,
      color: 'pink',
    },
    {
      id: 2,
      icon: <FiUsers className='icon' />,
      label: 'followers',
      value: followers,
      color: 'green',
    },
    {
      id: 3,
      icon: <FiUserPlus className='icon' />,
      label: 'following',
      value: following,
      color: 'purple',
    },
    {
      id: 4,
      icon: <GoGist className='icon' />,
      label: 'gists',
      value: public_gists,
      color: 'yellow',
    },
  ]

  return (
    <section className='section'>
      {/* Wrapper is defined bellow and we are also applying global class(from our css file) to it */}
      <Wrapper className='section-center'>
        {/* pulling each item form items array */}
        {items.map((item) => {
          // by ...item I am destructuring values from item which is basically the Item component so I use all of its values instead listing them one by one; if I use only few, then I would have to list specifficaly the ones I am using, but since I am using all of them I can use the spread(...) operator

          // for each one of those items we are returning Item component that is using the values from items array; the reason we cannot use the spread operator here is because we are not using all of the values, but 4/5
          return <Item key={item.id} {...item}></Item>
        })}
      </Wrapper>
    </section>
  )
}

const Item = ({ icon, label, value, color }) => {
  return (
    <article className='item'>
      <span className={color}>{icon}</span>
      <div>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </article>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--clr-primary-10);
      color: var(--clr-primary-5);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  }
`

export default UserInfo
