import { Button } from "bootstrap";
import React from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Banner from '../../images/index/slider4.jpg';
import ButtonSend from '../common/Button';

export default function ListProperty() {
    return (
        <section className="detailproperty">
            <Container>
                <Row>
                    <Col className="col-8">
                        <h3>Family House For Rent</h3>
                        <ul>
                            <li><i className="fa fa-map-marker"></i> 7th Floor , Kalyaniu Nagar , Pune / </li>
                            <li><i className="fa fa-clock"></i> 7 month ago / </li>
                            <li><i className="fa fa-check-circle"></i> Booked : 5 </li>
                        </ul>
                    </Col>
                    <Col className="col-4 listprice">
                        <h2>$12,500</h2>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-8">
                        <aside className="img-zoom-container">
                            <img src={Banner} alt="img" style={{ height: "420px", width: '100%' }} />
                        </aside>
                        <aside className="contentproperty">
                            <article className="overviewproperty">
                                <h3>Overview</h3>
                                <span className="listoverview">
                                    <ul>
                                        <li><i className="fa fa-home"></i></li>
                                        <li><span>Type :</span><p><b>Apartment</b></p></li>
                                    </ul>
                                    <ul>
                                        <li><i className="fa fa-home"></i></li>
                                        <li><span>Area :</span><p><b>5000 Sqft</b></p></li>
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
                                    Praesent eros turpis, commodo vel justo at, pulvinar mollis eros.
                                    Mauris aliquet eu quam id ornareor bi ac quam enim. Cras vitae nulla condimentum, semper dolor non, faucibus dolor.
                                    Vivamus adip iscing eros quis orci fringilla, sed pretium lectus viverra.
                                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                </p>
                                <p>
                                    Praesent eros turpis, commodo vel justo at, pulvinar mollis eros. Mauris aliquet eu quam id ornareor bi ac quam enim.
                                    Cras vitae nulla condimentum, semper dolor non, faucibus dolor. Vivamus adip iscing eros quis orci fringilla, sed pretium lectus viverra.
                                </p>
                            </article>
                            <article className="propertyamenities">
                                <h3>Features & Amenities</h3>
                                <ul>
                                    <li><i class="fa fa-check-circle"></i>
                                        <label>AC</label></li>
                                    <li><i class="fa fa-check-circle"></i>
                                        <label>TV Cable</label></li>
                                    <li><i class="fa fa-check-circle"></i>
                                        <label>AC</label></li>
                                    <li><i class="fa fa-check-circle"></i>
                                        <b>AC</b></li>
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
    )
}