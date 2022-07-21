import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";


export default function Listing() {

    const VendorSession = JSON.parse(sessionStorage.getItem('profile'));
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
            <Row className="col-12" style={{ backgroundColor: '#F5F7FB', margin: 0 }}>
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
                    <Row>
                    {BookedProperty.map((item) => (
                        <Col className="col-6">
                            {console.log(item)}
                            <Col className="bookings-item fl-wrap">
                                <div class="bookings-item-header fl-wrap">
                                    <img src={"/images1/"+item.propertyModel.photoModel[0].photopath} alt="" />
                                    <h4>For <a href={"/detailproperty/"+item.propertyModel.propertyId} target="_blank" style={{textDecoration : 'none',color:'#00a376'}}>{item.propertyModel.propertyName}</a></h4>
                                    {/* <span class="new-bookmark">New</span> */}
                                </div>
                                <div class="bookings-item-content fl-wrap">
                                    <ul>
                                        <li>Name : <span>{item.registrationModel.firstname + " " +item.registrationModel.firstname}</span></li>
                                        <li>Phone : <span>{item.registrationModel.contactNumber}</span></li>
                                        <li>Date : <span>{moment(item.checkIn).format('YYYY-MM-DD')} To {moment(item.checkOut).format('YYYY-MM-DD')}</span></li>
                                        <li>Event : <span>{item.eventPackageId}</span></li>
                                    </ul>
                                </div>
                            </Col>
                        </Col>
                    ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
