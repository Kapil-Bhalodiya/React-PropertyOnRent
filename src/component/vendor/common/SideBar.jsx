import React from 'react'
import { NavLink as Link,useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';

const SideBar = () => {
  let nevigate = useNavigate();
  const menuToggle = () => {
    const toggleMenu = document.querySelector('.vendor-navlink');
    toggleMenu.classList.toggle('active');
  }
  const handleLogout = () => {
    console.log("yup");
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    nevigate("/");
  }

  const profileName = JSON.parse(localStorage.getItem("profile"));

  return (
    <React.Fragment>
      <div className="col-12" onClick={menuToggle}>
        <div className='profile-pic'>{profileName.firstName[0]+profileName.lastName[0]}</div>
      </div>
      <section className="vendor-navlink">
        <ul>
          <li>
            <Link to = "/vendor">
              <i className='fa fa-plus admin-icon'></i><label>Add New</label>
            </Link>
          </li>
          <li>
            <Link to="/vendor/listProperty">
              <i className='fa fa-list-alt admin-icon'></i><label>My Listing</label>
            </Link>
          </li>
          <li>
            <Link to="/vendor/updateprofile">
              <i className='fa fa-user admin-icon'></i><label>Edit Profile</label>
            </Link>
          </li>
          <li>
            <a href="#">
              <i className='fa fa-calendar admin-icon'></i><label>Booking</label>
            </a>
          </li>
          <li>
            <Link to="#">
              <i className='fa fa-book admin-icon'></i><label>Review</label>
            </Link>
          </li>
          <li>
            <Button onClick={handleLogout}>Logout
            </Button>
          </li>
        </ul>
      </section>
    </React.Fragment>
  )
}

export default SideBar