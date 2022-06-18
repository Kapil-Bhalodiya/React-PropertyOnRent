import React from 'react';
// import "../../css/style.css"
import { Container, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom';
// import * as BiIcons from "react-icons/bi";
// import * as CgIcons from "react-icons/cg";

function NavigationBar() {
    return (
        <section className="main-header">
            <Container>
                <Row>
                    <Col>
                        <ul>
                            <li  className="profile-list">
                                <a className="profile-button">
                                    {/* <CgIcons.CgProfile size={50} style={{ color: "white", marginRight: "10px" }} /> */}
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default NavigationBar