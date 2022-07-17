import React, { useState } from 'react'
import { Button, Form, FormGroup, Input, Row, Container, Col } from 'reactstrap';
import pic from '../../images/authentication/auth-login.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const [state, setState] = React.useState({
    emailId: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const getUserDetail = async (emailId) => {
    let res = await axios.get('http://localhost:8008/login/profile/'+emailId);
    if(res.status == 200) localStorage.setItem("profile",JSON.stringify(res.data));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    let res = await axios.post('http://localhost:8008/login/authentication', state);
    console.log("status : "+res.status);
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(res.data));
      getUserDetail(JSON.parse(localStorage.getItem("user")).emailId);
      res.data.role == '[ROLE_User]' ? navigate("/user") : navigate("/vendor");
    } else {
      alert("Wrong EmailId ");
      console.log("Wrong EmailId and Password");
    }
  }

  return (
    <>
      <section className='section-reg'>
        <Container>
          <Row className='row-Login'>
            <Col className='fadeLeft-content'>
              <h2 className='h2 mb-4'><b>Sign In</b></h2>
              <hr />
              <Form>
                <FormGroup>
                  <Input type="email" name="emailId" value={state.emailId} id="email" onChange={handleChange} placeholder="Email id" />
                </FormGroup>
                <FormGroup>
                  <Input type="password" name="password" value={state.password} id="password" onChange={handleChange} placeholder="Password" />
                </FormGroup>
                <Button onClick={handleLogin}>Login</Button>
                <Row className='mt-3'>
                  <Col>
                    Not a member? <Link to="/register" className='signinlink'> Sign up now </Link>
                  </Col>
                </Row>
                
              </Form>
            </Col>
            <Col className='fadeRight-content'>
              <img src={pic} className='img-fluid' />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
export default Login;