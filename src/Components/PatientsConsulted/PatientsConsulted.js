import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PatientsConsulted = () => {
  const [treatedPatients, setTreatedPatients] = useState([]);
  const [filteredTreatedPatients, setFilteredTreatedPatients] = useState([]);

  var { userDetails, role } = useSelector((store) => store.userReducer);

  if (role) {
    var docId = userDetails.id;
    var username = userDetails.user.username;
    var password = userDetails.user.password;
  }

  const basicAuthHeader = "Basic " + btoa(username + ":" + password);

  var { role } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (role.length < 1) {
      navigate("/login");
      return;
    }
  }, []);

  useEffect(() => {
    console.log(docId);
    console.log(username, password);
    fetch(`http://localhost:2121/visits/getByDoc/${docId}`)
      .then((response) => response.json())
      .then((data) => {
        setTreatedPatients(data);
        setFilteredTreatedPatients(data);
      });
  }, []);

  const handleFilterChange = (event) => {
    if (event.target.value.length === 0) {
      setFilteredTreatedPatients([...treatedPatients]);
    } else if (event.target.value.length > 0) {
      var updatedList = [...treatedPatients];
      console.log(updatedList, event.target.value);

      updatedList = treatedPatients.filter((item) => {
        return item.patient.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setFilteredTreatedPatients(updatedList);
    }
  };

  return (
    <>
      <div>
        <div>
          <h1 className="text-center">Patients Treated</h1>
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
                <th>Name</th>
                <th>Disease</th>
                <th>Medicine Name</th>
                <th>Dosage Mentioned</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTreatedPatients.length === 0 && (
                <h5>No Records Found</h5>
              )}
              {filteredTreatedPatients &&
                filteredTreatedPatients.map((item) => (
                  <tr key={item.id}>
                    <td>{item.patient.name}</td>
                    <td>{item.disease}</td>
                    <td>{item.medicine.name}</td>
                    <td>{item.prescription}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PatientsConsulted;
