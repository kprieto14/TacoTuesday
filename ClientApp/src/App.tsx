import React from 'react'
import { Routes, Route, Link  } from 'react-router-dom'
import avatar from './images/avatar.png'
import { NewRestaurant } from './pages/NewRestaruant'
import { Restaurants } from './pages/Restaurants'
import { Restaurant } from './pages/Restaurant'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { getUser, isLoggedIn, logout } from './auth'

export function App() {
  const user = getUser()

  function handleLogout() {
    logout()

    window.location.assign('/')
  }

  return (<>
    <header>
        <ul>
          <li>
            <nav>
            {/* Can have components for navbar to show stuff you want when user is logged in and stuff you want when user is not signed in */}
            {isLoggedIn() ? (
                <Link to="/new">
                  <i className="fa fa-plus"></i> Restaurant
                </Link>
              ) : null}
              {isLoggedIn() ? null : <Link to="/signin">Sign in</Link>}
              {isLoggedIn() ? null : <Link to="/signup">Sign up</Link>}
              {isLoggedIn() ? (
                <a
                  href="/"
                  className="link"
                  onClick={function (event) {
                    event.preventDefault()
                    handleLogout()
                  }}
                >
                  Sign out
                </a>
              ) : null}
              {isLoggedIn() ? <p>Welcome back, {user.fullName}!</p> : null}
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
        <Route path='/restaurants/:id' element={<Restaurant/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
      </Routes>

      <footer>
        <p>
          Built with <i className="fa fa-heart"></i> in St Petersburg, Florida.
        </p>
      </footer>
  </>)
}
