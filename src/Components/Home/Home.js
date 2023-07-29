import React from "react";
import { Route, Routes } from "react-router-dom";
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

const Home = () => {
  var { role } = useSelector((store) => store.userReducer);
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

        {/* <Route path={"/godowns"} element={<Godowns />} />
        <Route path={"/addGodown"} element={<AddGodown />} />
        <Route path={"/updateGodown"} element={<UpdateGodown />} />

        <Route path={"/employees"} element={<Employees />} />
        <Route path={"/addEmployee"} element={<AddEmployee />} />
        <Route path={"/updateEmployee"} element={<UpdateEmployee />} />

        <Route path={"/products"} element={<Products />} />
        <Route path={"/addProducts"} element={<AddProducts />} />

        <Route path={"/Inwards"} element={<Inwards />} />
        <Route path={"/addInwards"} element={<AddInwards />} />
        <Route path={"/updateInwards"} element={<UpdateInwards />} />

        <Route path={"/deliveries"} element={<Deliveries />} />
        <Route path={"/updateDelivery"} element={<UpdateDelivery />} />
        <Route path={"/addDelivery"} element={<AddDelivery />} />

        <Route path={"/returns"} element={<Returns />} />
        <Route path={"/addReturns"} element={<AddReturns />} />
        <Route path={"updateReturns"} element={<UpdateReturns />} /> */}
      </Routes>
    </div>
  );
};

export default Home;
