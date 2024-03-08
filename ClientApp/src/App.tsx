import React from 'react'

//import { Restaurants } from './pages/Restaurants'
import avatar from './images/avatar.png'
import { NewRestaurant } from './pages/NewRestaruant'

export function App() {
  return (<>
    <header>
        <ul>
          <li>
            <nav>
              <a href="#">
                <i className="fa fa-plus"></i> Restaurant
              </a>
              <p>Welcome back, Steve!</p>
            </nav>
          </li>
          <li className="avatar">
            <img src={avatar} alt="Steve's Avatar" height="64" width="64" />
          </li>
        </ul>
      </header>
      <NewRestaurant />
      <footer>
        <p>
          Built with <i className="fa fa-heart"></i> in St Petersburg, Florida.
        </p>
      </footer>
  </>)
}
