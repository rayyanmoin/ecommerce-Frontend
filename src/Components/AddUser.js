/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddUser = () => {
  const [userData, setUserData] = useState({
    username: "",
    roleId: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [roles, setRoles] = useState([]);

  // Fetch roles from the server
  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/roles/dropRole");
      setRoles(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const hasEmptyValues = (obj) => {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  };

  const notify = () => toast("User Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding User!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const addUser = async () => {
    console.log(userData);

    if (hasEmptyValues(userData)) {
      notifyWarning();
      return;
    }

    try {
      await axios.post("http://localhost:8080/users/add", userData);
      // Reset the form fields
      setUserData({
        username: "",
        roleId: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      notify();
    } catch (error) {
      notifyError();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="cardssssss">
        <h1>Add User</h1>

        <div className="form-group">
          <label htmlFor="username" className="required">
            User Name
          </label>
          <input type="text" id="username" name="username" value={userData.username} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="roleId" className="required">
            Roles
          </label>
          <select id="statusOption" name="roleId" value={userData.roleId} onChange={handleInputChange}>
            <option key="" value="">
              Select a role
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="required">
            Email
          </label>
          <input type="text" id="email" name="email" value={userData.email} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="required">
            Password
          </label>
          <input type="text" id="password" name="password" value={userData.password} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="firstName" className="required">
            First Name
          </label>
          <input type="text" id="firstName" name="firstName" value={userData.firstName} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="required">
            Last Name
          </label>
          <input type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="required">
            Phone No.
          </label>
          <input type="text" id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
        </div>

        <button className="submitBtn" type="button" onClick={addUser}>
          Add User
        </button>
      </div>
    </div>
  );
};

export default AddUser;
