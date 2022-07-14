import React from 'react'

export default function UpdateProfile() {

    const profileName = JSON.parse(localStorage.getItem("profile"));

    return (
        <React.Fragment>
            <div class="container">
                <div class="row gutters">
                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div class="card h-100"><div class="card-body">
                            <div class="account-settings"><div class="user-profile">
                                <div class="user-avatar">
                                    <div className='profile-pic' style={{ width: 150, height: 150, lineHeight: 150 }}>{profileName.firstName[0] + profileName.lastName[0]}</div>
                                </div>
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
                                            <input type="text" value={profileName.firstName} class="form-control" id="fullName" placeholder="Enter full name" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group"> <label for="fullName">Last Name</label>
                                            <input type="text" value={profileName.lastName} class="form-control" id="fullName" placeholder="Enter full name" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group"> <label for="eMail">Email</label>
                                            <input type="email" class="form-control" value={profileName.emailId} id="eMail" placeholder="Enter email ID" disabled />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group"> <label for="phone">Phone</label>
                                            <input type="text" class="form-control" value={profileName.contactNumber} id="phone" placeholder="Enter phone number" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 class="mt-3 mb-2 text-primary">Address</h6>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group"> <label for="State">State</label>
                                            <input type="name" class="form-control" value={profileName.stateName} id="state" placeholder="Enter State" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group"> <label for="ciTy">City</label>
                                            <input type="name" class="form-control" value={profileName.cityName} id="ciTy" placeholder="Enter City" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group"> <label for="zIp">Zip Code</label>
                                            <input type="text" class="form-control" value={profileName.pincode} id="zIp" placeholder="Zip Code" />
                                        </div>
                                    </div>
                                </div><br/>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <button type="button" id="submit" name="submit" className="btn">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}