import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const PatientsConsulted = () => {
  const [treatedPatients, setTreatedPatients] = useState([]);
  const [filteredTreatedPatients, setFilteredTreatedPatients] = useState([]);

  var { userDetails, role } = useSelector((store) => store.userReducer);
  var docId = userDetails.id;
  var username = userDetails.user.username;
  var password = userDetails.user.password;

  const basicAuthHeader = "Basic " + btoa(username + ":" + password);

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
                <th>Date</th>
                {role === "admin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTreatedPatients &&
                filteredTreatedPatients.map((item) => (
                  <tr key={item.id}>
                    <td>{item.patient.name}</td>
                    <td>{item.disease}</td>
                    <td>{item.medicine.name}</td>
                    <td>{item.date}</td>
                    <td>
                      {/* {role === "admin" && (
                        <AiOutlineEdit
                          onClick={() => {
                            //   navigate(`/home/updateEmployee?empid=${item.id}`);
                          }}
                          className="UpdateIcon mx-2"
                        />
                      )}
                      {role === "admin" && (
                        <MdOutlineDelete
                          // onClick={() => handleDelete(item)}
                          className="DeleteIcon mx-1"
                        />
                      )} */}
                    </td>
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
