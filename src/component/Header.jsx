import React from "react";
import logo from '../images/logo_light.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../mycss.css';
import {
    Row,
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    NavLink,
    Nav,
    NavbarBrand,
    Container,
    Col
} from 'reactstrap';
import { NavLink as Link,useNavigate } from "react-router-dom";
import SideBar from "./vendor/common/SideBar";

function Header() {
    let naviage = useNavigate();
    const checkToken = localStorage.getItem("user");
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <section className="main-header">
            <div className="menu-layout">

                <Container>
                    <Row className="menu-row">
                        <Navbar expand="md">
                            <NavbarBrand>
                                <img src={logo} className="img-fluid" />
                                {/* <h2>RentOut</h2> */}
                            </NavbarBrand>
                            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="mr-auto menu-list" navbar>
                                    <NavItem>
                                        <NavLink tag={Link} to="/" activaClassName="active">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/allproperty" activaClassName="active">Property</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/about" activaClassName="active">About</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/contact" activaClassName="active">Contact</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                            <Col className="action-list">
                                <ul>
                                    <li class="listing-button">
                                    {checkToken ?
                                        <SideBar />
                                        :
                                        <Link to="/login" className="listing-btn">
                                            <span className="fa-icon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <span className="item-text">Sign In</span>
                                        </Link>
                                    }
                                    </li>
                                </ul>
                            </Col>
                        </Navbar>
                    </Row>
                </Container>
            </div>
        </section>
    );
}
export default Header;
