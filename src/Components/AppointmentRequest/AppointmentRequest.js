import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import "../Register/modal.css";

const AppointmentRequest = (props) => {
  const [symptoms, setSymptoms] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  // const [day, setDay] = useState("");

  const slots = ["10AM - 11AM", "11AM - 12PM", "2PM - 3PM", "3PM - 4PM"];
  // const days = ["Tomorrow", "DayAfterTomorrow"];

  const [minDate, setMinDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const tomorrow = today.toISOString().split("T")[0];
    setMinDate(tomorrow);
  }, []);

  const handleSave = () => {
    // console.log(day, timeSlot);
    if (selectedDate === "" || timeSlot.length <= 0) {
      toast.error("Invalid Request! Fill in the Details", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      props.onClose();
      return;
    }
    let requestData = {
      request: symptoms,
      timeSlot: timeSlot,
      day: selectedDate,
    };
    try {
      axios.post(
        `http://localhost:2121/status/add/${props.patientId}/${props.doctorId}`,
        requestData
      );
      toast.success("Succesfully sent the Request!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to send the Request", {
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
      {console.log(props.patientId)}
      {console.log(props.doctorId)}
      <div className="overLay" />
      <div className="card cardedit">
        <div className="card-head">
          <h4 className="text-center">Send Request</h4>
          <button
            className="btn btn-danger closeButton"
            onClick={props.onClose}
          >
            x
          </button>
        </div>
        <div className="card-body">
          <div>
            <label>Symptoms:</label>
            <input
              type="text"
              name=""
              placeholder=""
              value={symptoms}
              onChange={(event) => {
                setSymptoms(event.target.value);
              }}
            />
          </div>
          <div>
            <label>Select a date:</label>
            <input
              type="date"
              id="dateInput"
              min={minDate}
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
          </div>
          {/* <div className="select">
            <select
              className="select"
              onClick={(event) => setDay(event.target.value)}
            >
              <option value="">Select a day</option>
              {days.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div> */}
          <div className="select">
            <select
              className="select"
              onClick={(event) => setTimeSlot(event.target.value)}
            >
              <option value="">Select a TimeSlot</option>
              {slots.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
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

export default AppointmentRequest;
