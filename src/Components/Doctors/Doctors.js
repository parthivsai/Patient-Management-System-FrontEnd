import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import UpdateDoctor from "./UpdateDoctor";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

const Doctors = () => {
  const [doctor, setDoctor] = useState([]);
  const [doctorId, setDoctorId] = useState();
  const [showUpdateDoctor, setShowUpdateDoctor] = useState(false);

  var { token, role } = useSelector((store) => store.userReducer);

  const navigate = useNavigate();
  useEffect(() => {
    if (role.length < 1) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:2121/doctor/getAll")
      .then((response) => response.json())
      .then((data) => {
        setDoctor(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:2121/doctor/getAll")
      .then((response) => response.json())
      .then((data) => {
        setDoctor(data);
      });
  }, [showUpdateDoctor]);

  const handleDelete = async (item) => {
    try {
      var lst = doctor.filter((ele) => ele.id != item.id);
      setDoctor(lst);
      await axios.delete(`http://localhost:2121/doctor/delete/${item.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Succesfully Deleted the Doctor", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to Delete Doctor", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <>
      <div>
        <div>
          <h1 className="text-center">Doctors</h1>
          <div className="portaldiv">
            {showUpdateDoctor &&
              createPortal(
                <UpdateDoctor
                  doctorId={doctorId}
                  onClose={() => setShowUpdateDoctor(false)}
                />,
                document.getElementById("root")
              )}
          </div>
        </div>
        <div className="tableFixHead">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctor.length === 0 && <h5>No Records Found</h5>}
              {doctor &&
                doctor.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.specialization}</td>
                    <td>
                      <AiOutlineEdit
                        onClick={() => {
                          setDoctorId(item.id);
                          setShowUpdateDoctor(true);
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

export default Doctors;
