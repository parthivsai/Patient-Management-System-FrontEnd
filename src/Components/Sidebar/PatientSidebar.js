import React from "react";
import { FaBars, FaUserMd } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { BsFillPeopleFill, BsChatSquareTextFill } from "react-icons/bs";
import { AiFillSchedule, AiOutlineSchedule } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { IconContext } from "react-icons/lib";
import { SlCalender } from "react-icons/sl";
import { GiMedicines } from "react-icons/gi";
import { BiLogOut, BiSolidUserDetail } from "react-icons/bi";
import "./Sidebar.css";
import { onLogout } from "../Store/Reducers/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const PatientSidebar = () => {
  var { role } = useSelector((store) => store.userReducer);

  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItem = [
    {
      path: "/home/profile",
      title: "Profile",
      name: "PatientDetails",
      icon: <BiSolidUserDetail />,
    },
    {
      path: "/home/patientVisits",
      title: "Visit History",
      name: "VisitHistoey",
      icon: <SlCalender />,
    },
    {
      path: "/home/medicinesPrescribed",
      title: "Medication",
      name: "PrescribedMedicines",
      icon: <GiMedicines />,
    },
    {
      path: "/home/requestAppointments",
      title: "Request",
      name: "RequestAppointments",
      icon: <AiOutlineSchedule />,
    },
    {
      path: "/home/patientAppointments",
      title: "Appointments",
      name: "UpcomingAppointments",
      icon: <AiFillSchedule />,
    },
  ];

  const onLogoutClick = () => {
    console.log("Clicked Logout");
    dispatch(onLogout());
    setTimeout(() => {
      localStorage.removeItem("token");
      role = "";
      navigate("/login");
    }, 500);
  };

  const links = document.querySelectorAll("nav-menu-items");

  links.forEach((link) => {
    console.log("in here");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      links.forEach((link) => {
        link.style.backgroundColor = "#1a83ff";
      });
    });
  });

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaBars onClick={() => setSidebar(true)} />
          </Link>

          <button
            className="btn btn-dark posright mx-2"
            onClick={onLogoutClick}
          >
            Logout {<BiLogOut />}
          </button>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars mt-1 arrow">
                <IoArrowBackCircleOutline
                  className="arrow"
                  size="25"
                  onClick={() => setSidebar(false)}
                />
              </Link>
            </li>
            {menuItem.map((item, index) => {
              return (
                <li key={index} className={item.name}>
                  <Link to={item.path} onClick={() => setSidebar(true)}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      <Outlet />
    </div>
  );
};

export default PatientSidebar;
