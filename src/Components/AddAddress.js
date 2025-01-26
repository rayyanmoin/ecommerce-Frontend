/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddAddress = () => {
  const [addressData, setAddressData] = useState({
    userId: 0,
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    addressType: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [user, setUser] = useState([]);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/dropUsers");
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Utility to find user ID by name
  const replaceUserhWithId = (name) => {
    const foundUser = user.find((u) => u.name === name);
    return foundUser ? foundUser.id : 0;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Check if object has empty values
  const hasEmptyValues = (obj) => Object.values(obj).some((value) => value === "" || value === null || value === undefined);

  // Notifications
  const notify = () => toast("Address Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding Address!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  // Add address handler
  const addAddress = async () => {
    console.log(addressData);
    if (hasEmptyValues(addressData)) {
      notifyWarning();
      return;
    }

    try {
      await axios.post("http://localhost:8080/address/add", addressData);
      setAddressData({
        userId: 0,
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        addressType: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      notify();
    } catch (error) {
      notifyError();
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update userId if the dropdown changes
    if (name === "user") {
      const userId = replaceUserhWithId(value);
      setAddressData({
        ...addressData,
        userId,
      });
    } else {
      setAddressData({
        ...addressData,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="cardssss">
        <h1>Place Address</h1>

        <div className="form-group">
          <label htmlFor="user" className="required">
            User Names
          </label>
          <select id="statusOption" name="user" value={user.find((u) => u.id === addressData.userId)?.name || ""} onChange={handleInputChange}>
            <option value="" disabled>
              Select User
            </option>
            {user.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="addressLine1" className="required">
            Address Line 1
          </label>
          <input type="text" id="addressLine1" name="addressLine1" value={addressData.addressLine1} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="addressLine2" className="required">
            Address Line 2
          </label>
          <input type="text" id="addressLine2" name="addressLine2" value={addressData.addressLine2} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="city" className="required">
            City
          </label>
          <input type="text" id="city" name="city" value={addressData.city} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="state" className="required">
            State
          </label>
          <input type="text" id="state" name="state" value={addressData.state} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode" className="required">
            Postal Code
          </label>
          <input type="text" id="postalCode" name="postalCode" value={addressData.postalCode} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="country" className="required">
            Country
          </label>
          <input type="text" id="country" name="country" value={addressData.country} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="addressType" className="required">
            Address Type
          </label>
          <input type="text" id="addressType" name="addressType" value={addressData.addressType} onChange={handleInputChange} />
        </div>

        <button className="submitBtn" type="button" onClick={addAddress}>
          Place Address
        </button>
      </div>
    </div>
  );
};

export default AddAddress;
