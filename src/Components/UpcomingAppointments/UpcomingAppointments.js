import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UpcomingAppointments = () => {
  const { userDetails } = useSelector((store) => store.userReducer);
  const [upcomingAppointments, setUpcomingAppointments] = useState();

  useEffect(() => {
    fetch(`http://localhost:2121/status/getByDoc/approved/${userDetails.id}`)
      .then((response) => response.json())
      .then((data) => setUpcomingAppointments(data));
  }, []);

  return (
    <>
      <div>
        <h3 className="text-center">Upcoming Appointments</h3>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>description</th>
                <th>Day</th>
                <th>Requested Slot</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {console.log(upcomingAppointments)}
              {upcomingAppointments &&
                upcomingAppointments.map((item) => (
                  <tr key={item.id}>
                    <td>{item.patient.name}</td>
                    <td>{item.request}</td>
                    <td>{item.day}</td>
                    <td>{item.timeSlot}</td>
                    <td>{item.approvalStatus}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UpcomingAppointments;
