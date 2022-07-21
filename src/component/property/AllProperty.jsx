import React, { useEffect, useState } from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, FormGroup, Form, Input, Label, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import getPropertyApi from '../../service/getPropertyApi';

export default function AllProperty() {
    const navigate = useNavigate()
    const [propertyData, setPropertyData] = useState([]);
    const [latestpropertyData, setLatestPropertyData] = useState([]);


    const getdata = async () => {
        let res = await axios.get("http://localhost:8074/property/getall");
        setPropertyData(res.data);
    }

    const selectionChange = (e) => {
        axios.get("http://localhost:8074/property/getpropertypricewise/" + e.target.value)
            .then(res => {
                setPropertyData(res.data);
            }).catch(err => console.error(err));
    }

    const getlatestdata = async () => {
        let res = await axios.get("http://localhost:8074/property/getlatestproperty");
        setLatestPropertyData(res.data);
    }

    const [propertyType, setPropertyType] = useState([]);
    const getPropertyType = async () => {
        let res = await getPropertyApi.getPropertyTypeList();
        setPropertyType(res.data);
    }

    const [states, setStates] = useState([]);
    const getStates = async () => {
        let res = await getPropertyApi.getStateList();
        console.log("All data :=", res)
        setStates(res.data);
    }

    const [city, setCity] = useState([]);
    const getCity = async (e) => {
        let res = await getPropertyApi.getCityList(e.target.value);
        setCity(res.data);
    }

    const getProperty = async (type, propertycity) => {
        // e.preventDefault();
        let res = await getPropertyApi.getPropertyList(type, propertycity);
        console.log(res)
        setPropertyData(res.data);
        return false
    }

    const [type, setType] = useState({});
    const onPropertyTypeChange = (e) => {
        setType(e.target.value)
    }

    const [propertycity, setPropertyCity] = useState({});
    const onCityChange = (e) => {
        setPropertyCity(e.target.value)
    }

    useEffect(() => {
        getdata()
        getlatestdata()
        getPropertyType()
        getStates()
    }, []);

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
                                    <h4>What are you looking for ?</h4>
                                    <Form>
                                        <FormGroup>           
                                        <select className='custom-select' name="propertytype_id" onChange={onPropertyTypeChange} placeholder="Property Type">
                                        <option value="1">Property Type</option>
                                            {propertyType.map(obj => (
                                                <option value={obj.propertytype_id}>{obj.propertytype_name}</option>
                                            ))}
                                        </select>
                                        </FormGroup>
                                        <FormGroup>           
                                        <select className='custom-select' name="state_id" onChange={getCity} placeholder="All States">
                                        <option value="1">All States</option>
                                            {states.map(obj => (
                                                <option value={obj.state_id}>{obj.state_name}</option>
                                            ))}
                                        </select>
                                        </FormGroup>
                                        <FormGroup>
                                        <select className='custom-select' name="city_id" onChange={onCityChange} placeholder="All City">
                                        <option value="1">All City</option>
                                            {city.map(obj => (
                                                <option value={obj.city_id}>{obj.city_name}</option>
                                            ))}
                                        </select>
                                        </FormGroup>
                                        <Button style={{width:"auto"}} onClick={()=>getProperty(type,propertycity)}>Search Event Destination</Button>
                                    </Form>
                                </article>
                                <article className="advance-search">
                                    <h4 className="animate-character">Latest Property</h4>
                                    {latestpropertyData.map((item, i) => (
                                        <>
                                            <Row>
                                                <Col className="col-5">
                                                    <a href="#"><img alt="widget" src={"/images1/" + item.photoModel[0].photopath} onClick={() => navigate("/detailproperty/" + item.propertyId)} className="relatedproperty" /></a>
                                                </Col>
                                                <Col className="item-content">
                                                    <h5><b><Link to={"/detailproperty/" + item.propertyId}>{item.propertyName}</Link></b></h5>
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
                                        <label style={{ marginRight: "5px" }}>Sort by Price: </label>
                                        <select className="custom-select12" onChange={selectionChange}>
                                            <option id="option" value="1">Default</option>
                                            <option className="option" value="2">Low to High Price</option>
                                            <option className="option" value="3">High to Low Price</option>
                                        </select>
                                    </Col>
                                </Row>
                                {propertyData.map((item, i) => (
                                    <Row className="allproperty-result">
                                        <Row>
                                            <Col style={{ textAlign: "end",position:'absolute' }}>
                                                <section className='tag-propertytype'>
                                                    <a href='#' style={{ textDecoration: "none", color: "#00C194" }}>{item.propertyTypeModel.propertytypeName}</a>
                                                </section>
                                            </Col>
                                        </Row>
                                        <Col className="col-5" style={{ padding: 0 }}>
                                            <img className="col-5 child" alt="widget" src={"/images1/" + item.photoModel[0].photopath} onClick={() => navigate("/detailproperty/" + item.propertyId)} />
                                        </Col>
                                        <Col className="col-7" style={{paddingLeft:'3rem'}}>
                                            <h4><b><Link to={"/detailproperty/" + item.propertyId}>{item.propertyName}</Link></b></h4>
                                            <i className="fa fa-map-marker icon" /> {item.address}<br />
                                            <i className="fa fa-map-marker icon" /> {item.cityModel.cityName}, {item.cityModel.stateModel.stateName}, {item.pincode}


                                            <ul style={{ padding: 'initial', display: 'flex', justifyContent: 'space-between' }}>
                                                <li><i className="fa fa-coins icon" /> <label><b>₹{item.price}</b>/day</label></li>
                                                <li style={{ marginRight: "2rem" }}><i className="fa fa-chart-area icon" /><label><b>{item.area}</b></label> Sq.ft</li>
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