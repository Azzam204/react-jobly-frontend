import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import JoblyApi from './api'
import NavBar from './NavBar'
import RoutesList from './RoutesList'
import Loading from './Loading'
import UserContext from './userContext'
import './App.css'
import { jwtDecode } from 'jwt-decode'
import useLocalStorage from './useLocalStorage'

/** 
 * user : user data from the API. Accessed elsewhere using context
 * 
 * token : authentication JWT. required for some API calls. Stored in localStorage using useLocalStorage custom hook
 * 
 * jobsApplied : set of jobs that  have been applied to. Keeps track of job ids. used to prevent duplicate job applications and to display jobs that have been applied to
 * 
 * loaded : loaded === false while app checks and sets user data. while loaded = false loading screen is displayed*/ 

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useLocalStorage('token')
  const [jobsApplied, SetJobsApplied] = useState(new Set([]))
  const [loaded, setloaded] = useState(false)

  /** Retrieve user from api and list of jobs applied to.
   * runs on first render, when a user logs in, or when a user logs out*/ 

  useEffect(() => {
    async function fetchUser() {

      if (token) {
        try {
          JoblyApi.token = token
          const res = await JoblyApi.getUser(jwtDecode(token).username)
          setUser(res)
          SetJobsApplied(new Set(res.applications))
        } catch (error) {
          console.error(error)
          setUser(null)
        }
      }
      setloaded(true)
    }
    setloaded(false)
    fetchUser()

  }, [token])

  // Handles Sign out

  const handleSignOut = () => {
    setUser(null)
    setToken(null)
  }

  // Hanles log in
  // retrieves token from api and saves it in local storage and state.

  async function handleLogin(data) {

    let res = await JoblyApi.login(data);
    if (!res.error) {
      setToken(res)
      return true
    }
    return res
  }

  // Handle Sign up
  // registers new user and logs them in

  async function handleSignUp(data) {
    let res = await JoblyApi.signup(data)
    if (!res.error) {
      setToken(res)
      return true
    }
    return res
  }

  // Handle profile edit
  // sents updated user data to api. Updates user state

  async function handleProfileEdit(username, data) {
    let res = await JoblyApi.editUser(username, data)
    setUser(res.user)
    return res
  }

  // Checks if a job has been applied to

  function isApplied(id) {
    return jobsApplied.has(id)
  }

  // Apply to a job and save job id in state

  async function applyToJob(job) {
    await JoblyApi.applyToJob(user.username, job.id)
    SetJobsApplied(new Set([...jobsApplied, job.id]))
  }

  // Display loading screen while user is being set
  // prevents pages from rendering without user data being loaded
  if (!loaded) {
    return (
      <Loading />
    )
  }




  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, applyToJob, isApplied}}>
        <NavBar handleSignOut={handleSignOut} />
        <div className='app'>
          <RoutesList handleLogin={handleLogin} handleSignUp={handleSignUp} handleProfileEdit={handleProfileEdit} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>

  )
}

export default App
