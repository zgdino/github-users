import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  // repos is initialized in context.js by mockRepos.js and we are accessing it here by using useContext hook
  const { repos } = React.useContext(GithubContext)
  // using reduce to determine the most used language
  const languages = repos.reduce((total, item) => {
    // destructuring the property under the name of <<language>> out of each item we are iterating ... you can see it if you console.log(item)
    const {language} = item
    console.log(language)
    return total
  }, {})
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
