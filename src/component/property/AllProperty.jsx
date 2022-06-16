import React, { useEffect, useState } from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, FormGroup, Form, Input } from "reactstrap";
import Button from '../common/Button';
import about3 from '../images/about14.jpg';
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export default function AllProperty() {
    const navigate = useNavigate()
    const [propertyData, setPropertyData] = useState([]);
    const [latestpropertyData, setLatestPropertyData] = useState([]);

    const getdata = async () => {
        let res = await axios.get("http://localhost:8074/property/getall");
        setPropertyData(res.data);
    }

    const selectionChange = (e) => {
        axios.get("http://localhost:8074/property/getpropertypricewise/"+e.target.value)
        .then(res => {
            setPropertyData(res.data);
        }).catch(err => console.error(err));
    }

    const getlatestdata = async () => {
        let res = await axios.get("http://localhost:8074/property/getlatestproperty");
        setLatestPropertyData(res.data);
    }

    useEffect(() => {
        getdata()
        getlatestdata()
    }, [])

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
                                    {latestpropertyData.map((item, i) => (
                                    <>
                                    <Row>
                                        <Col className="col-5">
                                            <a href="#"><img alt="widget" src={"/images1/"+item.photoModel[0].photopath} onClick={()=>navigate("/detailproperty/"+item.propertyId)} className="relatedproperty" /></a>
                                        </Col>
                                        <Col className="item-content">
                                        <h5><b><Link to={"/detailproperty/"+item.propertyId}>{item.propertyName}</Link></b></h5>
                                            <i className="fa fa-map-marker icon"></i>{item.cityModel.cityName}, {item.cityModel.stateModel.stateName}<br />
                                            <i className="fa fa-coins icon" /> <label>₹{item.price}/day</label>
                                        </Col>
                                    </Row>
                                    <hr />
                                    </>
                                    ))}
                                </article>
                            </Col>
                            <Col className="col-8 list-allproperty-col">
                                <Row className="sortproperty">
                                    <Col className="col-6">
                                        <h5>Showing results</h5>
                                    </Col>
                                    <Col className="col-6" style={{ textAlign: 'right' }}>
                                        <label style={{marginRight:"5px"}}>Sort by Price: </label>
                                        <select className="custom-select12" onChange={selectionChange}>
                                            <option id="option" value="1">Default</option>
                                            <option className="option" value="2">Low to High Price</option>
                                            <option className="option" value="3">High to Low Price</option>
                                        </select>
                                    </Col>
                                </Row>
                                {propertyData.map((item, i) => (
                                    
                                <Row className="allproperty-result">
                                    <Row style={{marginTop:"-12px"}}>
                                        <Col style={{textAlign:"end"}}>
                                            <section className='tag-propertytype'>
                                                <a href='#' style={{textDecoration:"none", color:"#00C194"}}>{item.propertyTypeModel.propertytypeName}</a>
                                            </section>
                                        </Col>
                                    </Row>
                                    <Col className="col-5">
                                        <img className="col-5 child" alt="widget" src={"/images1/"+item.photoModel[0].photopath} onClick={()=>navigate("/detailproperty/"+item.propertyId)}/>
                                    </Col>
                                    <Col className="col-7">
                                        <h4><b><Link to={"/detailproperty/"+item.propertyId}>{item.propertyName}</Link></b></h4>
                                        <i className="fa fa-map-marker icon"/> {item.address}, {item.cityModel.cityName}, {item.cityModel.stateModel.stateName}
                                        <ul style={{ padding: 'initial', display: 'flex', justifyContent: 'space-between' }}>
                                            <li><i className="fa fa-coins icon" /> <label><b>₹{item.price}</b>/day</label></li>
                                            <li style={{marginRight:"2rem"}}><i className="fa fa-chart-area icon" /><label><b>{item.area}</b></label> Sq.ft</li>
                                        </ul>
                                    </Col>
                                </Row>
                                 ))}
                            </Col>
                        </Row>
                    </Container>
                </aside>
            </section>
        </>
    )
}