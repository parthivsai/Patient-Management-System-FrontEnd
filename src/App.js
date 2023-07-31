import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/LoginPage/Login";
import { Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import DoctorRegister from "./Components/Register/DoctorRegister";
import PatientRegister from "./Components/Register/PatientRegister";
import Test from "./Components/Test";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path={"/login"} element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path={"/home/*"} element={<Home />} />
      </Routes>
      {/* <Test /> */}
    </>
  );
}

export default App;
