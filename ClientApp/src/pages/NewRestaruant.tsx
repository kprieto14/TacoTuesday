import React, { useState } from 'react'
import { APIError, RestaurantType } from '../types'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'

async function submitNewRestaurant(restaurantToCreate: RestaurantType) {
  const response = await fetch('/api/Restaurants', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(restaurantToCreate),
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

export function NewRestaurant() {
  const [errorMessage, setErrorMessage] = useState('')

  const [newRestaurant, setNewRestaurant] = useState<RestaurantType>({
    name: '',
    description: '',
    address: '',
    telephone: '',
  })

  const navigate = useNavigate()

  const createNewRestaurant = useMutation(submitNewRestaurant, {
    onSuccess: function() {
      navigate('/')
    },
    onError: function (apiError: APIError) {
      setErrorMessage(Object.values(apiError.errors).join(' '))
    },
  })

  function handleStringFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = event.target.value
    const fieldName = event.target.name
    const updatedRestaurant = { ...newRestaurant, [fieldName]: value }
    setNewRestaurant(updatedRestaurant)
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    createNewRestaurant.mutate(newRestaurant)
  }


  return (
    <main className="page">
      <nav>
        <a href="/">
          <i className="fa fa-home"></i>
        </a>
        <h2>Add a Restaurant</h2>
      </nav>
      <form onSubmit={handleFormSubmit}>
        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
        <p className="form-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={newRestaurant.name}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="form-input">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={newRestaurant.description}
            onChange={handleStringFieldChange}
          ></textarea>
          <span className="note">
            Enter a brief description of the restaurant.
          </span>
        </p>
        <p className="form-input">
          <label htmlFor="name">Address</label>
          <textarea
            name="address"
            value={newRestaurant.address}
            onChange={handleStringFieldChange}
          ></textarea>
        </p>
        <p className="form-input">
          <label htmlFor="name">Telephone</label>
          <input
            type="tel"
            name="telephone"
            value={newRestaurant.telephone}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="form-input">
          <label htmlFor="picture">Picture</label>
          <input type="file" name="picture" />
        </p>
        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    </main>
  )
}