/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddProducts = () => {
  const [productsData, setProductsData] = useState({
    name: "",
    description: "",
    price: 0,
    sku: "",
    stock: 0,
    status: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [status] = useState(["ACTIVE", "INACTIVE"]);


  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("products Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding products!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
  //const notifyPin = () => toast("The color provided should be having @gmail.com characters!", { type: "warning" });

  const AddProducts = async () => {
    console.log(productsData);
    if (hasEmptyValues(productsData)) {
      notifyWarning();
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8080/products/add", productsData);
        setProductsData({
          name: "",
          description: "",
          price: 0,
          sku: "",
          stock: 0,
          status: "",
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
    setProductsData({
      ...productsData,
      [name]: value,
    });
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="card">
        <h1>Create Products</h1>

        <div className="form-group">
          <label htmlFor="name" class="required">
            Name
          </label>
          <input type="text" id="name" name="name" value={productsData.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description" class="required">
            Description
          </label>
          <input type="text" id="description" name="description" value={productsData.description} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="price" class="required">
            Price
          </label>
          <input type="text" id="price" name="price" value={productsData.price} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="sku" class="required">
            SKU
          </label>
          <input type="text" id="sku" name="sku" value={productsData.sku} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="stock" class="required">
            Stock
          </label>
          <input type="text" id="stock" name="stock" value={productsData.stock} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="status" className="required">
            Status
          </label>
          <select id="statusOption" name="status" value={productsData.status} onChange={handleInputChange}>
            <option key={null} value={null}></option>
            {status.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button className="submitBtn" type="submit" onClick={AddProducts}>
          Create Products
        </button>
      </div>
    </div>
  );
};

export default AddProducts;
