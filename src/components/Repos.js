import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  // repos is initialized in context.js by mockRepos.js and we are accessing it here by using useContext hook
  const { repos } = React.useContext(GithubContext)
  // using reduce to determine the most used language
  let languages = repos.reduce((total, item) => {
    // destructuring the property under the name of <<language>> out of each item we are iterating ... you can see it if you console.log(item)
    const { language } = item
    // if the language is <<null>> simply return the toal
    if (!language) return total
    // if the property on the object does not exist begin the count and it will not exist in the first iteration, but it WILL exist in every other
    if (!total[language]) {
      total[language] = 1
      // if the property DOES exist add 1 and it WILL on every iteration after the first one
    } else {
      total[language]++
    }
    return total
  }, {})
  console.log(languages);
  const chartData = [
    {
      label: 'HTML',
      value: '13',
    },
    {
      label: 'CSS',
      value: '23',
    },
    {
      label: 'Javascript',
      value: '80',
    },
  ]
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {/* it will show pie chart in percentages calculated from chartData ↑ */}
        <Pie3D data={chartData} />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
