import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, FormGroup, Input, Row, Col } from 'reactstrap';
import ButtonSend from '../common/Button';
import SideBar from "./common/SideBar";
import contact from "../contact/Contact";

export default function User() {
    const u = JSON.parse(localStorage.getItem("user"))
    const [subamenities, setsubAmenities] = useState({});
    const [propertyType, setPropertyType] = useState({});
    const [state, setState] = useState({});
    const [city, setCity] = useState({});
    const [ifile, setFiles] = useState([]);
    const [amenites, setAmenities] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8078/subamenities/get")
            .then(res => {
                setsubAmenities(res.data);
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

        axios.get("http://localhost:8078/amenities/get")
            .then(res => {
                console.log("amenities : " + res.data)
                setAmenities(res.data)
            })
            .catch(err => console.log(err));

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
        var files = e.target.files;
        const uploadedfiles = [];
        console.log("length is : " + files.length)
        for (let i = 0; i < files.length; i++) {
            let myfile = files.item(i);
            var filepath = "../images/" + myfile.name;
            console.log(filepath)
            uploadedfiles[i] = filepath
        }
        console.log(uploadedfiles)
        setFiles([...ifile, uploadedfiles])
        console.log("file is " + ifile)
    }
    return (
        <>
            <Row className="col-12 topbar-vendor">
                <h2>Welcome , Sweta Jaiswal</h2>
            </Row>
            <Row className="col-12" style={{ backgroundColor: '#F5F7FB' }}>
                <Col className="col-3 admin-sidebar">
                    <SideBar />
                </Col>

                <Col>
                    <h4><p>Basic Information</p></h4>
                    <Form encType="multipart/form-data">
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
                                    <Input type='file' multiple onChange={uploadFile} />
                                </Col>
                            </Row>
                        </FormGroup>
                        <h4>Amenities and Features</h4>
                        <FormGroup>
                            <Row>
                                <Col>

                                    {Array.isArray(amenites) && amenites.map(amenitiesObj => (
                                        <>
                                            <h6>{amenitiesObj.amenitiesName}</h6>
                                            <ul style={{display:'flex'}}>
                                                {Array.isArray(subamenities) && subamenities.map(subamenitiesObj => (
                                                    <checkbox>
                                                        {subamenitiesObj.amenitiesModel.amenitiesId == amenitiesObj.amenitiesId ?

                                                            <li><Input type='checkbox' className='aminitiesAdd-checkbox' />
                                                                <label value={subamenitiesObj.subamenitiesId}>{subamenitiesObj.subamenitiesName}</label></li>

                                                            : ''}
                                                    </checkbox>
                                                ))}
                                            </ul>

                                        </>
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
        </>
    )
}
