import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
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
    </div>
  );
};

export default Profile;
