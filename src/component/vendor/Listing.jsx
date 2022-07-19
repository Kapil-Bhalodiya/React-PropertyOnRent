import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Input, Row, Col, Button, Container } from 'reactstrap';
import Header from '../Header'
import SideBar from "./common/SideBar";
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Listing() {

    const VendorSession = JSON.parse(sessionStorage.getItem('profile'));
    const [VendorProperty, setVendorProperty] = useState([]);

    const getdata = async () => {

        await axios.get("http://localhost:8074/property/vendorproperties/" + VendorSession.registrationId).then(
            (response) => {
                setVendorProperty(response.data)
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
            <Container>
                <Row className="col-12">
                    <Col>
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
                        {VendorProperty.map((item) => (
                            <Row className="allproperty-result">
                                <Col className="col-5" style={{ padding : 0}}>
                                    <img alt="widget" src="/images1/b.jpg" />
                                </Col>
                                <Col className="col-6" style={{paddingLeft : 50}}>
                                    <i style={{ float: 'right' }} className="fa fa-trash delete" />
                                    <a href="#">Apartment</a>
                                    <h4><Link to={"/detailproperty/" + item.propertyId}>{item.propertyName}</Link></h4>
                                    <i className="fa fa-map-marker"></i> Gujarat, Surat
                                    <p><b>{item.price}</b>/mo</p>
                                    <ul style={{ padding: 'initial', display: 'flex', justifyContent: 'space-between' }}>
                                        {/* <li style={{ borderRight: '2xp solid' }}><i className="fa fa-bed icon" /> <label>Beds : 03</label></li>
                                <li><i className="fa fa-shower icon" /> Bath : 02 </li> */}
                                        <li><i className="fa fa-eye icon" /> Booked :  </li>
                                    </ul>
                                </Col>
                                {/* <Col className="col-2" style={{ width: 'auto' }}>
                                    <img alt="widget" src="/images1/b.jpg" />
                                </Col> */}
                            </Row>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
