import React, { useState } from 'react'
import { APIError, RestaurantType } from '../types'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import { authHeader } from '../auth'

async function loadOneRestaurant(id: string | undefined) {
    const response = await fetch(`/api/restaurants/${id}`)
  
    if (response.ok) {
      return response.json()
    } else {
      throw await response.json()
    }
  }

async function submitEditedRestaurant(restaurantToUpdate: RestaurantType) {
    const response = await fetch(`/api/Restaurants/${restaurantToUpdate.id}`, {
        method: 'PUT',
        headers: {
        'content-type': 'application/json',
        Authorization: authHeader(),
        },
        body: JSON.stringify(restaurantToUpdate),
    })

    // deals with logic to throw an error message if user tries to submit a new restaurant without the required fields.
    if (response.ok) {
        return response.json()
    } else {
        throw await response.json()
    }
}

export function EditRestaurant() {
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')

  const { id } = useParams<{ id: string }>()

  // Use the query to load the existing restaurant
  // and when we get something back, call setUpdatedRestaurant to update our state.
  useQuery<RestaurantType>(
    ['one-restaurant', id],
    () => loadOneRestaurant(id),
    {
      onSuccess: function (restaurantBeingLoaded) {
        console.log('Loaded the restaurant!')

        setUpdatingRestaurant(restaurantBeingLoaded)
      },
    }
  )

  const [updatingRestaurant, setUpdatingRestaurant] =
    useState<RestaurantType>({
      id: undefined,
      userId: undefined,
      name: '',
      description: '',
      address: '',
      telephone: '',
      reviews: [],
    })

  // Submitting the form: useMutation takes in an object, and an optional ,{function} to execute after mutation. We wanted to useHistory to navigate back to the "home" page. But was unable to so far.
  const updateTheRestaurant = useMutation(submitEditedRestaurant, {
    onSuccess: function () {
      navigate('/')
    },
    onError: function (apiError: APIError) {
      const newMessage = Object.values(apiError.errors).join(' ')

      setErrorMessage(newMessage)
    },
  })

  // Make a more generic function to handle ANY change in the input field. The event will be of <HTMLInputElement | HTMLTextAreaElement>.
  // This works specifically with the <input type="text" name="name"> of our input forms. CLEVER example of input field formatting with an onChange on the textarea. By naming the inputs in this way.
  function handleStringFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedRestaurant = { ...updatingRestaurant, [fieldName]: value }

    setUpdatingRestaurant(updatedRestaurant)
  }

  return (
    <main className="page">
      <nav>
        <a href="/">
          <i className="fa fa-home"></i>
        </a>
        <h2>Update the Restaurant</h2>
      </nav>
      
      <form
        onSubmit={(event) => {
          event.preventDefault()
          updateTheRestaurant.mutate(updatingRestaurant)
        }}
      >
        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
        <p className="form-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={updatingRestaurant.name}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="form-input">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={updatingRestaurant.description}
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
            value={updatingRestaurant.address}
            onChange={handleStringFieldChange}
          ></textarea>
        </p>
        <p className="form-input">
          <label htmlFor="name">Telephone</label>
          <input
            type="tel"
            name="telephone"
            value={updatingRestaurant.telephone}
            onChange={handleStringFieldChange}
          />
        </p>

        <p>
          <input type="submit" value="Submit changes" />
        </p>
      </form>
    </main>
  )
}