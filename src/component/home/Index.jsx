import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'reactstrap';
import Banner from '../../images/index/slider4.jpg';
import Aboutwrap from './Aboutwrap';
import PropertyCard from './PropertyCard';
import getPropertyApi from '../../service/getPropertyApi';



export default function Index() {
    const [propertycity, setPropertyCity] = useState({});
    const [type, setType] = useState({});

    const onCityChange = (e) => {
        setPropertyCity(e.target.value)
    }

    const onPropertyTypeChange = (e) => {
        setType(e.target.value)
    }

    const [city, setCity] = useState([]);
    const getCity = async (e) => {
        let res = await getPropertyApi.getCityList(e.target.value);
        setCity(res.data);
    }

    const [states, setStates] = useState([]);
    const getStates = async () => {
        let res = await getPropertyApi.getStateList();
        console.log("state : "+res);
        setStates(res.data);
    }

    useEffect(() => {
        getStates()
    }, []);


    return (
        <>
            <section style={{ backgroundImage: `url(${Banner})` }} className="banner">
                <Container>
                    <Row>
                        <div className="main-banner-box1  main-banner-box5">
                            <h1 className="item-title">Let's find the perfect place</h1>
                            <ul className="list-inline">
                                <li>
                                    <label for="apartments">
                                        <i class="fa fa-building"></i>
                                        <span>Farm</span>
                                        <input type="radio" name="rtcl_category" id="apartments" value="apartments" />
                                    </label>
                                </li>
                                <li>
                                    <label for="home">
                                        <i class="fa fa-home"></i>
                                        <span>Home</span>
                                        <input type="radio" name="rtcl_category" id="home" value="home" />
                                    </label>
                                </li>
                                <li>
                                    <label for="office">
                                        <i class="fa fa-briefcase"></i>
                                        <span>Office</span>
                                        <input type="radio" name="rtcl_category" id="office" value="office" />
                                    </label>
                                </li>
                                <li>
                                    <label for="shop">
                                        <i class="fa fa-shopping-basket"></i>
                                        <span>Shop</span>
                                        <input type="radio" name="rtcl_category" id="shop" value="shop" />
                                    </label>
                                </li>
                            </ul>
                            <div class="banner-search-wrap">
                                <div class="rld-main-search">
                                    <Row>
                                        <Col>
                                            <div class="box">
                                                <div class="box-top">
                                                    <div class="rld-single-input item">
                                                        <input type="text" placeholder="Enter Kewword here..." />
                                                    </div>
                                                    <div class="rld-single-select item">
                                                    <select className='custom-select' name="state_id" onChange={getCity} placeholder="All States">
                                                        <option value="1">All States</option>
                                                        {states.map(obj => (
                                                            <option value={obj.state_id}>{obj.state_name}</option>
                                                        ))}
                                                    </select>
                                                    </div>
                                                    <div class="rld-single-select item">
                                                        <select className='custom-select' name="city_id" onChange={onCityChange} placeholder="All City">
                                                            <option value="1">All City</option>
                                                            {city.map(obj => (
                                                                <option value={obj.city_id}>{obj.city_name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div class="item rt-filter-btn">
                                                        <div class="filter-button-area">
                                                            <a class="filter-btn" href="with-sidebar.html"><span>Search</span>
                                                            <i class="fa fa-search"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <p class="item-para">We’ve more than <span
                                class="banner-p">54,000</span> apartments, place & plot.
                            </p>
                        </div>
                    </Row>
                </Container>
            </section>
            <Aboutwrap />
            <PropertyCard />
        </>
    )
}
