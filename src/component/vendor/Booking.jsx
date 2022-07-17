import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Input, Row, Col, Button, Container } from 'reactstrap';
import Header from '../Header'
import SideBar from "./common/SideBar";
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Listing() {

    const VendorSession = JSON.parse(localStorage.getItem('profile'));
    const [BookedProperty, setBookedProperty] = useState([]);

    const getdata = async () => {
        console.log(VendorSession.registrationId)
        await axios.get("http://localhost:8074/viewbookingvendorproperty/getall/" + VendorSession.registrationId).then(
            (response) => {
                setBookedProperty(response.data)
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
        <Container>
            <Row className="col-12" style={{ backgroundColor: '#F5F7FB',margin:0 }}>
                <Col>
                    {/* <div className='list-img'>
                        <img src="/images1/birthday2.jpg" alt="Snow" style={{ width: "100%" }} />
                        <div class="centered">Centered</div>
                    </div> */}
                    <hr />
                    <Row>
                        <Col>
                            <Input type='search' name='searchList' placeholder='Search' />
                        </Col>
                        <Col className="col-6" style={{ textAlign: 'right' }}>
                            <label style={{ marginRight: '20px' }}>Sort by: </label>
                            <select className="custom-select12">
                                <option id="option" value="1">Default</option>
                                <option className="option" value="older">Older</option>
                                <option className="option" value="newer">Newer</option>
                                <option className="option" value="atoz">Name: A-Z</option>
                                <option className="option" value="ztoa">Name: Z-A</option>
                            </select>
                        </Col>
                    </Row>
                    {BookedProperty.map((item) => (
                        <Row className="allproperty-result">
                        <Col className="col-2" style={{ width: 'auto' }}>
                            <a href="#"><img alt="widget" src={"/images1/" + item.propertyModel.photoModel[0].photopath} onClick={""} className="relatedproperty" /></a>
                            {/* <img alt="widget" src="/images1/b.jpg" /> */}
                        </Col>
                        <Col className="col-3">
                            <i style={{ float: 'right' }} className="fa fa-trash delete" />
                            <a href="#">{item.propertyModel.propertyTypeModel.propertytypeName}</a>
                            <h4><Link to={"/detailproperty/"+item.propertyModel.propertyId}>{item.propertyModel.propertyName}</Link></h4>
                            <i className="fa fa-map-marker"></i> Gujarat, Surat
                            <p><b><i className="fa fa-coins icon" /> <label>₹{item.price}/day</label></b></p>
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
        </Container>
    )
}
