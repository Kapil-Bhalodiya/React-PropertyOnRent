import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Row, Container, Col } from 'reactstrap';
import ButtonSend from '../common/Button';

const Role = () => {
    const [aminites, setAminites] = useState({});
    const [state, setState] = useState({});
    const [city, setCity] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8078/subamenities/get")
            .then(res => {
                setAminites(res.data);
            })
            .catch(err => console.error(err));

        axios.get("http://localhost:8078/state/get")
            .then(res => {
                setState(res.data);
            })
            .catch(err => console.error(err));
    }, '')

    const selectionChange = (e) => {

        axios.get("http://localhost:8078/city/getcitystatewise/" + e.target.value)
            .then(res => {
                setCity(res.data);
            })
            .catch(err => console.error(err));
    }

    const handleChange = () => {

    }

    return (
        <>
            <section className='add-new-property'>
                <Row>
                    <Col>
                        <h4><p>Basic Information</p></h4>
                        <Form>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Input type="text" class="form-control" placeholder='Property Title' />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <textarea type="text" placeholder="Decsription"></textarea>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Input type="text" name="firstname" placeholder="Price" />
                                    </Col>
                                    <Col>
                                        <Input type="text" placeholder="Area(Sq. ft)" />

                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <select className='custom-select' name="propertytype_id">
                                            <option selected>Property Type</option>
                                            {/* {console.log(aminites)} */}
                                            <option value="1">Houses</option>
                                            <option value="2">Apartment</option>
                                            <option value="3">Villas</option>
                                            <option value="4">Commercial</option>
                                        </select>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <h4><p>Location Information</p></h4>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Input type="number" placeholder="Pincode" />
                                    </Col>
                                    <Col>
                                        <Input type="text" name="Address" placeholder="Address" />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <select className='custom-select' name="state_id" onChange={selectionChange}>
                                            <option selected>Select State</option>
                                            {console.log(aminites)}
                                            {Array.isArray(state) && state.map(object => (
                                                <option value={object.state_id}>{object.state_name}</option>
                                            ))}
                                        </select>
                                    </Col>
                                    <Col>
                                        <select className='custom-select' name="city_id" onChange={handleChange}>
                                            <option selected>Select City</option>
                                            {Array.isArray(city) && city.map(object => (
                                                <option key={object.city_id}>{object.city_name}</option>
                                            ))}
                                        </select>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <h4>Photos</h4>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Input type='file' />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <h4>Amenities and Features</h4>
                            <FormGroup>
                                <Row>
                                    <Col>
                                    {Array.isArray(aminites) && aminites.map(object => (
                                        <checkbox>
                                            {console.log("this is :"+object)}
                                            <h6>{object.forEach(element => {
                                                console.log(element);
                                            })}</h6>
                                            <ul style={{ display: 'flex' }}>
                                                <li><Input type='checkbox' className='aminitiesAdd-checkbox' value={object.subamenitiesId}/>
                                                    <label>{object.subamenitiesName}</label></li>
                                            </ul>
                                            <h6>Kitchen</h6>
                                            <ul style={{ display: 'flex' }}>
                                                <li><Input type='checkbox' className='aminitiesAdd-checkbox' />
                                                    <label>Referegrator</label></li>
                                            </ul>
                                        </checkbox>
                                    ))}
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <ButtonSend title='Add' width='50%' height='50px' />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </section>
        </>
    )
}
export default Role;
