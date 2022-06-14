import React from "react";
import { Col, Container, Row } from "reactstrap";
import Role from "../admin/Role";
import SideBar from "../admin/common/SideBar";

export default function User() {
    const u = JSON.parse(localStorage.getItem("user"))

    return (
        <>
            {/* <Row>
                <Col className="col-3 image-panel">
                    
                    <Row>
                       <Col>
                            <div className="profile-img"></div>
                       </Col>
                    </Row>
                    <Row>
                        123
                    </Row>
                    <Row>
                        123
                    </Row>
                </Col>
                <Col className="col-9">
                    Hey
                </Col>
            </Row>
            <div>{ u.roleId }</div> */}
        </>
    )
}
