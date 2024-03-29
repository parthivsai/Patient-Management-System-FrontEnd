import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MedicinesPrescribed = () => {
  const [patientMeds, setPatientMeds] = useState([]);
  const [filteredMeds, setFilteredMeds] = useState([]);

  var { userDetails, role } = useSelector((store) => store.userReducer);
  if (role) {
    var patId = userDetails.id;
    var username = userDetails.user.username;
    var password = userDetails.user.password;
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (role.length < 1) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    console.log(patId);
    console.log(username, password);
    fetch(`http://localhost:2121/visits/getByPat/${patId}`)
      .then((response) => response.json())
      .then((data) => {
        setPatientMeds(data);
        setFilteredMeds(data);
      });
  }, []);

  const handleFilterChange = (event) => {
    if (event.target.value.length === 0) {
      setFilteredMeds([...patientMeds]);
    } else if (event.target.value.length > 0) {
      var updatedList = [...patientMeds];
      console.log(updatedList, event.target.value);

      updatedList = patientMeds.filter((item) => {
        return item.medicine.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setFilteredMeds(updatedList);
    }
  };

  return (
    <>
      <div>
        <div>
          <h1 className="text-center">Medicines Prescribed</h1>
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
                <th>Medicine Name</th>
                <th>Medicine Price (Rupees)</th>
                <th>ExpiryDate</th>
                <th>Dosage</th>
                <th>Given By</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeds.length === 0 && <h5>No Records Found</h5>}
              {filteredMeds &&
                filteredMeds.map((item) => (
                  <tr key={item.id}>
                    <td>{item.medicine.name}</td>
                    <td>{item.medicine.price}</td>
                    <td>{item.medicine.expiryDate}</td>
                    <td>{item.prescription}</td>
                    <td>{item.doctor.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MedicinesPrescribed;
