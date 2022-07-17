import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Container, Col } from 'reactstrap';
import pic from '../../images/authentication/login-img.svg';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    let navigate = useNavigate();

    const [state, setState] = useState({});
    const [city, setCity] = useState({});
    const [regform, setRegForm] = useState(true);
    const [otpform, setOtpForm] = useState(false);
    const [values, setValues] = useState({
        roleModel: {
            roleId: 3
        },
        firstname: "",
        lastname: "",
        emailId: "",
        password: "",
        contactNumber: "",
        cityModel: {
            cityId: 1
        },
        pincode: ""
    });
    const [errors, setErrors] = useState({});
    const [otp, setOtp] = useState(0);

    const selectionChange = (e) => {

        axios.get("http://localhost:8078/city/getcitystatewise/" + e.target.value)
            .then(res => {
                setCity(res.data);
            })
            .catch(err => console.error(err));
    }

    const handleChange = (event) => {
        console.log(event.target);
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        // setValues(prevState=>({
        //     ...prevState,
        //     cityModel:{
        //         city_id:values['city_id']
        //     },
        //     roleModel:{
        //         role_id:values['role_id']
        //     }
        // }));
        console.log(values);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/registration/saveuser", values).then(
            (response) => {
                console.log(response);
                alert("Otp Sent Successfully");
                setOtpForm(!false);
                setRegForm(!true);
            }, (error) => {
                console.log(error);
                alert("Operation failed");
            }
        );
    }
    const sendOtp = async () => {
        setOtp(values['otpcode']);
        console.log(otp);
        await axios.post("http://localhost:8080/registration/otpcode/" + otp).then(
            (response) => {
                console.log(response);
                alert("New User Added");
                navigate("/login");
            }, (error) => {
                console.log(error);
                alert("Wrong OTP...");
            }
        );
    }
    useEffect(() => {
        axios.get("http://localhost:8078/state/get")
            .then(res => {
                setState(res.data);
            })
            .catch(err => console.error(err));
    }, [])
    return (
        <>
            {regform && (
                <section className='section-reg'>
                    <Container>
                        <Row className='row-reg'>
                            <Col className='col fadeRight-content'>
                                <h2 className='h2 mb-4'><b>Sign Up</b></h2>
                                <hr />
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup tag="fieldset">
                                        <Row>
                                            <Col> <Label check>
                                                <Input type="radio" name="role_id" value={3} onChange={handleChange} />{' '}
                                                User
                                            </Label></Col>
                                            <Col> <Label check>
                                                <Input type="radio" name="role_id" value={2} onChange={handleChange} />{' '}
                                                Vendor
                                            </Label></Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col>
                                                <Input type="text" name="firstname" placeholder="Firstname" onChange={handleChange} />
                                            </Col>
                                            <Col>
                                                <Input type="text" name="lastname" placeholder="Lastname" onChange={handleChange} />

                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="email" name="emailId" placeholder="Email id" onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="password" name="repassword" placeholder="Confirm Password" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col>
                                                <Input type="number" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
                                            </Col>
                                            <Col>
                                                <Input type="number" name="pincode" placeholder="Pincode" onChange={handleChange} />
                                            </Col>
                                        </Row>
                                    </FormGroup>

                                    <FormGroup>
                                        <Row>
                                            <Col>
                                                <Input type="select" name="state_id" onChange={handleChange}>
                                                    <option selected>Select State</option>
                                                    {Array.isArray(state) && state.map(object => (
                                                        <option value={object.state_id}>{object.state_name}</option>
                                                    ))}
                                                </Input>
                                            </Col>
                                            <Col>
                                                <Input type="select" name="city_id" onChange={handleChange}>
                                                    <option selected>Select City</option>
                                                    {Array.isArray(city) && city.map(object => (
                                                        <option value={object.city_id} >{object.city_name}</option>
                                                    ))}
                                                </Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <Button onClick={handleSubmit}>Submit</Button>
                                    <Row className='mt-3'>
                                        <Col>
                                            Already a member? <Link to="/login" className='signinlink'> Sign in now </Link>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                            <Col className='col-6 fadeLeft-content'>
                                <img src={pic} className='img-fluid' />
                            </Col>
                        </Row>
                    </Container>
                </section>
            )}
            {otpform && (
                <section>
                    <section className='section-reg'>
                        <Container>
                            <Row className='row-Login'>
                                <Col className='fadeLeft-content'>
                                    <h2 className='h2 mb-4'><b>OTP Verification</b></h2>
                                    <hr />
                                    <Form>
                                        <FormGroup>
                                            <Input type="number" name="otpcode" onChange={handleChange} placeholder="Enter OTP code" />
                                        </FormGroup>
                                        <Button onClick={sendOtp}>Send</Button>
                                        <Row className='mt-3'>
                                            <Col>
                                                <Link to="/" className='signinlink'> Resend OTP ? </Link>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </section>
            )}
        </>

    )
}
