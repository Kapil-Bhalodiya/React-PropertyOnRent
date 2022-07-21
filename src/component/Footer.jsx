import React from "react";
import logo from '../images/logo_light.svg';
import { Container, Row, Col } from "reactstrap";
import { NavLink as Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <section className="footer-section">
                <Container>
                    <Row>
                        <Col>
                            <img src={logo} className="img-fluid" />
                            <p>orem ipsum dolor sit amet consecte turad pisicing elit, sed do eiusmod tempor inci didunt ut labore et dolor.pisicing elit, sed do eiusmod tempor inci</p>

                        </Col>
                        <Col className="quicklinks">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><Link to="/about">About Us </Link></li>
                                <li><Link to="/terms">Terms &amp; Conditions</Link></li>
                                <li><Link to="/policy">Privacy Policy </Link></li>
                                <li><Link to="/contact">Contact Us </Link></li>
                            </ul>
                        </Col>
                        <Col>
                            <h3>Instagram</h3>
                        </Col>
                        <Col className="contact">
                            <h3>Contact</h3>
                            <ul>
                                <li><p><i class="fa fa-map-marker"></i> 7th floor, Smartwork Building, Kalyani Nagar, Pune</p></li>
                                <li><p><a href="mailto:info@example.com"><i class="fa fa-envelope"></i> info@example.com</a></p></li>
                                <li><p><a href="tel:+123596000"><i class="fa fa-phone"></i> (+123) 596 000</a></p></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}