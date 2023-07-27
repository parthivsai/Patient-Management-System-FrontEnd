// import React from "react";
// import { useState } from "react";
// import "./AddPatient.css";

// const AddPatient = (props) => {
//   const data = ["Apple", "Apples", "Band", "Bands"];

//   const [val, setVal] = useState("");

//   const lst = data.filter((item) => item.includes(val));
//   const handleSave = () => {};
//   return (
//     <>
//       <div className="overLay" />
//       <div className="card">
//         <div className="card-head">
//           <h4>Add Patient</h4>
//           <button
//             className="btn btn-danger closeButton"
//             onClick={props.onClose}
//           >
//             x
//           </button>
//         </div>
//         <div className="card-body">
//           <div>
//             <label>Name:</label>
//             <input type="text" name="" placeholder="" value="" />
//           </div>
//           <div>
//             <label>Age:</label>
//             <input type="text" name="" placeholder="" value="" />
//           </div>
//           <div>
//             <label>Address:</label>
//             <input type="text" name="" placeholder="" value="" />
//           </div>
//           <div>
//             <label>Email:</label>
//             <input type="text" name="" placeholder="" value="" />
//           </div>
//           <div>
//             <label>Password: </label>
//             <input type="password" name="" placeholder="" value="" />
//           </div>
//           <div>
//             <select onClick={(event) => setVal(event.target.value)}>
//               {/* <option value="Apple">Apple</option>
//         <option value="Band">Band</option> */}
//               {data.map((item) => (
//                 <option value={item}>{item}</option>
//               ))}
//             </select>

//             <ul>
//               {lst.map((item) => (
//                 <li>{item}</li>
//               ))}
//             </ul>
//           </div>
//           <hr />
//           <div className="BottomSection">
//             <button className="btn btn-dark saveButton" onClick={handleSave}>
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddPatient;
