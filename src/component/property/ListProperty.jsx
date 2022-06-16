import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Banner from '../images/index/slider4.jpg';
import ButtonSend from '../common/Button';
import axios from "axios";
import { useParams } from "react-router-dom";
export default function ListProperty(props) {

    const {id} = useParams();
    const [propertyData, setProprtyData] = useState([]);
    const [latestpropertyData, setLatestPropertyData] = useState([]);

    const getdata = async () => {
        console.log("this "+id)
        let res = await axios.get("http://localhost:8074/property/getall/"+id);
        setProprtyData(res.data);
    }

    const getlatestdata = async () => {
        let res = await axios.get("http://localhost:8074/property/getlatestproperty");
        setLatestPropertyData(res.data);
    }

    useEffect(() => {
        getdata()
        console.log(propertyData);
    }, [])


    return (
        <>
            <section className="detailproperty">
                <Container>
                    <Row>
                      {/* {location.state.id} */}
                        <Col className="col-8">
                            <h3>{propertyData[0]?.propertyName}</h3>
                            <ul>
                                <li><i className="fa fa-map-marker"></i> {propertyData[0]?.address + "," + propertyData[0]?.cityModel.cityName} </li>
                                <li><i className="fa fa-clock"></i> {propertyData[0]?.postedDate} </li>
                                <li><i className="fa fa-check-circle"></i> Booked : 5 </li>
                            </ul>
                        </Col>
                        <Col className="col-4 listprice">
                            <h2>${propertyData[0]?.price}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-8">
                            <aside className="img-zoom-container">
                                <img src={"/images1/" + propertyData[0]?.photoModel[0].photopath} alt="img" style={{ height: "420px", width: '50%' }} />
                                <img src={"/images1/" + propertyData[0]?.photoModel[1].photopath} alt="img" style={{ height: "420px", width: '50%' }} />
                            </aside>
                            <aside className="contentproperty">
                                <article className="overviewproperty">
                                    <h3>Overview</h3>
                                    <span className="listoverview">
                                        <ul>
                                            <li><i className="fa fa-home"></i></li>
                                            <li><span>Type :</span><p><b>{propertyData[0]?.propertyTypeModel?.propertytypeName}</b></p></li>
                                        </ul>
                                        <ul>
                                            <li><i className="fa fa-home"></i></li>
                                            <li><span>Area :</span><p><b>{propertyData[0]?.area}</b></p></li>
                                        </ul>
                                        <ul>
                                            <li><i className="fa fa-home"></i></li>
                                            <li><span>Since :</span><p><b>2002</b></p></li>
                                        </ul>
                                        <ul>
                                            <li><i className="fa fa-home"></i></li>
                                            <li><span>Type :</span><p>Apartment</p></li>
                                        </ul>
                                    </span>
                                </article>
                                <article className="aboutoverview">
                                    <h3>About This Listing</h3>
                                    <p>
                                        {propertyData[0]?.description}
                                    </p>
                                    <p>
                                        Praesent eros turpis, commodo vel justo at, pulvinar mollis eros. Mauris aliquet eu quam id ornareor bi ac quam enim.
                                        Cras vitae nulla condimentum, semper dolor non, faucibus dolor. Vivamus adip iscing eros quis orci fringilla, sed pretium lectus viverra.
                                    </p>
                                </article>
                                <article className="propertyamenities">
                                    <h3>Features & Amenities</h3>
                                    <ul style={{display:'flex',flexWrap:'wrap'}}>
                                        {propertyData[0]?.propertyAmenitiesModels.map(subAmenitiesObj =>
                                            <li><i class="fa fa-check-circle"></i>
                                                <label>{subAmenitiesObj.subAmenities.subamenitiesName}</label></li>
                                        )}
                                    </ul>
                                </article>
                            </aside>
                        </Col>
                        <Col className="col-4">
                            <Row className="col-12">
                                <aricle className="advance-search">
                                    <h4>Contact Vendor</h4>
                                    <Form>
                                        <FormGroup>
                                            <Input type="text" id="name" placeholder="Your Full Name" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input type="text" id="phone" placeholder="Phone" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input type="email" id="email" placeholder="E-mail" />
                                        </FormGroup>
                                        <FormGroup>
                                            <textarea type="email" id="email" placeholder="Message"></textarea>
                                        </FormGroup>
                                        <ButtonSend title='Send' width='100%' height='50px' />
                                    </Form>
                                </aricle>
                            </Row>
                            <Row className="col-12">
                                <article className="advance-search">
                                    <h4>Latest Property</h4>
                                    <Row>
                                        <Col className="col-5">
                                            <a href="#"><img alt="widget" src={Banner} className="relatedproperty" /></a>
                                        </Col>
                                        <Col className="item-content">
                                            <h5><a href="#">House Hold for Family Function</a></h5>
                                            <i className="fa fa-map-marker"></i> <span>Surat</span><br />
                                            <label>$1200</label><span>/mo</span>
                                        </Col>
                                    </Row>
                                    <hr />
                                </article>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section >
        </>
    )
}
