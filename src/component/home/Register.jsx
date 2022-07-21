import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Container, Col } from 'reactstrap';
import pic from '../../images/authentication/login-img.svg';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


export default function Register() {

    useEffect(() => {
        getStates();
    }, [])


    let navigate = useNavigate();
    const [otp, setOtp] = useState(0);
    const [city, setCity] = useState([]);
    const [states, setStates] = useState([]);
    const [cityModel, setCityModel] = useState({});
    const [stateModel, setStateModel] = useState({})
    const [roleModel, setRoleModel] = useState({});
    const [regform, setRegForm] = useState(true);
    const [otpform, setOtpForm] = useState(false);
    const [values, setValues] = useState({});
    const [registerData, setRegisterData] = useState({});

    const getCity = async (e) => {
        setStateModel({
            'stateModel': {
                stateId: e.target.value
            }
        })
        axios.get("http://localhost:8078/city/getcitystatewise/" + e.target.value)
            .then(res => {
                setCity(res.data);
            })
            .catch(err => console.error(err));

    }
    const onCityChange = (e) => {
        setCityModel(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
            ...stateModel,
        }));
    }

    const getStates = () => {
        axios.get("http://localhost:8078/state/get")
            .then(res => {
                setStates(res.data);
            })
            .catch(err => console.error(err));
    }

    const handleRoleChange = (e) => {
        setRoleModel(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleChange = (e) => {
        setValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setRegisterData({
            ...registerData, ...values, roleModel, cityModel
        });
        console.log(registerData);
        addProperty();
    }

    const addProperty = async () => {
        try {
            await axios.post("http://localhost:8008/registration/saveuser", registerData);
            alert("Otp Sent Successfully");
            setOtpForm(!false);
            setRegForm(!true);
        } catch (error) {
            alert("Operation failed");
        }
    }

    const sendOtp = async () => {
        setOtp(values['otpcode']);
        try {
            await axios.post("http://localhost:8008/registration/otpcode/" + otp);
            alert("New User Added");
            navigate("/login");
        }catch(error){
            console.log(error);
            alert("Wrong OTP...");
        }
}

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
                                            <Input type="radio" name="roleId" value={3} onChange={handleRoleChange} />{' '}
                                            User
                                        </Label></Col>
                                        <Col> <Label check>
                                            <Input type="radio" name="roleId" value={2} onChange={handleRoleChange} />{' '}
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
                                            <select className='custom-select' name="stateId" onChange={getCity} placeholder="All States">
                                                <option value="1">All States</option>
                                                {states.map(obj => (
                                                    <option value={obj.state_id}>{obj.state_name}</option>
                                                ))}
                                            </select>
                                        </Col>
                                        <Col>
                                            <select className='custom-select' name="cityId" onChange={onCityChange} placeholder="All City">
                                                <option value="1">All City</option>
                                                {city.map(obj => (
                                                    <option value={obj.city_id}>{obj.city_name}</option>
                                                ))}
                                            </select>
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
