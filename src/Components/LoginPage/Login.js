import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import pms from "./Images/Login.jpg";
import { userLogin } from "../Store/Reducers/user-slice";
import { onReset } from "../Store/Reducers/user-slice";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  var { loading, messageLogin, messageSignup, error, token, role } =
    useSelector((store) => store.userReducer);

  const dispatch = useDispatch();

  const onLoginClick = (event) => {
    event.preventDefault();
    dispatch(userLogin({ username, password }));
    if (token != null) {
      if (role.length > 1 && role === "ADMIN") {
        navigate("/home/admin");
      } else if (role.length > 1) {
        navigate("/home/profile");
      }
    }
  };

  useEffect(() => {
    if (token && role) {
      if (role.length > 1 && role === "ADMIN") {
        navigate("/home/admin");
      } else if (role.length > 1) {
        navigate("/home/profile");
      }
    }
  }, [token, role]);

  const onSignupClick = () => {
    // navigate to signup page and in that include signup api (add Api);
  };

  const onResetClick = (event) => {
    event.preventDefault();
    setPassword("");
    setUsername("");
    dispatch(onReset());
  };

  return (
    <div className="h-100 container-color">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">Patient Management System</h4>
                    <p className="small mb-0">
                      Patient Management System is an online software
                      application where we can store information and access it
                      anytime to provide accurate care.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card-body p-5 mx-4">
                    <div className="text-center">
                      <img className="imgstyle" src={pms} alt="logo"></img>
                      <h4>Welcome to Patient Management Portal</h4>
                    </div>

                    <form>
                      {/* <p>Login/Register your Account</p> */}
                      <div className="form-group mb-4">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Enter your userName"
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          className="form-control"
                          onChange={(event) => setPassword(event.target.value)}
                          required
                        />
                        {error && (
                          <div className="errorMessage">
                            <p style={{ color: "#FF6347" }}>
                              {messageLogin ? messageLogin : messageSignup}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="text-center">
                        <button
                          className="btn btn-outline-secondary btn-lg mb-2 mx-1"
                          type="button"
                          onClick={onResetClick}
                        >
                          Reset
                        </button>
                        <button
                          className="btn btn-outline-primary btn-lg mb-2 mx-1"
                          type="button"
                          onClick={onLoginClick}
                        >
                          Log in
                        </button>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Create an account?</p>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={onSignupClick}
                        >
                          Sign up
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
