import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BiSolidUserRectangle, BiSolidUserCircle } from "react-icons/bi";
import "./Profile.css";

const Profile = () => {
  var {
    loading,
    messageLogin,
    messageSignup,
    error,
    token,
    role,
    userDetails,
  } = useSelector((store) => store.userReducer);

  return (
    <div className="profileContainer">
      <h4 className="text-center">
        Welcome,{" "}
        <i>
          {role == "DOCTOR" && <b>Dr. </b>}
          <b>{userDetails.user.username}</b>
        </i>
      </h4>
      {console.log(userDetails)}
      <div className="profile-card-container">
        <div className="profile-card-title text-center">
          <BiSolidUserCircle size={80} />
          <h3> {userDetails.name}</h3>
          <hr />
        </div>
        {role == "DOCTOR" && (
          <div className="profile-card-content">
            <div className="card-body">
              <p>
                <i>Email : {userDetails.email}</i>
              </p>
              <p>
                <i>Specialization : {userDetails.specialization}</i>
              </p>
            </div>
          </div>
        )}
        {role == "PATIENT" && (
          <div className="profile-card-content">
            <div className="card-body">
              <p>
                <i>Email : {userDetails.email}</i>
              </p>
              <p>
                <i>Age : {userDetails.age}</i>
              </p>
              <p>
                <i>Address : {userDetails.address}</i>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
