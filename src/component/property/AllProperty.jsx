import React from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, FormGroup, Form, Input } from "reactstrap";
import Button from '../common/Button';
import about3 from '../../images/about14.jpg';
import { Link } from "react-router-dom";
export default function AllProperty() {
    return (
        <>
            <section>
                {/* <aside className="breadcrumb">
                    <Container>
                        <Row>
                            <Col>
                                <ul>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        Property
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </aside> */}
                <aside className="grid-property">
                    <Container>
                        <Row>
                            <Col className="col-4 search-allproperty-col">

                                <article className="advance-search">
                                    <h4>Advance Search</h4>
                                    <Form>
                                        <FormGroup>
                                            <Input type="text" id="name-search" placeholder="What are you looking for?" className="cutom-input" />
                                        </FormGroup>
                                        <FormGroup>
                                            <select className="custom-select">
                                                <option id="option" value="1">Property Type</option>
                                                <option className="option" value="2">Family House</option>
                                                <option className="option" value="3">Apartment</option>
                                                <option className="option" value="4">Bunglow</option>
                                            </select>
                                        </FormGroup>
                                        <FormGroup>
                                            <select className="custom-select">
                                                <option value="1">All City</option>
                                                <option value="2">Surat</option>
                                                <option value="3">Pune</option>
                                                <option value="3">Rajkot</option>
                                            </select>
                                        </FormGroup>
                                        <Button title="search" width="100%" height="3rem" />
                                    </Form>
                                </article>
                                <article className="advance-search">
                                    <h4>Latest Property</h4>
                                    <Row>
                                        <Col className="col-5">
                                            <a href="#"><img alt="widget" src={about3} className="relatedproperty" /></a>
                                        </Col>
                                        <Col className="item-content">
                                            <h5><a href="#">House Hold for Family Function</a></h5>
                                            <i className="fa fa-map-marker"></i> <span>Surat</span><br />
                                            <label>$1200</label><span>/mo</span>
                                        </Col>
                                    </Row>
                                    <hr />
                                </article>
                            </Col>
                            <Col className="col-8 list-allproperty-col">
                                <Row className="sortproperty">
                                    <Col className="col-6">
                                        <h5>Showing results</h5>
                                    </Col>
                                    <Col className="col-6" style={{ textAlign: 'right' }}>
                                        <label>Sort by: </label>
                                        <select className="custom-select12">
                                            <option id="option" value="1">Default</option>
                                            <option className="option" value="2">Low to High</option>
                                            <option className="option" value="3">High to Low</option>
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="allproperty-result">
                                    <Col className="col-5">
                                        <img alt="widget" src={about3}/>
                                    </Col>
                                    <Col className="col-7">
                                        <a href="#">Apartment</a>
                                        <h4><Link to="/detailproperty">Family house For Rent</Link></h4>
                                        <i className="fa fa-map-marker"></i> Gujarat, Surat
                                        <p><b>$1200</b>/mo</p>
                                        <ul style={{ padding: 'initial', display: 'flex', justifyContent: 'space-between' }}>
                                            <li><i className="fa fa-bed icon" /> <labe>Beds : 03</labe></li>
                                            <li><i className="fa fa-shower icon" /> Bath : 02 </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </aside>
            </section>
        </>
    )
}