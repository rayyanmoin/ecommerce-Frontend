/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddAddress = () => {
  const [addressData, setAddressData] = useState({
    userId:"",
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

   const fetchUsers = async () => {
     try {
       const response = await axios.get("http://localhost:8080/users/dropUsers");
       setUser(response.data);
       console.log(response.data);
     } catch (error) {
       console.error("Error fetching user:", error);
     }
   };

   function replaceUserhWithId(name) {
     const foundObject = user.find((obj) => obj.name === name);
     return foundObject?.id;
   }

   useEffect(() => {
     fetchUsers();
   }, []);



  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("address Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding address!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
  //const notifyPin = () => toast("The color provided should be having @gmail.com characters!", { type: "warning" });

  const AddAddress = async () => {
    console.log(addressData);
    if (hasEmptyValues(addressData)) {
      notifyWarning();
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8080/address/add", addressData);
        setAddressData({
          userId: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          addressType: "",
          createdAt: "",
          updatedAt: "",
        });
        notify();
      } catch (error) {
        notifyError();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="cardssss">
        <h1>Place Address</h1>

        <div className="form-group">
          <label htmlFor="user" class="required">
            User Names
          </label>
          <select id="statusOption" name="user" value={replaceUserhWithId(user.user)} onChange={handleInputChange}>
            <option key={null} value={null}></option>
            {user.map((g) => (
              <option key={g.user} value={g.user}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="addressLine1" class="required">
            addressLine1
          </label>
          <input type="text" id="addressLine1" name="addressLine1" value={addressData.addressLine1} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="addressLine2" class="required">
            addressLine2
          </label>
          <input type="text" id="addressLine2" name="addressLine2" value={addressData.addressLine2} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="city" class="required">
            City
          </label>
          <input type="text" id="city" name="city" value={addressData.city} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="state" class="required">
            State
          </label>
          <input type="text" id="state" name="state" value={addressData.state} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode" class="required">
            Postal Code
          </label>
          <input type="text" id="postalCode" name="postalCode" value={addressData.postalCode} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="country" class="required">
            Country
          </label>
          <input type="text" id="country" name="country" value={addressData.country} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="addressType" class="required">
            addressType
          </label>
          <input type="text" id="addressType" name="addressType" value={addressData.addressType} onChange={handleInputChange} />
        </div>

        <button className="submitBtn" type="submit" onClick={AddAddress}>
          Place Address
        </button>
      </div>
    </div>
  );
};

export default AddAddress;
