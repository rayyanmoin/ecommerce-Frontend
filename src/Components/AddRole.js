/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddRole = () => {
  const [roleData, setRoleData] = useState({
    name: "",
    description: "",
  });


  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("role Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding role!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
  //const notifyPin = () => toast("The color provided should be having @gmail.com characters!", { type: "warning" });

  const AddRole = async () => {
    console.log(roleData);
    if (hasEmptyValues(roleData)) {
      notifyWarning();
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8080/roles/add", roleData);
        setRoleData({
          name: "",
          description: "",
        });
        notify();
      } catch (error) {
        notifyError();
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoleData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="cardss">
        <h1>Add Role</h1>

        <div className="form-group">
          <label htmlFor="name" class="required">
            Name
          </label>
          <input type="text" id="name" name="name" value={roleData.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description" class="required">
            Description
          </label>
          <input type="text" id="description" name="description" value={roleData.description} onChange={handleInputChange} />
        </div>

        <button className="submitBtn" type="submit" onClick={AddRole}>
          Add Role
        </button>
      </div>
    </div>
  );
};

export default AddRole;
