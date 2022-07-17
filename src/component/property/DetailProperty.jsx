import { Button } from "bootstrap";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Container, Row, Col, Form, FormGroup, Input, Text, Popover, PopoverBody, Badge } from "reactstrap";
import ButtonSend from '../common/Button';
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import moment from "moment";
import getEventApi from '../../service/getEventApi';
import { eventWrapper } from "@testing-library/user-event/dist/utils";
//import {Text} from "Text";

export default function ListProperty(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [photoData, setPhotoData] = useState([]);
    const [propertyData, setProprtyData] = useState([]);
    const [latestpropertyData, setLatestPropertyData] = useState([]);
    const SessionId = JSON.parse(localStorage.getItem("profile"));

    const getdata = async (id) => {
        console.log("id " + id)
        let res = await axios.get("http://localhost:8074/property/getall/" + id);
        setProprtyData(res.data);
        getphotodata(res.data);
    }

    const getlatestdata = async () => {
        let res = await axios.get("http://localhost:8074/property/getlatestproperty");
        setLatestPropertyData(res.data);
    }

    const getphotodata = (data) => {
        let photopaths = [];
        console.log("property data :", data[0]);
        {
            data[0]?.photoModel.map(photoObj =>
                photopaths.push({ url: "/images1/" + photoObj.photopath })
            )
        }
        setPhotoData(photopaths);
    }

    const [event, setEvent] = useState([]);

    const getEvent = async () => {
        let res = await axios.get("http://localhost:8078/events/get");
        setEvent(res.data);
    }

    const [eventsId, setEventsId] = useState(0);

    const onEventChange = (e) => {
        console.log("Target Value", e.target.value)
        setEventsId(e.target.value)
    }

    // const bookProperty = () => {
    //     // e.preventDefault();

    // }

    const [eventPackage, setEventPackage] = useState({});
    const onEventRadioChange = (eventPackageId, eventPackageName, rate) => {
        setEventPackage({
            "eventPackageId": eventPackageId,
            "eventPackageName": eventPackageName,
            "rate": rate
        })
    }
    var totalPrice1 = propertyData[0]?.price;
    useEffect(() => {
        getdata(id)
        getEvent()
        getlatestdata()
    }, [id])


    const [values, setValues] = useState({
    });

    const [postData, setPostData] = useState({});
    const handleBookingSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        // console.log(postData);
        // addPropertyBooking();
    }

    const handleChange = (e) => {
        console.log([e.target.name] +" "+ e.target.value,)
        setValues(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value,
            "propertyModel": {
                "propertyId": propertyData[0]?.propertyId
            },
            "registerationModel":{
                "registrationId":SessionId.registrationId
            },
            "price": totalPrice1,
            "eventPackageId": eventPackage.eventPackageId
        }));
    }

    const addPropertyBooking = async () => {
        await axios.post("http://localhost:8076/booking/add", postData).then(
            (response) => {
                console.log(response);
                alert("Add Successfully");
            }, (error) => {
                console.log(error);
                alert("operation fail");
            })
    }
    return (
        <>
            <section className="detailproperty">
                <Container>
                    <Row>
                        {/* {location.state.id} */}
                        <Col className="col-8">
                            <h3>{propertyData[0]?.propertyName}</h3>
                            <ul style={{ float: "left" }}>
                                <li><i className="fa fa-map-marker icon"></i>{propertyData[0]?.address + "," + propertyData[0]?.cityModel.cityName + "," + propertyData[0]?.cityModel.stateModel.stateName + "," + propertyData[0]?.pincode} </li>
                            </ul>
                            <ul style={{ float: "right" }}>
                                <li><i className="fa fa-clock icon"></i>{moment(propertyData[0]?.postedDate).format('YYYY-MM-DD')}</li>
                                <li><i className="fa fa-check-circle icon"></i>Booked : 5 </li>
                            </ul>
                        </Col>
                        <Col className="col-4 listprice">
                            <h2>₹{propertyData[0]?.price}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-8">
                            {/* <aside className="img-zoom-container">
                                <ImageSlider
                                    width={"100%"}
                                    height={"420px"}
                                    images={photoData}
                                    showBullets={true}
                                    showNavs={true}
                                />
                             </aside> */}
                            <aside className="img-zoom-container">
                                <img src={"/images1/" + propertyData[0]?.photoModel[0].photopath} alt="img" style={{ height: "420px", width: '50%' }} />
                                <img src={"/images1/" + propertyData[0]?.photoModel[1].photopath} alt="img" style={{ height: "420px", width: '50%' }} />
                            </aside>
                            <aside className="mt-2">
                                <ul style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
                                    <li><i className="fa fa-angle-left fa-3x" style={{ color: "gray", marginTop: "50px", marginRight: "5px" }}></i></li>
                                    {propertyData[0]?.photoModel.map((photoObj, index) => {
                                        if (index < 5) {
                                            return (<li>
                                                <img src={"/images1/" + photoObj.photopath} alt="img" style={{ height: "150px", width: '150px' }} />
                                            </li>)
                                        }
                                        else {
                                            return (<li><i className="fa fa-angle-right fa-3x" style={{ color: "gray", marginTop: "50px", marginLeft: "5px" }}></i></li>)
                                        }
                                    })}
                                </ul>
                            </aside>
                            <aside className="contentproperty">
                                <article className="overviewproperty">
                                    <h3>Overview</h3>
                                    <span className="listoverview">
                                        <ul>
                                            <li><i className="fa fa-home icon"></i></li>
                                            <li><span>Type :</span><p><b>{propertyData[0]?.propertyTypeModel?.propertytypeName}</b></p></li>
                                        </ul>
                                        <ul>
                                            <li><i className="fa fa-chart-area icon"></i></li>
                                            <li><span>Area :</span><p><b>{propertyData[0]?.area} Sq.ft</b></p></li>
                                        </ul>
                                        <ul>
                                            <li><i className="fa fa-clock icon"></i></li>
                                            <li><span>Since :</span><p><b>{moment(propertyData[0]?.postedDate).format('MMM-YYYY')}</b></p></li>
                                        </ul>
                                        <ul>
                                            <li><i className="fa fa-coins icon"></i></li>
                                            <li><span>Rent :</span><p><b>₹{propertyData[0]?.price}</b></p></li>
                                        </ul>
                                    </span>
                                </article>
                                <article className="aboutoverview">
                                    <h3>Property Description</h3>
                                    <p>
                                        {propertyData[0]?.description}
                                    </p>
                                    <h3>Policy</h3>
                                    <p style={{ margin: "0px", padding: "0px" }}>
                                        {propertyData[0]?.policy.split('\r\n').map(str => <p>{str}</p>)}
                                    </p>
                                </article>
                                <article className="propertyamenities">
                                    <h3>Features & Amenities</h3>
                                    <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {propertyData[0]?.propertyAmenitiesModels.map(subAmenitiesObj =>
                                            <li><i class="fa fa-check-circle"></i>
                                                <label>{subAmenitiesObj.subAmenities.subamenitiesName}</label></li>
                                        )}
                                    </ul>
                                </article>
                                <article className="propertyevents" style={{ margin: "0px 3px" }}>
                                    <h3>Events & Event Packages</h3>
                                    <article >
                                        <Row>
                                            <select className='custom-select' name="propertytype_id" onChange={onEventChange} placeholder="Events" style={{ borderRadius: "6px" }}>
                                                <option value="">Events</option>
                                                {event.map(obj => (
                                                    <option value={obj.eventsId}>{obj.eventsName}</option>
                                                ))}
                                            </select>
                                        </Row>
                                    </article>
                                    <hr />
                                    {/* <article className="propertyevents" style={{margin:"0px 3px"}}>
                                    {
                                        
                                    propertyData[0]?.eventPackagesModels.map(eventPackagesObj => (
                                        eventPackagesObj.eventsModel.eventsId==eventsId &&
                                        AccordionData.push({eventid: eventPackagesObj.eventsModel.eventsId},
                                                            {packageName: eventPackagesObj.packageName},
                                                            {rate:eventPackagesObj.rate},
                                                            {packageDescription: eventPackagesObj.packageDescription})
                                        ))}
                                        {console.log("Data :::",AccordionData)}
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-4">
                                            {/* <h3>React Accordion</h3>}
                                            <AccordionList accordionData={AccordionData} handleToggle={handleToggle} toggle={toggle} />
                                            </div>
                                        </div>
                                    </div>
                                    </article> */}
                                    <article class="accordion" id="accordionExample">
                                        {propertyData[0]?.eventPackagesModels.map(eventPackagesObj => (
                                            eventPackagesObj.eventsModel.eventsId == eventsId &&
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id={"heading" + eventPackagesObj.eventsModel.eventsId}>

                                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + eventPackagesObj.eventsModel.eventsId} aria-expanded="true" aria-controls={"collapse" + eventPackagesObj.eventsModel.eventsId}>
                                                        <strong><Input type="radio" name="eventpackageradio" value={eventPackagesObj.packageName} className="form-check-input" onChange={() => onEventRadioChange(eventPackagesObj.eventPackageId, eventPackagesObj.packageName, eventPackagesObj.rate)} style={{ padding: "0.8rem" }} />{"  " + eventPackagesObj.packageName}<Badge id="event-badge">{eventPackagesObj.rate} ₹</Badge></strong>
                                                    </button>
                                                </h2>
                                                <div id={"collapse" + eventPackagesObj.eventsModel.eventsId} class="accordion-collapse collapse show" aria-labelledby={"heading" + eventPackagesObj.eventsModel.eventsId} data-bs-parent="#accordionExample">
                                                    <div class="accordion-body">
                                                        <text-muted>{eventPackagesObj.packageDescription}</text-muted>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </article>
                                    {/* <article className="propertyamenities">
                                        {/* <h3>Selected Event Packages</h3>}
                                        <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                <li><i class="fa fa-check-circle"></i>
                                                <label>{eventPackage.eventPackageName}</label></li>
                                        </ul>
                                    </article> */}
                                </article>
                            </aside>
                        </Col>
                        <Col className="col-4">
                            <Row className="col-12">
                                <article className="advance-search">
                                    <h4>Book Property For Rent</h4>
                                    <Form>
                                        <FormGroup>
                                            <label>Check In</label>
                                            <Input type="date" name="checkIn" className="form-control" placeholder="Check In" onClick={handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Check Out</label>
                                            <Input type="date" name="checkOut" className="form-control" placeholder="Check Out" onClick={handleChange} />
                                        </FormGroup>
                                        <label>Property Rent & Event Packages Rate</label>
                                        <hr />
                                        <article className="_adv_features">
                                            <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                <li>Property Rent<span>{"  " + propertyData[0]?.price + "₹"}</span></li>
                                                {/* {totalPrice1 = propertyData[0]?.price} */}
                                                {
                                                    eventPackage.rate != null &&
                                                    <>
                                                        <li>Event Package Rate<span>{"  " + eventPackage.rate + "₹"}</span></li>
                                                        {totalPrice1 = propertyData[0]?.price + eventPackage.rate}
                                                    </>
                                                }
                                                {console.log(totalPrice1)}
                                            </ul>
                                        </article>
                                        <hr />
                                        <label>Total Payment : ₹<span className="price theme-cl" style={{ float: "right" }}>{totalPrice1}</span></label>
                                        <button title='Book It Now' width="100%" height="50px" onClick={handleBookingSubmit} type="submit">Send</button>
                                    </Form>
                                </article>
                            </Row>
                            <Row className="col-12">
                                <article className="advance-search">
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
                                </article>
                            </Row>
                            <Row className="col-12">
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
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section >
        </>
    )
}
