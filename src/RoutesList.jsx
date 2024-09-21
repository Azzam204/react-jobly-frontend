import React from "react";
import { Route, Routes } from "react-router-dom";
import Private from "./Private";
import Home from "./Home";
import Login from "./Login";
import SignUp from './SignUp'
import ProfileForm from "./ProfileForm";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobsList from "./JobsList";


function RoutesList({ handleLogin, handleSignUp, handleProfileEdit }) {
  
  return (
    <div className="pt-5">
      <Routes>
        <Route
          exact path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUp handleSignUp={handleSignUp} />}
        />
        <Route
          path="/profile"
          element={<Private element={<ProfileForm handleProfileEdit={handleProfileEdit} />} />}
        />
        <Route
          exact path="/companies"
          element={<Private element={<CompanyList />} />}
        />
        <Route
          path="/companies/:handle"
          element={<Private element={<CompanyDetail />} />}
        />
        <Route
          exact path="/jobs"
          element={<Private element={<JobsList />} />}
        />
        <Route
          path="*"
          element={<Home />}
        />
      </Routes>
    </div>
  )
}

export default RoutesList;




