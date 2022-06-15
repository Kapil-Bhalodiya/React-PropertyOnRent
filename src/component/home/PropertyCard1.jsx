import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardSubtitle, CardText, CardTitle, Container } from 'reactstrap';
// import pic from '../images/authentication/auth.svg';
import about3 from '../../images/about14.jpg';
import getservice from '../../service/getPropertyApi';

export default function PropertyCard() {
    const [Property, setProprty] = useState([]);
    const getdata = () => {
        fetch('http://localhost:8080/getproperty')
        .then((res) => res.json())
        .then((res) => {
            setProprty(res)
        })
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
                {Property.map((item,i) => (
                    <Col className='card-head'>
                        <Card className='card-main'>
                            <CardImg
                                alt="Card image cap"
                                src={about3}
                                width="100%" />
                            <CardBody style={{ padding: 20 }}>
                                <CardTitle tag="h3">
                                    {console.log(i)}
                                    <p key={i}>{item.property_name}</p>
                                </CardTitle>
                                <CardSubtitle style={{ padding: '10px 10px 10px 0px' }}
                                    className="mb-2 text-muted"
                                    tag="h6">
                                    <i className="fa fa-map-marker"></i> {item.city_name}
                                </CardSubtitle>
                                <CardText>
                                    <ul style={{ display: 'flex', justifyContent: 'space-between', padding: '0' }}>
                                        <li><i className="fa fa-bed"></i> Beds: 03</li>
                                        <li style={{ float: 'right' }}><i className="fa fa-bath"></i> Baths: 02</li>
                                    </ul>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
                </Row>
            </Container>
        </>
    )
}