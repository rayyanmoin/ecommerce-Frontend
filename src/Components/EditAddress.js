import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";
import { useNavigate } from "react-router-dom";

export const EditAddress = () => {
  const { id } = useParams(); // Get the review ID from the URL
  const [addressEdit, setAddressEdit] = useState({
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

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const navigate = useNavigate();
  
  // Hook to programmatically navigate

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/dropUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  // Fetch review by ID
  const fetchAddressById = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/address/${id}`);
      const { userId, addressLine1, addressLine2, city, state, postalCode, country, addressType, createdAt, updatedAt } = response.data;
      setAddressEdit({ userId, addressLine1, addressLine2, city, state, postalCode, country, addressType, createdAt, updatedAt });
      setSelectedUserId(userId);
    } catch (error) {
      console.error("Error fetching Address by ID:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchUsers();
    fetchAddressById();
  }, [fetchUsers,fetchAddressById]);

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }


  const notify = () => toast("address Updated Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Editing address!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const EditAddress = async () => {
    console.log(addressEdit);
    if (hasEmptyValues({ ...addressEdit, userId: selectedUserId })) {
      notifyWarning();
      return;
    } else {
      try {
        const updatedAddressEdit = {
          ...addressEdit,
          userId: selectedUserId,
          id: Number(id),
        };
        await axios.put(`http://localhost:8080/address/edit/${id}`, updatedAddressEdit);

        // Reset all fields
        setAddressEdit({
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
        setSelectedUserId("");

        notify();
        navigate(`/address`);
      } catch (error) {
        notifyError();
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddressEdit((prevState) => ({
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
      <div className="cardssss">
        <h1>Edit Address</h1>

        <div className="form-group">
          <label htmlFor="user" className="required">
            User Names
          </label>
          <select id="statusOption" name="user" value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} disabled={true}>
            <option key="" value="">
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id} >
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="addressLine1" class="required">
            addressLine1
          </label>
          <input type="text" id="addressLine1" name="addressLine1" value={addressEdit.addressLine1} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="addressLine2" class="required">
            addressLine2
          </label>
          <input type="text" id="addressLine2" name="addressLine2" value={addressEdit.addressLine2} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="city" class="required">
            City
          </label>
          <input type="text" id="city" name="city" value={addressEdit.city} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="state" class="required">
            State
          </label>
          <input type="text" id="state" name="state" value={addressEdit.state} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode" class="required">
            Postal Code
          </label>
          <input type="text" id="postalCode" name="postalCode" value={addressEdit.postalCode} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="country" class="required">
            Country
          </label>
          <input type="text" id="country" name="country" value={addressEdit.country} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="addressType" class="required">
            addressType
          </label>
          <input type="text" id="addressType" name="addressType" value={addressEdit.addressType} onChange={handleInputChange} />
        </div>

        <button className="submitBtn" type="submit" onClick={EditAddress}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditAddress;
