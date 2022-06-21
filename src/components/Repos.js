import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  // repos is initialized in context.js by mockRepos.js and we are accessing it here by using useContext hook
  const { repos } = React.useContext(GithubContext)
  // using reduce to determine the most used language
  const languages = repos.reduce((total, item) => {
    // destructuring the property under the name of <<language>> out of each item(repo which is also an object) we are iterating ... you can see it if you console.log(item)
    const { language, stargazers_count } = item
    // if the language is <<null>> simply return the total and remember there will be a return for each item in iteration; this one return does not mean the whole loop stops
    if (!language) return total
    // if the property on the object does not exist begin the count and it will not exist in the first iteration, but we are adding it to the total so it begins to exist here; we are modifying it to show us what we need
    if (!total[language]) {
      // using total[language] instead total.language is because first one creates dynamic properties on the fly and the second one sets the same property on every iteration
      // adding stars as an value for stargazers_count
      total[language] = { label: language, value: 1, stars: stargazers_count }
      // if the property DOES exist add 1 and it WILL on every iteration after the first one
    } else {
      // take all the values from total(defined upstairs; there is only two of them - <<label>> which is equal to the language and <<value>> which begins with 1) and overwrite the property of <<value>> by adding +1 to it
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }
    }
    return total
  }, {})
  // to see what is happenning with the code for <<languages>> console.log(languages) at this point

  // turning languages into an array of objects and sorting it out to have highest value language first and then through slice showing only first 5 most popular languages(slice(0,5) = [0,5> || [0,4]) - we are doing this beacuse some people use over 20 languages in their portfolio and the chart would become unreadable
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)

  // most stars per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars
    })
    .map((item) => {
      // putting the stars number in the value position because the chart is always looking for the value
      return { ...item, value: item.stars }
    })
    .slice(0, 5)

  // stars, forks

  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item
      // setting it up to match the charts 'needs' like in the previous charts
      total.stars[stargazers_count] = { label: name, value: stargazers_count }
      total.forks[forks] = {label: name, value: forks}
      return total
    },
    {
      stars: {},
      forks: {},
    }
  )
  // creating stars in to an array, showcasing the last five in everse order bacuse we are looking the ones with the most stars in ascending order
  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(-5).reverse()

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {/* it will show pie chart in percentages calculated from chartData ↑ */}
        {/* pull the data to be displayed from languages */}
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
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
