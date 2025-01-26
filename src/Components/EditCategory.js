import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";
import { useNavigate } from "react-router-dom";

export const EditCategory = () => {
  const { id } = useParams(); // Get the review ID from the URL
  const [categoryEdit, setCategoryEdit] = useState({
    name: "",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Fetch review by ID
  const fetchCategoryById = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/category/${id}`);
      const { name, description, createdAt, updatedAt } = response.data;
      setCategoryEdit({ name, description, createdAt, updatedAt });
    } catch (error) {
      console.error("Error fetching Category by ID:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchCategoryById();
  }, [fetchCategoryById]);

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("Category Updated Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Editing Category!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const EditCategory = async () => {
    console.log(categoryEdit);
    if (hasEmptyValues({ ...categoryEdit })) {
      notifyWarning();
      return;
    } else {
      try {
        const updatedCategoryEdit = {
          ...categoryEdit,
          id: Number(id),
        };
        await axios.put(`http://localhost:8080/category/edit/${id}`, updatedCategoryEdit);

        // Reset all fields
        setCategoryEdit({
          name: "",
          description: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        notify();
        navigate(`/category`);
      } catch (error) {
        notifyError();
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryEdit((prevState) => ({
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
      <div className="cardss">
        <h1>Edit Category</h1>

        <div className="form-group">
          <label htmlFor="name" class="required">
            Name
          </label>
          <input type="text" id="name" name="name" value={categoryEdit.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description" class="required">
            Description
          </label>
          <input type="text" id="description" name="description" value={categoryEdit.description} onChange={handleInputChange} />
        </div>
        

        <button className="submitBtn" type="submit" onClick={EditCategory}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditCategory;
