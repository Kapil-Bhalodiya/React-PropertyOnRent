import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, FormGroup, Input, Row, Col, Button, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';

export default function User() {
    const [subamenities, setsubAmenities] = useState({});
    const [propertyType, setPropertyType] = useState({});
    const [state, setState] = useState({});
    const [city, setCity] = useState({});
    const [photoModel, setPhotoModel] = useState([]);
    const [amenites, setAmenities] = useState({});
    const [propertyAmenitiesModels, setPropertyAmenitiesModels] = useState([]);
    const [values, setValues] = useState({
        postedDate: Date.now(),
        registrationModel: {
            registrationId: 1
        },
        propertyTypeModel: {
            propertytypeId: 0
        },
        cityModel: {
            cityId: 0
        }
    });
    const [events, setEvents] = useState([]);
    const [passevents, setPassEvents] = useState({});
    const [eventPackagesModels, setEventPackagesModels] = useState([]);
    const [isShowing, setIsShowing] = useState(false);
    const [postData, setPostData] = useState([]);

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

    const handleTypeChange = (e) => {
        setValues(prevState => ({
            ...prevState,
            propertyTypeModel: {
                propertytypeId: e.target.value
            }
        }))
    }

    const handleCityChange = (e) => {
        setValues(prevState => ({
            ...prevState,
            cityModel: {
                cityId: e.target.value
            }
        }))
    }

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

    const removeEvent = (index) => {
        const updatedEvents = eventPackagesModels.filter((element, id) => {
            return index != id
        })
        setEventPackagesModels(updatedEvents);
    }

    const handleEventChange = (e) => {
        setPassEvents(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }
        ));
    }

    const handleEventModelChange = (e) => {
        setPassEvents(prevState => ({
            ...prevState,
            eventsModel: {
                eventsId: e.target.value
            }
        }));
    }

    const handleaddSubmenities = (e) => {
        const { value, checked } = e.target;
        setPropertyAmenitiesModels(prevState => ([
            ...prevState,
            {
                subAmenities: {
                    [e.target.name]: value
                }
            }
        ]));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPostData({
            ...values,
            photoModel,
            propertyAmenitiesModels,
            eventPackagesModels
        });
        console.log(postData);
        addProperty();
    }

    const addProperty = async () => {
        await axios.post("http://localhost:8074/property/add", postData).then(
            (response) => {
                console.log(response);
                alert("Add Successfully");
            }, (error) => {
                console.log(error);
                // alert("operation fail");
            })
    }

    const uploadFile = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            setPhotoModel(prevState => ([
                ...prevState,
                {
                    photopath: e.target.files[i].name
                }
            ]))  
        }
    }

    const handleEvent = (e) => {
        setEventPackagesModels(eventPackagesModels => [...eventPackagesModels, passevents]);
    }

    const SessionId = JSON.parse(sessionStorage.getItem("profile"));
    return (
        <>
            <Row className="col-12 topbar-vendor">
                <h2>Welcome , {SessionId.firstName +" "+SessionId.lastName}</h2>
            </Row>
            <Container>
                <Row className="col-12" style={{ backgroundColor: '#F5F7FB' }}>
                    <Col>
                        <h4>Basic Information</h4>
                        <Form encType="multipart/form-data">
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Input type="text" name="propertyName" class="form-control" placeholder='Property Title' onChange={handleChange} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <textarea type="text" name="description" style={{ height: 200, background: 'white' }} placeholder="Decsription" onChange={handleChange}></textarea>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Input type="number" name="price" placeholder="Price" onChange={handleChange} />
                                    </Col>
                                    <Col>
                                        <Input type="number" name="area" placeholder="Area(Sq. ft)" onChange={handleChange} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <select className='custom-select' name="propertytypeId" onChange={handleTypeChange}>
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
                                        <textarea type="text" name="policy" style={{ height: 200, background: 'white' }} placeholder="Policy" onChange={handleChange}></textarea>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <h4><p>Location Information</p></h4>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Input type="number" name="pincode" placeholder="Pincode" onChange={handleChange} />
                                    </Col>
                                    <Col>
                                        <Input type="text" name="address" placeholder="Address" onChange={handleChange} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <select className='custom-select' name="stateId" onChange={selectionChange}>
                                            <option selected>Select State</option>
                                            {Array.isArray(state) && state.map(object => (
                                                <option value={object.state_id}>{object.state_name}</option>
                                            ))}
                                        </select>
                                    </Col>
                                    <Col>
                                        <select className='custom-select' name="cityId" onChange={handleCityChange}>
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
                            <h4>Events and Events Packages
                                <Button onClick={() => setIsShowing(true)} style={{ float: 'right' }}>Add Event +</Button>
                            </h4>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <ul className="chip-control">
                                            {Array.isArray(eventPackagesModels) && eventPackagesModels.map((obj, index) => (
                                                <li>{obj?.packageName} <i onClick={() => removeEvent(index)} className="fa fa-times"></i></li>
                                            ))}
                                        </ul>

                                        <Modal
                                            isOpen={isShowing}
                                            toggle={() => setIsShowing(!isShowing)}>
                                            <ModalHeader toggle={() => setIsShowing(!isShowing)}>
                                                Add Events
                                            </ModalHeader>
                                            <ModalBody>
                                                <Form>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col>
                                                                <select className='custom-select' name="event_id" onChange={handleEventModelChange}>
                                                                    <option selected>Event Type</option>
                                                                    {Array.isArray(events) && events.map(obj => (
                                                                        <option value={obj.eventsId}> {obj.eventsName} </option>
                                                                    ))}
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col>
                                                                <Input type="text" name="packageName" placeholder="Package Name" onChange={handleEventChange} />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col>
                                                                <textarea type="text" name="packageDescription" style={{ height: 200, background: 'white' }} placeholder="Decsription" onChange={handleEventChange}></textarea>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col>
                                                                <Input type="text" name="price" placeholder="Price" onChange={handleEventChange} />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col>
                                                                <Button style={{ width: '50%', height: '50px', background: 'rgba(14, 46, 80, 0.92)', float: 'right' }} onClick={handleEvent}>Save</Button>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                        </Modal>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Button style={{ width: '25%', height: '50px' }} onClick={handleSubmit}>Add</Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
