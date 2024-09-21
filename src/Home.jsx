import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import UserContext from "./userContext";

/** Homepage
 * 
 * if logged in, displays welcome page
 * 
 * else, displays login and register buttons*/ 

function Home() {
  const { user } = useContext(UserContext)


  return (
    <div className="Home">
      <div className="container text-center">
        <h1 className="mb-4">Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        {user
          ?
          <h2>Welcome Back, {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}!</h2>
          :
          <div>
            <Link
              to='/login'
              className="m-2"
            >
              <Button color='primary'>Log in</Button>
            </Link>
            <Link
              to='/signup'
              className="m-2">
              <Button color='primary'>Sign up</Button>
            </Link>
          </div>}
      </div>
    </div>
  )
}

export default Home;