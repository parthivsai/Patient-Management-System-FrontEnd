import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PatientSidebar from "../Sidebar/PatientSidebar";
import DoctorSidebar from "../Sidebar/DoctorSidebar";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import AvailableMedicines from "../AvailableMedicines/AvailableMedicines";
import PatientsConsulted from "../PatientsConsulted/PatientsConsulted";
import PatientVisits from "../PatientVisits/PatientVisits";
import MedicinesPrescribed from "../MedicinesPrescribed/MedicinesPrescribed";
import AdminSidebar from "../Sidebar/AdminSidebar";
import Patients from "../Patients/Patients";
import Doctors from "../Doctors/Doctors";
import Medicines from "../Medicines/Medicines";
import PatientRequest from "../PatientRequest/PatientRequest";
import PatientAppointments from "../PatientAppointments/PatientAppointments";
import ApprovalRequest from "../ApprovalRequest/ApprovalRequest";
import UpcomingAppointments from "../UpcomingAppointments/UpcomingAppointments";
import Visits from "../Visits/Visits";
const Home = () => {
  var { role } = useSelector((store) => store.userReducer);

  const navigate = useNavigate();

  useEffect(() => {
    if (role.length < 1) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {console.log(role)}
      {role === "PATIENT" && <PatientSidebar />}
      {role === "DOCTOR" && <DoctorSidebar />}
      {role === "ADMIN" && <AdminSidebar />}

      <Routes>
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/medicinesAvailable"} element={<AvailableMedicines />} />
        <Route path={"/patientsConsulted"} element={<PatientsConsulted />} />
        <Route path={"/patientVisits"} element={<PatientVisits />} />
        <Route path={"/requestAppointments"} element={<PatientRequest />} />
        <Route
          path={"/patientAppointments"}
          element={<PatientAppointments />}
        />
        <Route path={"/appointmentsApproval"} element={<ApprovalRequest />} />
        <Route
          path={"/medicinesPrescribed"}
          element={<MedicinesPrescribed />}
        />
        <Route
          path={"/upcomingAppointments"}
          element={<UpcomingAppointments />}
        />
        <Route path="/patients" element={<Patients />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/visits" element={<Visits />} />
      </Routes>
    </div>
  );
};

export default Home;
