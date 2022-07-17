import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Row, Col, Button, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';


export default function User() {
    
    const [UserProperty, setUserProperty] = useState([]);
    const getdata = async () => {
        await axios.get("http://localhost:8074/property/vendorproperties/" + JSON.parse(localStorage.getItem("profile").registrationId)).then(
            (response) => {
                setUserProperty(response.data)
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        );
    }
    useEffect(() => {
        getdata()
    }, [])


    const SessionId = JSON.parse(localStorage.getItem("profile"));
    return (
        <>
           <Row className="col-12" style={{ backgroundColor: '#F5F7FB' }}>
                <Col className='m-4'>
                    <h5><p>YOUR LISTING</p></h5>
                    <hr />
                    <Row>
                        <Col>
                            <Input type='search' name='searchList' placeholder='Search' />
                        </Col>
                        <Col className="col-6" style={{ textAlign: 'right' }}>
                            <label style={{ marginRight: '20px' }}>Sort by: </label>
                            <select className="custom-select12">
                                <option id="option" value="1">Default</option>
                                <option className="option" value="2">Older</option>
                                <option className="option" value="3">Newer</option>
                                <option className="option" value="3">Name: A-Z</option>
                                <option className="option" value="3">Name: Z-A</option>
                            </select>
                        </Col>
                    </Row>
                    {UserProperty.map((item) => (
                            <Row className="allproperty-result">
                                <Col className="col-2" style={{ width: 'auto' }}>
                                    <img alt="widget" src="/images1/b.jpg" />
                                </Col>
                                <Col className="col-3">
                                    <i style={{ float: 'right' }} className="fa fa-trash delete" />
                                    <a href="#">Apartment</a>
                                    <h4><Link to="/detailproperty">{item.propertyName}</Link></h4>
                                    <i className="fa fa-map-marker"></i> Gujarat, Surat
                                    <p><b>{item.price}</b>/mo</p>
                                    <ul style={{ padding: 'initial', display: 'flex', justifyContent: 'space-between' }}>
                                        {/* <li style={{ borderRight: '2xp solid' }}><i className="fa fa-bed icon" /> <label>Beds : 03</label></li>
                                <li><i className="fa fa-shower icon" /> Bath : 02 </li> */}
                                        <li><i className="fa fa-eye icon" /> Booked : 02 </li>
                                    </ul>
                                </Col>
                                {/* <Col className="col-2" style={{ width: 'auto' }}>
                                    <img alt="widget" src="/images1/b.jpg" />
                                </Col> */}
                            </Row>
                        ))}
                </Col>
            </Row>                  
        </>
    )
}
