import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Axios } from "axios";
import { toast } from "react-hot-toast";

const UpdateMedicine = (props) => {
  const data = ["Apple", "Apples", "Band", "Bands"];
  const [medicine, setMedicine] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetch(`http://localhost:2121/medicine/get/${props.medicineId}`)
      .then((response) => response.json())
      .then((data) => setMedicine(data));
  }, []);
  useEffect(() => {
    setPrice(medicine.price);
    setName(medicine.name);
    setStock(medicine.stock);
  }, [medicine]);

  const handleSave = async () => {
    medicine.name = name;
    medicine.price = price;
    medicine.stock = stock;

    let newMedicine = {
      id: props.medicineId,
      name: name,
      price: price,
      stock: stock,
      expiryDate: medicine.expiryDate,
    };

    try {
      await axios.put(
        `http://localhost:2121/medicine/update/${props.medicineId}`,
        newMedicine
      );
      toast.success("Succesfully updated the Medicine Details!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to update Medicine Details", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    props.onClose();
  };

  return (
    <>
      <div className="overLay" />
      <div className="card cardedit">
        <div className="card-head">
          <h4 className="text-center">Update Medicine</h4>
          <button
            className="btn btn-danger closeButton"
            onClick={props.onClose}
          >
            x
          </button>
        </div>
        <div className="card-body">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name=""
              placeholder=""
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                medicine.name = name;
              }}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="text"
              name=""
              placeholder=""
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
                medicine.price = price;
              }}
            />
          </div>
          <div>
            <label>Stock:</label>
            <input
              type="text"
              name=""
              placeholder=""
              value={stock}
              onChange={(event) => {
                setStock(event.target.value);
                medicine.stock = stock;
              }}
            />
          </div>
          <hr />
          <div className="BottomSection">
            <button className="btn btn-dark saveButton" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateMedicine;
