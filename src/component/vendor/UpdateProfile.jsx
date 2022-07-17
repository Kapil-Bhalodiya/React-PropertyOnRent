import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function UpdateProfile() {

    const profileName =  JSON.parse(localStorage.getItem("profile"));
    const [updatedValue, setUpdatedValue] = useState({});

    const handleChange = (event) => {
        console.log(event.target);
        const { name, value } = event.target;
        setUpdatedValue({ ...updatedValue, [name]: value });
    }

    const updateUser = (e) => {
        e.preventDefault();
        let res = axios.put("http://localhost:8008/login/updateUser/" + profileName.registrationId);
    }

    // useEffect = ({
    //     setUpdatedValue({
        
    //     })
    // },{});

    return (
        <React.Fragment>
            <div class="container">
                <div class="row gutters">
                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div class="card h-100" style={{ margin: 'auto', textAlign: 'center' }}><div class="card-body">
                            <div class="account-settings"><div class="user-profile">
                                <div class="user-avatar">
                                    <div className='profile-pic' style={{ width: 150, height: 150, lineHeight: 1.8, margin: 'auto', fontSize: '4.5rem' }}><p>{profileName.firstName[0] + profileName.lastName[0]}</p></div>
                                </div><br />
                                <h5 class="user-name">{profileName.firstName + ' ' + profileName.lastName}</h5>
                                <h6 class="user-email">{profileName.emailId}</h6>
                            </div>
                                <div class="about"><h5>About</h5><p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div class="card h-100">
                            <div class="card-body">
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"><h6 class="mb-2 text-primary">Personal Details</h6></div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group"> <label for="fullName">Full Name</label>
                                            <input type="text" value={profileName.firstName} class="form-control" placeholder="Firstname" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group"> <label for="fullName">Last Name</label>
                                            <input type="text" value={profileName.lastName} class="form-control" placeholder="Lastname" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group"> <label for="eMail">Email</label>
                                            <input type="email" class="form-control" value={profileName.emailId} placeholder="emailID" onChange={handleChange} disabled />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group"> <label for="phone">Phone</label>
                                            <input type="text" class="form-control" value={profileName.contactNumber} placeholder="Contactnumber" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 class="mt-3 mb-2 text-primary">Address</h6>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group"> <label for="State">State</label>
                                            <input type="name" class="form-control" value={profileName.stateName} placeholder="Enter State" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group"> <label for="ciTy">City</label>
                                            <input type="name" class="form-control" value={profileName.cityName} placeholder="Enter City" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group"> <label for="zIp">Zip Code</label>
                                            <input type="text" class="form-control" value={profileName.pincode} placeholder="Zip Code" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div><br />
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <button type="button" id="submit" name="submit" className="btn" onClick={updateUser}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}