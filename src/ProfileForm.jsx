import React, { useContext, useState } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Label,
  Input,
  Button
} from 'reactstrap';
import { useNavigate, Navigate } from 'react-router-dom'
import useLocalStorage from "./useLocalStorage";
import UserContext from "./userContext";

/**Profile Update page
 * 
 * Displays profile form
 * 
 * on submit handleProfileEdit function is called and user is updated across the app
 * 
 * succesfull update gives a success alert
 * 
 * unsuccesfull update gives a warning alert
 * */ 

function ProfileForm({ handleProfileEdit }) {


  const { user, setUser } = useContext(UserContext)
  const [token] = useLocalStorage('token')
  const [formData, setFormData] = useState(user)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)


  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data, [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, firstName, lastName, email } = formData
    const submitData = { firstName, lastName, email }
    let res = await handleProfileEdit(username, submitData)
    res.error ? setError(res.error) : setSuccess(true)

  }


  return (
    <div className="pt-5 container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h3 className="mb-3 white" >
        Profile
      </h3>
      <Card >
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <Label for='username' className="fw-bold">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                disabled
              />

              <Label for='firstName' className="fw-bold">
                First name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <Label for='lastName' className="fw-bold">
                Last name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
              />

              <Label for='email' className="fw-bold">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {success && <div className="alert alert-success" role="alert">Profile updated!</div>}
              {error && <div className="alert alert-danger" role="alert">{error}</div>}

              <div className="d-grid gap-2 mt-3">
                <Button color="primary">Save Changes</Button>
              </div>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default ProfileForm;