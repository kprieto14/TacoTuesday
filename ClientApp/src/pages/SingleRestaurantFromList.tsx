import React from 'react'
import { RestaurantType } from '../types'
import { Link } from 'react-router-dom'
import { Stars } from './Stars'

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
        <Stars restaurant={props.restaurant} />({props.restaurant.reviews.length})
      </p>
      <address>{props.restaurant.address}</address>
    </li>
  )
}