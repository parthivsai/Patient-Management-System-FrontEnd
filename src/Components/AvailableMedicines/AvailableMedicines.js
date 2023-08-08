import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AvailableMedicines.css";

const AvailableMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  var { role } = useSelector((store) => store.userReducer);

  const navigate = useNavigate();
  useEffect(() => {
    if (role.length < 1) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:2121/medicine/getAll")
      .then((response) => response.json())
      .then((data) => {
        setMedicines(data);
        setFilteredMedicines(data);
      });
  }, []);

  const handleDelete = () => {};

  const handleFilterChange = (event) => {
    console.log(medicines);
    // setFiltervalue(event.target.value);

    if (event.target.value.length === 0) {
      setFilteredMedicines([...medicines]);
    } else if (event.target.value.length > 0) {
      var updatedList = [...medicines];
      console.log(updatedList, event.target.value);

      updatedList = medicines.filter((item) => {
        return item.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setFilteredMedicines(updatedList);
    }
  };

  return (
    <>
      <div>
        <div>
          <h1 className="text-center">Medicines Available</h1>
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
                <th>Medicine ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>ExpiryDate</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.length === 0 && <h5>No Records Found</h5>}
              {filteredMedicines &&
                filteredMedicines.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td>{item.expiryDate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AvailableMedicines;
