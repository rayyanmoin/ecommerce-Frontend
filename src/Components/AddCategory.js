/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    parentCategory: "",
    subCategories: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [status] = useState(["PENDING", "COMPLETED"]);

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("category Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding category!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
  //const notifyPin = () => toast("The color provided should be having @gmail.com characters!", { type: "warning" });

  const AddCategory = async () => {
    console.log(categoryData);
    if (hasEmptyValues(categoryData)) {
      notifyWarning();
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8080/category/add", categoryData);
        setCategoryData({
          name: "",
          description: "",
          parentCategory: "",
          subCategories: [],
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
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="cardsss">
        <h1>Create Category</h1>

        <div className="form-group">
          <label htmlFor="name" class="required">
            Name
          </label>
          <input type="text" id="name" name="name" value={categoryData.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description" class="required">
            Description
          </label>
          <input type="text" id="description" name="description" value={categoryData.description} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="parentCategory" class="required">
            Parent Category
          </label>
          <input type="text" id="parentCategory" name="parentCategory" value={categoryData.parentCategory} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="subCategories" class="required">
            Sub Categories
          </label>
          <input type="text" id="subCategories" name="subCategories" value={categoryData.subCategories} onChange={handleInputChange} />
        </div>
       

        <button className="submitBtn" type="submit" onClick={AddCategory}>
          Create Category
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
