import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Visits = () => {
  const [visits, setVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);

  var { role } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (role.length < 1) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:2121/visits/getAll")
      .then((response) => response.json())
      .then((data) => {
        setVisits(data);
        setFilteredVisits(data);
      });
  }, []);

  const handleFilterChange = (event) => {
    if (event.target.value.length === 0) {
      setFilteredVisits([...visits]);
    } else if (event.target.value.length > 0) {
      var updatedList = [...visits];
      console.log(updatedList, event.target.value);

      updatedList = visits.filter((item) => {
        return (
          item.patient.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item.doctor.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        );
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
                <th>Patient Name</th>
                <th>Consulted</th>
                <th>Disease</th>
                <th>Medicine Given</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisits.length === 0 && <h5>No Records Found</h5>}
              {filteredVisits &&
                filteredVisits.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.patient.name}</td>
                    <td>{item.doctor.name}</td>
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

export default Visits;
