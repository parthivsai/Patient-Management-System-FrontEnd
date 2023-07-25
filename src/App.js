import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/LoginPage/Login";
import { Navigate } from "react-router-dom";
import DoctorHome from "./Components/Home/DoctorHome";
import PatientHome from "./Components/Home/PatientHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/home/doctor"} element={<DoctorHome />} />
      <Route path={"/home/patient"} element={<PatientHome />} />
    </Routes>
  );
}

export default App;
