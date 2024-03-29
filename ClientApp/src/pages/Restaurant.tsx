import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { CSSStarsProperties, RestaurantType, ReviewType } from '../types'
import { format } from 'date-fns/format'


async function loadOneRestaurant(id: string | undefined) {
  const response = await fetch(`/api/restaurants/${id}`)

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

async function submitNewReview(review: ReviewType) {
  const response = await fetch(`/api/Reviews`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(review),
  })

  console.log(review)

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

const NullRestaurant: RestaurantType = {
  id: undefined,
  name: '',
  address: '',
  description: '',
  telephone: '',
  reviews: [],
}

const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`

export function Restaurant() {
    const { id } = useParams<{ id: string }>()

    const { refetch, data: restaurant = NullRestaurant } =
    useQuery<RestaurantType>(['one-restaurant', id], () =>
      loadOneRestaurant(id)
    )
  const [newReview, setNewReview] = useState<ReviewType>({
    body: '',
    stars: 5,
    summary: '',
    restaurantId: Number(id),
  })
  const createNewReview = useMutation(submitNewReview, {
    onSuccess: function () {
      refetch()
      setNewReview({
        ...newReview,
        body: '',
        stars: 5,
        summary: '',
      })
    },
  })

  function handleNewReviewTextFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = event.target.name
    const value = event.target.value

    setNewReview({ ...newReview, [name]: value })
  }

  function handleStarRadioButton(newStars: number) {
    setNewReview({ ...newReview, stars: newStars })
  }

    return (
        <main className="page">
      <nav>
      <Link to="/">
          <i className="fa fa-home"></i>
      </Link>

      <h2>{restaurant.name}</h2>
      </nav>

      <p>
        <span
          className="stars"
          style={{ '--rating': 4.7 } as CSSStarsProperties}
          aria-label="Star rating of this location is 4.7 out of 5."
        ></span>
        ({restaurant.reviews.length})
      </p>

      <address>{restaurant.address}</address>
      <hr />
      <h3>Reviews for {restaurant.name}</h3>

      <ul className="reviews">
        {restaurant.reviews.map((review) => (
            <li key={review.id}>
              <div className="author">
                Gavin said: <em>{review.summary}</em>
              </div>
              <div className="body">
                <p>{review.body}</p>
              </div>
              <div className="meta">
                <span
                  className="stars"
                  style={{ '--rating': review.stars } as CSSStarsProperties}
                  aria-label={`Star rating of this location is ${review.stars} out of 5.`}
                ></span>
                <time>
                {review.createdAt
                  ? format(new Date(review.createdAt), dateFormat)
                  : null}
              </time>
              </div>
            </li>
          ))}
      </ul>
      <h3>Enter your own review</h3>
      <form
        onSubmit={function (event) {
          event.preventDefault()
          createNewReview.mutate(newReview)
        }}
      >
        <p className="form-input">
          <label htmlFor="summary">Summary</label>
          <input
            type="text"
            name="summary"
            value={newReview.summary}
            onChange={handleNewReviewTextFieldChange}
          />
          <span className="note">
            Enter a brief summary of your review. Example:{' '}
            <strong>Great food, good prices.</strong>
          </span>
        </p>
        <p className="form-input">
          <label htmlFor="body">Review</label>
          <textarea
            name="body"
            value={newReview.body}
            onChange={handleNewReviewTextFieldChange}
          ></textarea>
        </p>
        <div className="rating">
        <input
            id="star-rating-1"
            type="radio"
            name="stars"
            value="1"
            checked={newReview.stars === 1}
            onChange={() => handleStarRadioButton(1)}
          />
          <label htmlFor="star-rating-1">1 star</label>

          <input
            id="star-rating-2"
            type="radio"
            name="stars"
            value="2"
            checked={newReview.stars === 2}
            onChange={() => handleStarRadioButton(2)}
          />
          <label htmlFor="star-rating-2">2 stars</label>

          <input
            id="star-rating-3"
            type="radio"
            name="stars"
            value="3"
            checked={newReview.stars === 3}
            onChange={() => handleStarRadioButton(3)}
          />
          <label htmlFor="star-rating-3">3 stars</label>

          <input
            id="star-rating-4"
            type="radio"
            name="stars"
            value="4"
            checked={newReview.stars === 4}
            onChange={() => handleStarRadioButton(4)}
          />
          <label htmlFor="star-rating-4">4 stars</label>

          <input
            id="star-rating-5"
            type="radio"
            name="stars"
            value="5"
            checked={newReview.stars === 5}
            onChange={() => handleStarRadioButton(5)}
          />
          <label htmlFor="star-rating-5">5 stars</label>

          <div className="star-rating">
            <label
              htmlFor="star-rating-1"
              aria-label="1 star"
              title="1 star"
            ></label>
            <label
              htmlFor="star-rating-2"
              aria-label="2 stars"
              title="2 stars"
            ></label>
            <label
              htmlFor="star-rating-3"
              aria-label="3 stars"
              title="3 stars"
            ></label>
            <label
              htmlFor="star-rating-4"
              aria-label="4 stars"
              title="4 stars"
            ></label>
            <label
              htmlFor="star-rating-5"
              aria-label="5 stars"
              title="5 stars"
            ></label>
          </div>
        </div>
        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    </main>
    )
}