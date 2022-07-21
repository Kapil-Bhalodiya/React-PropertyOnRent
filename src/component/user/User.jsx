import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Row, Col, Button, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';
import moment from "moment";


export default function User() {

    const SessionId = JSON.parse(sessionStorage.getItem("profile"));
    const [UserProperty, setUserProperty] = useState([]);
    const getdata = async () => {
        await axios.get("http://localhost:8076/booking/get/" + SessionId.registrationId).then(
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
                    <Row className="allproperty-result">
                        {UserProperty.map((item) => (
                            
                            <Col className="col-6" style={{pointerEvents :'none'}}>
                                {console.log(item)}
                            <div class="dashboard-listings-item fl-wrap">
                            <div class="dashboard-listings-item_img">
                                <div class="bg-wrap">
                                <img src={"/images1/" + item.propertyModel.photoModel[0].photopath} alt="" style={{ width: "100%",height:"224px" }} />
                                </div>
                            </div>
                            <div class="dashboard-listings-item_content">
                            <h4><Link to={"/detailproperty/" + item.propertyModel.propertyId}>{item.propertyModel.propertyName}</Link></h4>
                                <div class="geodir-category-location">
                                    <a href="#"><i class="fas fa-map-marker-alt"></i><span> {item.propertyModel.address} , {item.propertyModel.cityModel.cityName}</span></a>
                                </div>
                                <p><b><i className="fa fa-coins icon" /> <label>₹{item.price}</label></b></p>
                                <p><b><i className="fa fa-clock icon" /> <label>Booked Date : {moment(item.checkIn).format('YYYY-MM-DD')} To {moment(item.checkOut).format('YYYY-MM-DD')}</label></b></p>   
                                <div class="dashboard-listings-item_opt">
                                    <span class="viewed-counter"><i class="fas fa-eye"></i> Viewed -  24 </span>
                                    <ul>
                                        <li><a href="#" class="tolt" data-microtip-position="top-left" data-tooltip="Delete"><i class="far fa-trash-alt"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        </Col>
                        ))}
                    </Row>
                    <Row>
                    
                    </Row>
                </Col>
            </Row>
        </>
    )
}
