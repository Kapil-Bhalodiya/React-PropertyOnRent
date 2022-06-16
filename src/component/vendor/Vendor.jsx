import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, FormGroup, Input, Row, Col, Button } from 'reactstrap';
import SideBar from "./common/SideBar";


export default function User() {
    const [subamenities, setsubAmenities] = useState({});
    const [propertyType, setPropertyType] = useState({});
    const [state, setState] = useState({});
    const [city, setCity] = useState({});
    const [ifile, setFiles] = useState([]);
    const [amenites, setAmenities] = useState({});
    const [addSubAmenites, setaddSubAmenities] = useState([]);
    const [values, setValues] = useState([]);
    const [events, setEvents] = useState([]);
    const [inputFields, setInputFields] = useState([
        {packageName: '', packageDescription: '', rate: ''}
    ])

    const propertyAmenitiesModels = {

    }

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
                setAmenities(res.data);
            })
            .catch(err => console.log(err));

        axios.get("http://localhost:8078/events/get")
            .then(res => {
                setEvents(res.data);
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

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleaddSubmenities = (e) => {
        const { value, checked } = e.target;
        setaddSubAmenities(prevState => ([
            ...prevState,
            {
                subAmenities: {
                    [e.target.name]: value
                }
            }
        ]));
        console.log(addSubAmenites);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(" : Added Data : ");
        console.log(values);
        console.log(ifile);
        console.log(addSubAmenites);
    }
    const uploadFile = (e) => {
        // var files = e.target.files;
        // const uploadedfiles = [];
        // console.log("length is : " + files.length)
        // for (let i = 0; i < files.length; i++) {
        //     let myfile = files.item(i);
        //     var filepath = "../images/" + myfile.name;
        //     console.log(filepath)
        //     uploadedfiles[i] = filepath
        // }
        // console.log(uploadedfiles)
        // setFiles([...ifile, uploadedfiles])
        setFiles(prevState => ([
            ...prevState,
            {
                photoModel : {
                    [e.target.name]: e.target.files[0].name
                }
            }
        ]));
        console.log(ifile)
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
                                    <Input type="text" name="propertyName" class="form-control" placeholder='Property Title' onChange={handleChange}/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <textarea type="text" name="description"style={{height:200,background:'white'}} placeholder="Decsription" onChange={handleChange}></textarea>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input type="text" name="price" placeholder="Price" onChange={handleChange}/>
                                </Col>
                                <Col>
                                    <Input type="text" name="area" placeholder="Area(Sq. ft)" onChange={handleChange}/>

                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <select className='custom-select' name="propertytype_id" onChange={handleChange}>
                                        <option selected>Property Type</option>
                                        {Array.isArray(propertyType) && propertyType.map(obj => (
                                            <option value={obj.propertytype_id} >{obj.propertytype_name}</option>
                                        ))}
                                    </select>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <textarea type="text" name="policy" style={{height:200,background:'white'}} placeholder="Policy" onChange={handleChange}></textarea>
                                </Col>
                            </Row>
                        </FormGroup>
                        <h4><p>Location Information</p></h4>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input type="number" name="pincode" placeholder="Pincode" onChange={selectionChange}/>
                                </Col>
                                <Col>
                                    <Input type="text" name="Address" placeholder="Address" onChange={selectionChange}/>
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
                                            <option value={object.city_id} >{object.city_name}</option>
                                        ))}
                                    </select>
                                </Col>
                            </Row>
                        </FormGroup>
                        <h4>Photos</h4>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input type='file' name="photopath" multiple onChange={uploadFile} />
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
                                            <ul className="vendor-amenities">
                                                {Array.isArray(subamenities) && subamenities.map(subamenitiesObj => (
                                                    <checkbox>
                                                        {subamenitiesObj.amenitiesModel.amenitiesId == amenitiesObj.amenitiesId ?
                                                            <li><Input type='checkbox' name="subamenitiesId" className='aminitiesAdd-checkbox' value={subamenitiesObj.subamenitiesId} onChange={handleaddSubmenities} />
                                                                <label>{subamenitiesObj.subamenitiesName}</label></li>

                                                            : ''}
                                                    </checkbox>
                                                ))}
                                            </ul>

                                        </>
                                    ))}
                                </Col>
                            </Row>
                        </FormGroup>
                        <h4>Events and Events Packages</h4>
                        <FormGroup>
                            <Row>
                                <Col>
                                {Array.isArray(events) && events.map(eventsObj => (
                                     <ul className="vendor-amenities">
                                            <checkbox>
                                                <li><Input type='checkbox' name="eventsId" className='eventsAdd-checkbox' value={eventsObj.eventsId} onChange={handleaddSubmenities} />
                                                    <label style={{marginLeft:10}}>{eventsObj.eventsName}</label></li>
                                                    {inputFields.map((input, index) => {
                                                        return (
                                                            <Row key={index}>
                                                            <Col><input
                                                                name='packageName'
                                                                placeholder='Event Package Name'
                                                                value={input.packageName}
                                                            /></Col>
                                                            <Col><textarea
                                                                name='packageDescription'
                                                                placeholder='Event package Description'
                                                                value={input.packageDescription}
                                                            /></Col>
                                                            <Col><input
                                                                name='price'
                                                                placeholder='Price'
                                                                value={input.rate}
                                                            /></Col>
                                                            </Row>
                                                        )
                                                        })}
                                            </checkbox>
                                           </ul>
                                ))}
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Button style={{ width: '50%', height: '50px' }} onClick={handleSubmit}>Add</Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </>
    )
}
