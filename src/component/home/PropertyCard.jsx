import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardSubtitle, CardText, CardTitle, Container} from 'reactstrap';
// import pic from '../images/authentication/auth.svg';
import about3 from '../images/about14.jpg';
import getservice from '../../service/getPropertyApi';
//import img from '../../../public/images1/Diamond Villa_1.jpg';
import axios from 'axios';

export default function PropertyCard() {
    const [Property, setProprty] = useState([]);
    const image="";
    const getdata = async () =>  {
            await axios.get("http://localhost:8074/property/get").then(
            (response) => {
                setProprty(response.data)
                console.log(response);
            },(error) => {
                console.log(error);
            }
        );
    }
    useEffect(() => {
        getdata()
    },[])
    return (
        <>
            <Container>
                <Row>
                    <div className="item-heading-left">
                        <span className="section-subtitle">Our PROPERTIES</span>
                        <h2 className="section-title">Populer Properties</h2>
                    </div>
                </Row>
                <Row>
                        {Property.map((item, i) => (
                              
                            <Card className='card-main' style={{width:"30%",margin:"1rem"}}>
                                <CardImg
                                    alt={"/images1/"+item.photoModel[0].photopath}
                                    src={"/images1/"+item.photoModel[0].photopath}
                                    width="50%" 
                                    height="50%"/>
                                 <section className='card-propertytype'>
                                    <a href='#' style={{textDecoration:"none", color:"#00C194"}}>{item.propertyTypeModel.propertytypeName}</a>
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
                                        <i className="fa fa-address-card"></i>  {item.address}<br/>
                                        <br/>
                                    </CardText>
                                </CardBody>
                            </Card>
                        ))}
                </Row>
            </Container>
        </>
    )
}