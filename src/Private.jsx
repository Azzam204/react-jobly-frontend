import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import UserContext from "./userContext";

/** Higher order component for protected routes
 * 
 * protected components are passed in as props
 * 
 * if user is saved the component passed in will render
 * 
 * else, redirects to log in page*/ 


function Private({ element }) {
  const { user } = useContext(UserContext);


  if (!user) {
    return <Navigate to='/login' />
  }


  return element
}

export default Private