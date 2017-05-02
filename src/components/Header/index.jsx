import React from 'react'
import { IndexLink, Link } from 'react-router'
import './index.css'

export const Header = () => (
  <div>
    <h1>React Redux Webpack</h1>
    <IndexLink to="/" activeClassName="route--active">
      Home
    </IndexLink>
    {' · '}
    <Link to="/login" activeClassName="route--active">
      Login
    </Link>
  </div>
)

export default Header
