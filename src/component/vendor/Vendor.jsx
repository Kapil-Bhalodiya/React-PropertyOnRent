import React from "react";
import { Col, Container, Row } from "reactstrap";
import SideBar from "../admin/common/SideBar";
import Role from "../admin/Role";

export default function User() {
    const u = JSON.parse(localStorage.getItem("user"))
    return (
        <>
            <Row className="col-12 topbar-vendor">
                <h2>Welcome , Sweta Jaiswal</h2>
            </Row>
            <Row className="col-12" style={{ backgroundColor: '#F5F7FB' }}>
                <Col className="col-3 admin-sidebar">
                    <SideBar />
                </Col>
                <Col className="col-9">
                    <Role />
                </Col>
            </Row>
        </>
    )
}
