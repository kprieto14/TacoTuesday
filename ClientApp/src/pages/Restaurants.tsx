import React from 'react'
import tacoTuesday from '../images/taco-tuesday.svg'
import map from '../images/map.png'
import { RestaurantType } from '../types'
import { useQuery } from 'react-query'
import { SingleRestaurantFromList } from './SingleRestaurantFromList'

export function Restaurants() {
  const { data: restaurants = [] } = useQuery<RestaurantType[]>(
    'restaurants',
    async function () {
      const response = await fetch('/api/Restaurants')
      return response.json()
    }
  )
  // USE USESTATE AND USEFFECT INSTEAD, YOU CAN LEARN REDUX LATER
  console.log( {restaurants} )
  
  return (
    <main className="home">
      <h1>
        <img src={tacoTuesday} alt="Taco Tuesday" />
      </h1>
      <form className="search">
        <input type="text" placeholder="Search..." />
      </form>

      <section className="map">
        <img alt="Example Map" src={map} />
      </section>

      <ul className="results">
        {restaurants.map((restaurant) => (
          <SingleRestaurantFromList
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </ul>
    </main>
  )
}