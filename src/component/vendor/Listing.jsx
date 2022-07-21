import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Container, Card, CardImg, CardBody, CardSubtitle, CardText, CardTitle, } from 'reactstrap';
import Header from '../Header'
import SideBar from "./common/SideBar";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Listing() {
    const navigate = useNavigate();
    const VendorSession = JSON.parse(sessionStorage.getItem('profile'));
    const [VendorProperty, setVendorProperty] = useState([]);

    const gotodetails=(Id)=>{
        const propertyId = Id
        navigate("/detailproperty/"+propertyId)
    }

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
                        <Row className="allproperty-result">
                            {VendorProperty.map((item) => (
                                <Card className='card-main' style={{ width: "30%", margin: "1rem" ,cursor:'pointer'}} onClick={()=>gotodetails(item.propertyId)}>
                                    <CardImg
                                        alt={"/images1/" + item.photoModel[0].photopath}
                                        src={"/images1/" + item.photoModel[0].photopath}
                                        width="50%"
                                        height="50%" />
                                    <section className='card-propertytype'>
                                        <a href='#' style={{ textDecoration: "none", color: "#00C194" }}>{item.propertyTypeModel.propertytypeName}</a>
                                    </section>
                                    <CardBody style={{ padding: 20 }}>
                                        <CardTitle tag="h3">
                                            <p key={item.propertyId}>{item.propertyName}</p>
                                        </CardTitle>
                                        <CardSubtitle style={{ padding: '10px 10px 10px 0px' }}
                                            className="mb-2 text-muted"
                                            tag="h6">
                                            <i className="fa fa-map-marker"></i> {item.cityModel.cityName}
                                        </CardSubtitle>
                                        <CardText>
                                            <ul style={{ display: 'flex', justifyContent: 'space-between', padding: '0' }}>
                                                <li><i className="fa fa-bed"></i> Area: {item.area} sq.ft</li>
                                                <li style={{ float: 'right' }}><i className="fa fa-bath"></i> Rent: {item.price} Rs</li>
                                            </ul>
                                            <i className="fa fa-address-card"></i>  {item.address}<br />
                                            <br />
                                        </CardText>
                                    </CardBody>
                                </Card>
                                // <>
                                //     <Col className="col-2" style={{ padding: 0 }}>
                                //         <img alt="widget" src="/images1/b.jpg" />
                                //     </Col>
                                //     <Col className="col-6" style={{ paddingLeft: 50 }}>
                                //         <i style={{ float: 'right' }} className="fa fa-trash delete" />
                                //         <a href="#">Apartment</a>
                                //         <h4><Link to={"/detailproperty/" + item.propertyId}>{item.propertyName}</Link></h4>
                                //         <i className="fa fa-map-marker"></i> Gujarat, Surat
                                //         <p><b>{item.price}</b>/mo</p>
                                //         <ul style={{ padding: 'initial', display: 'flex', justifyContent: 'space-between' }}>
                                //             <li><i className="fa fa-eye icon" /> Booked :  </li>
                                //         </ul>
                                //     </Col>
                                // </>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
