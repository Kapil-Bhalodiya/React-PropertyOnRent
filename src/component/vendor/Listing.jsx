import React from 'react'
import { Form, FormGroup, Input, Row, Col } from 'reactstrap';
import Header from '../Header'
import SideBar from "./common/SideBar";

export default function listing() {
    return (
        <>
            <Row className="col-12" style={{ backgroundColor: '#F5F7FB' }}>
                <Col className="col-3 admin-sidebar">
                    <SideBar />
                </Col>
                <Col >
                    <p>Listing Page</p>
                </Col>
            </Row>
        </>
    )
}
