import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import UpdateMedicine from "./UpdateMedicine";
import axios from "axios";
import { toast } from "react-hot-toast";
import { createPortal } from "react-dom";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [medicineId, setMedicineId] = useState();
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [showUpdateMedicine, setShowUpdateMedicine] = useState(false);

  var { role } = useSelector((store) => store.userReducer);

  useEffect(() => {
    fetch("http://localhost:2121/medicine/getAll")
      .then((response) => response.json())
      .then((data) => {
        setMedicines(data);
        setFilteredMedicines(data);
      });
  }, []);

  useEffect(() => {
    // console.log(docId);
    // console.log(username, password);
    fetch("http://localhost:2121/medicine/getAll")
      .then((response) => response.json())
      .then((data) => {
        setMedicines(data);
        setFilteredMedicines(data);
      });
  }, [showUpdateMedicine]);

  const handleDelete = async (item) => {
    try {
      var lst = medicines.filter((ele) => ele.id != item.id);
      setMedicines(lst);
      setFilteredMedicines(lst);
      await axios.delete(`http://localhost:2121/medicine/delete/${item.id}`);
      toast.success("Succesfully Deleted the Medicine", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to Delete Medicine", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

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
          <h1 className="text-center">Medicines</h1>

          <label className="searchLabel">Search</label>
          <input
            className="form-control searchFilter"
            type="text"
            placeholder="Search.."
            onChange={handleFilterChange}
          />
        </div>
        <div className="portaldiv">
          {showUpdateMedicine &&
            createPortal(
              <UpdateMedicine
                medicineId={medicineId}
                //   handleSave={handleSave}
                //   focusLength={focusLength}
                //   shortLength={shortLength}
                //   longLength={longLength}
                //   autoBreak={autoBreak}
                //   autoPomo={autoPomo}
                onClose={() => setShowUpdateMedicine(false)}
              />,
              document.getElementById("root")
            )}
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
                <th>Actions</th>
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
                    <td>
                      <AiOutlineEdit
                        onClick={() => {
                          setMedicineId(item.id);
                          setShowUpdateMedicine(true);
                        }}
                        className="UpdateIcon mx-2"
                      />
                      <MdOutlineDelete
                        onClick={() => handleDelete(item)}
                        className="DeleteIcon mx-1"
                      />
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

export default Medicines;
