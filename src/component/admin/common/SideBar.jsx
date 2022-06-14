import React from 'react'
// import "../../css/style.css"
import { Container, Row, Col } from "reactstrap"
// import * as AiIcons from "react-icons/ai"
import { Link } from 'react-router-dom';
// import * as GiIcons from "react-icons/gi";
// import * as BiIcons from "react-icons/bi";
// import * as FaIcons from "react-icons/fa";
// import * as MdIcons from "react-icons/md";
// import * as CgIcons from "react-icons/cg";

function SideBar() {
  return (
    <React.Fragment>
      <section >
        {/* <h1 className="logo-name">Admin Panel</h1> */}
        <ul className="admin-navlink">
          <li>
            <a href="/role">
              <span className="link">
                <i className='fa fa-plus admin-icon'></i><label>Add New</label>
              </span>
            </a>
          </li>
          <li>
            <a href="/propertytypes">
              <i className='fa fa-list-alt admin-icon'></i><label>My Listing</label>
            </a>
          </li>
          <li>
            <a href="/amenities">
              <i className='fa fa-user admin-icon'></i><label>Edit Profile</label>
            </a>
          </li>

          <li>
            <a href="#">
              <i className='fa fa-calendar admin-icon'></i><label>Booking</label>
            </a>
          </li>
          <li>
            <a href="#">
              <i className='fa fa-book admin-icon'></i><label>Review</label>
            </a>
          </li>
        </ul>
      </section>
    </React.Fragment>
  )
}

export default SideBar