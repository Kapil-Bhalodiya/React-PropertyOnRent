import React from 'react'

function SideBar() {
  return (
    <React.Fragment>
      <section >
        <ul className="admin-navlink">
          <li>
            <a href="/vendor">
              <span className="link">
                <i className='fa fa-plus admin-icon'></i><label>Add New</label>
              </span>
            </a>
          </li>
          <li>
            <a href="/vendor/listProperty">
              <i className='fa fa-list-alt admin-icon'></i><label>My Listing</label>
            </a>
          </li>
          <li>
            <a href="/vendor/editProfile">
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