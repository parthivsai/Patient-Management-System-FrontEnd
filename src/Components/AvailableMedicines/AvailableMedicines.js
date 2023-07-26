import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

import "./AvailableMedicines.css";

const AvailableMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  var { role } = useSelector((store) => store.userReducer);

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
                {role === "admin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredMedicines &&
                filteredMedicines.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td>{item.expiryDate}</td>
                    <td>
                      {role === "admin" && (
                        <AiOutlineEdit
                          onClick={() => {
                            //   navigate(`/home/updateEmployee?empid=${item.id}`);
                          }}
                          className="UpdateIcon mx-2"
                        />
                      )}
                      {role === "admin" && (
                        <MdOutlineDelete
                          onClick={() => handleDelete(item)}
                          className="DeleteIcon mx-1"
                        />
                      )}
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

export default AvailableMedicines;
