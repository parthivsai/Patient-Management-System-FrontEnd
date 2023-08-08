import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PatientVisits = () => {
  const [patientVisits, setPatientVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);

  var { userDetails, role } = useSelector((store) => store.userReducer);
  if (role) {
    var patId = userDetails.id;
    var username = userDetails.user.username;
    var password = userDetails.user.password;
  }

  const basicAuthHeader = "Basic " + btoa(username + ":" + password);

  var { role } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Coming in here and role is : " + role);
    if (role.length < 1) {
      navigate("/login");
      return;
    }
  }, []);

  useEffect(() => {
    console.log(patId);
    console.log(username, password);
    if (role) {
      fetch(`http://localhost:2121/visits/getByPat/${patId}`)
        .then((response) => response.json())
        .then((data) => {
          setPatientVisits(data);
          setFilteredVisits(data);
        });
    }
  }, []);

  const handleFilterChange = (event) => {
    if (event.target.value.length === 0) {
      setFilteredVisits([...patientVisits]);
    } else if (event.target.value.length > 0) {
      var updatedList = [...patientVisits];
      console.log(updatedList, event.target.value);

      updatedList = patientVisits.filter((item) => {
        return item.doctor.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setFilteredVisits(updatedList);
    }
  };

  return (
    <>
      <div>
        <div>
          <h1 className="text-center">Visit History</h1>
          <label className="searchLabel">Search</label>
          <input
            className="form-control searchFilter"
            type="text"
            placeholder="Search.."
            onChange={handleFilterChange}
          />
        </div>
        <div className="tableFixHead">
          <table>
            <thead>
              <tr>
                <th>Visited Date</th>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Disease</th>
                <th>Prescription</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisits.length === 0 && <h5>No Records Found</h5>}
              {filteredVisits &&
                filteredVisits.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.doctor.name}</td>
                    <td>{item.doctor.specialization}</td>
                    <td>{item.disease}</td>
                    <td>{item.medicine.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PatientVisits;
