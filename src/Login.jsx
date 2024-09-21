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
import { useNavigate } from 'react-router-dom'

/** Login page
 * 
 * Displays log in form
 * 
 * calls handleLogin on submit
 * 
 * if successfull, redirects to home
 * 
 * else, display errors
 */ 


function Login({ handleLogin }) {

  const DEFAULT = {
    username: '',
    password: ''
  }

  const navigate = useNavigate()

  const [formData, setFormData] = useState(DEFAULT)
  const [error, setError] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data, [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await handleLogin(formData)
    res.error ? setError(res.error) : navigate('/')
  }

  return (
    <div className="pt-5 container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h3 className="mb-3 white" >
        Log In
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
                required
              />

              <Label for='password' className="fw-bold">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                autoComplete="on"
                onChange={handleChange}
                required
              />

              {error && <div className="alert alert-danger" role="alert">{error}</div>}

              <div className="d-grid gap-2 mt-3">
                <Button color="primary">Submit</Button>
              </div>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default Login;