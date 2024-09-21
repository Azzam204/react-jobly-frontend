import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'reactstrap';
import UserContext from "./userContext";
import useLocalStorage from "./useLocalStorage";

/** Navigation bar
 * 
 * Displays on every page
 * 
 * if user is logged in, shows links to different routes
 * 
 * else, shows log in and sign up links
 */ 

function NavBar({handleSignOut}) {
  const { user, setUser } = useContext(UserContext)
  const {token,setToken} = useLocalStorage('token')
 
  function loggedIn() {
    return (
      <Navbar>
        <NavLink to='/' className="navbar-brand">
          Jobly
        </NavLink>
        <Nav>
          <NavItem>
            <NavLink
              className='nav-link link-secondary link-underline-light mr-5'
              to='/companies'
            >
              Companies
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className='nav-link link-secondary link-underline-light mr-5'
              to='/jobs'
            >
              Jobs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className='nav-link link-secondary link-underline-light mr-5'
              to='/profile'
            >
              Profile
            </NavLink>
          </NavItem>
          <NavItem className="m-2">
            <NavLink
              className='link-secondary link-underline-light' >
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
            </NavLink>
          </NavItem>
          <NavItem className="m-2">
            <NavLink
              onClick={handleSignOut}
              className=' link-secondary link-underline-light' >
              Sign out
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }

  function loggedOut() {
    return (
      <Navbar>
        <NavLink to='/' className="navbar-brand">
          Jobly
        </NavLink>
        <Nav>
          <NavItem className="mr-4">
            <NavLink
              className='nav-link link-secondary link-underline-light'
              to="/login" >
              Login
            </NavLink>
          </NavItem>
          <NavItem className="mr-4">
            <NavLink
              className='nav-link link-secondary link-underline-light'
              to='/signup'>
              Sign up
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }


  return (
    <div>
      {!user ? loggedOut() : loggedIn()}
    </div>
  )
}

export default NavBar;