import React from 'react'
import { Routes, Route, Link  } from 'react-router-dom'
import avatar from './images/avatar.png'
import { NewRestaurant } from './pages/NewRestaruant'
import { Restaurants } from './pages/Restaurants'
import { Restaurant } from './pages/Restaurant'

export function App() {
  return (<>
    <header>
        <ul>
          <li>
            <nav>
              <Link to='/new'>
                <i className="fa fa-plus"></i> Restaurant
              </Link>
              <p>Welcome back, Steve!</p>
            </nav>
          </li>
          <li className="avatar">
            <img src={avatar} alt="Steve's Avatar" height="64" width="64" />
          </li>
        </ul>
      </header>

      <Routes>
        <Route path='/' element={<Restaurants/>}/>
        <Route path='/new' element={<NewRestaurant/>}/>
        <Route path='/:id' element={<Restaurant/>}/>s
      </Routes>

      <footer>
        <p>
          Built with <i className="fa fa-heart"></i> in St Petersburg, Florida.
        </p>
      </footer>
  </>)
}
