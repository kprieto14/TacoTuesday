import React from 'react'
import { CSSStarsProperties, RestaurantType } from '../types'
import { Link } from 'react-router-dom'

type SingleRestaurantFromListProps = {
  restaurant: RestaurantType
}

export function SingleRestaurantFromList(props: SingleRestaurantFromListProps) {
  return (
    <li key={props.restaurant.id}>
      <h2>
        <Link to={`/restaurants/${props.restaurant.id}`}>
          {props.restaurant.name}
        </Link>
      </h2>
      
      <p>
        <span
          className="stars"
          style={{ '--rating': 4.7 } as CSSStarsProperties}
          aria-label="Star rating of this location is 4.7 out of 5."
        ></span>
        (2,188)
      </p>
      <address>{props.restaurant.address}</address>
    </li>
  )
}