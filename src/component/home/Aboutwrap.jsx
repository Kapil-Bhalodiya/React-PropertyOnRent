import React from 'react'
import shape7 from '../../images/shape7.svg';
import shape8 from '../../images/shape8.svg';
import shape9 from '../../images/shape9.svg';
import about1 from '../../images/about3.jpg';
import about2 from '../../images/about5.jpg';
import about3 from '../../images/about14.jpg';
import { Col, Container, Row } from 'reactstrap';

export default function aboutwrap() {
    return (
        <>
            <section class="about-wrap-3">
                <Container>
                    <Row>
                        <Col className='about-box5'>
                            <Row className="item-heading-left">
                                <span class="section-subtitle">Let’s Take a Tour</span>
                                <h2 class="section-title">Helping People to Find The  Right Property</h2>
                            </Row>
                            <p>Over 39,000 people work for us in more than 70 countries all over the
                                This breadth of global coverage, combined with specialist follower
                                Over 39,000 people work for us in more.
                            </p>
                            <Row className="about-shape col-12">
                                <Col className="choose-shape1 col-3">
                                    <a href="single-listing1.html"><img src={shape7} alt="shape" width="38" height="48" /></a>
                                </Col>
                                <Col className="item-content col-8">
                                    <h3 className="item-title">The Perfect Residency</h3>
                                    <p>Lorem ipsum dolorsit amet consectetur
                                        eiusmod tempor incididunt.
                                    </p>
                                </Col>
                            </Row>
                            <Row className="about-shape col-12">
                                <Col className="choose-shape1 col-3">
                                    <a href="single-listing1.html"><img src={shape8} alt="shape" width="38" height="48" /></a>
                                </Col>
                                <Col className="item-content col-8">
                                    <h3 className="item-title">Trusted By Thousands</h3>
                                    <p>Lorem ipsum dolorsit amet consectetur
                                        eiusmod tempor incididunt.
                                    </p>
                                </Col>
                            </Row>
                            <Row className="about-shape col-12">
                                <Col className="choose-shape1 col-3">
                                    <a href="single-listing1.html"><img src={shape9} alt="shape" width="38" height="48" /></a>
                                </Col>
                                <Col className="item-content col-8">
                                    <h3 className="item-title">Total Payment Transparency</h3>
                                    <p>Lorem ipsum dolorsit amet consectetur
                                        eiusmod tempor incididunt.
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <div class="offset-lg-1 col-lg-6">
                            <div class="about-box8">
                                <div class="about-img-style-1">
                                    <img src={about1} alt="blog" width="364" height="577" />
                                    {/* <div class="shape-img1 fa-spin">
                                        <img src="img/figure/shape6.svg" alt="shape" width="156" height="156" />
                                    </div> */}
                                </div>
                                <div class="about-img-style-2">
                                    <img src={about2} alt="blog" width="344" height="391" className='img-fluid'/>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="about-img-style-6">
                                                <img src={about3} alt="blog" width="345" height="231" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    )
}
