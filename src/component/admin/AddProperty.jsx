import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Row, Container, Col } from 'reactstrap';
import ButtonSend from '../common/Button';
import SideBar from '../vendor/common/SideBar';
// import GetApiService from '../../service/ApiService';

const Role = () => {
    const [amenities, setAmenities] = useState({});
    const [propertyType, setPropertyType] = useState({});
    const [state, setState] = useState({});
    const [city, setCity] = useState({});
    const [file,setFiles] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8078/subamenities/get")
            .then(res => {
                setAmenities(res.data);
            })
            .catch(err => console.error(err));

        axios.get("http://localhost:8078/state/get")
            .then(res => {
                setState(res.data);
            })
            .catch(err => console.error(err));

        axios.get("http://localhost:8078/propertytype/get")
        .then(res => {
            setPropertyType(res.data);
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

    const uploadFile = (e) => {
        console.log(e);
        setFiles(...file,...e.target.files);
        console.log("files is "+file);
    }

    return (
        <>
            <section className='add-new-property'>
                <Row>
                <Col className="col-3 admin-sidebar">
                    <SideBar />
                </Col>
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
                                            {Array.isArray(propertyType) && propertyType.map(obj => (
                                                <option value={obj.propertyType_id}>{obj.propertytype_name}</option>
                                            ))}
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
                                        <Input type='file' multiple onChange={uploadFile}/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <h4>Amenities and Features</h4>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <h6>Living Room</h6>
                                        {Array.isArray(amenities) && amenities.map(object => (
                                            <checkbox>
                                                {/* {console.log(amenities)} */}
                                               
                                                {object.amenitiesModel.amenitiesId === 1}
                                                    <ul style={{ display: 'flex' }}>
                                                        <li><Input type='checkbox' name="subAminitiesModel" className='aminitiesAdd-checkbox' value={object.subamenitiesId} />
                                                            <label>{object.subamenitiesName}</label></li>
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
