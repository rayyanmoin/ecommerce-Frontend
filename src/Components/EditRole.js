import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";
import { useNavigate } from "react-router-dom";

export const EditRole = () => {
  const { id } = useParams(); // Get the review ID from the URL
  const [roleEdit, setRoleEdit] = useState({
    name: "",
    description: "",
  });
  const navigate = useNavigate(); // Hook to programmatically navigate


  // Fetch review by ID
  const fetchRolesById = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/roles/${id}`);
      const { name, description} = response.data;
      setRoleEdit({ name, description});
    } catch (error) {
      console.error("Error fetching roles by ID:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchRolesById();
  }, [fetchRolesById]);

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("Roles Updated Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Editing Roles!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const EditRole = async () => {
    console.log(roleEdit);
    if (hasEmptyValues({ ...roleEdit})) {
      notifyWarning();
      return;
    } else {
      try {
        const updatedRoleEdit = {
          ...roleEdit,
          id: Number(id),
        };
        await axios.put(`http://localhost:8080/roles/edit/${id}`, updatedRoleEdit);

        // Reset all fields
        setRoleEdit({
          name: "",
          description: "",
        });

        notify();
        navigate(`/roles`);
      } catch (error) {
        notifyError();
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoleEdit((prevState) => ({
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
      <div className="cardsss">
        <h1>Edit role</h1>

        <div className="form-group">
          <label htmlFor="name" class="required">
            Name
          </label>
          <input type="text" id="name" name="name" value={roleEdit.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description" class="required">
            Description
          </label>
          <input type="text" id="description" name="description" value={roleEdit.description} onChange={handleInputChange} />
        </div>

        <button className="submitBtn" type="submit" onClick={EditRole}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditRole;
