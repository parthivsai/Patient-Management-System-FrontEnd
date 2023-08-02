import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/LoginPage/Login";
import { Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path={"/login"} element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path={"/home/*"} element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
