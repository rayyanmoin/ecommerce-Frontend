import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";
import { useNavigate } from "react-router-dom";

export const EditProduct = () => {
  const { id } = useParams(); // Get the review ID from the URL
  const [productEdit, setProductEdit] = useState({
    name: "",
    description: "",
    price: 0,
    sku: "",
    stock: 0,
    status: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const navigate = useNavigate(); // Hook to programmatically navigate
const [status] = useState(["ACTIVE", "INACTIVE"]);
  // Fetch review by ID
  const fetchProductById = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/products/${id}`);
      const { name, description, price, sku, stock, status, createdAt, updatedAt } = response.data;
      setProductEdit({ name, description, price, sku, stock, status, createdAt, updatedAt });
    } catch (error) {
      console.error("Error fetching Product by ID:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchProductById();
  }, [fetchProductById]);

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("Product Updated Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Editing Product!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const EditProduct = async () => {
    console.log(productEdit);
    if (hasEmptyValues({ ...productEdit })) {
      notifyWarning();
      return;
    } else {
      try {
        const updatedProductEdit = {
          ...productEdit,
          id: Number(id),
        };
        await axios.put(`http://localhost:8080/products/edit/${id}`, updatedProductEdit);

        // Reset all fields
        setProductEdit({
          name: "",
          description: "",
          price: 0,
          sku: "",
          stock: 0,
          status: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        notify();
        navigate(`/products`);
      } catch (error) {
        notifyError();
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductEdit((prevState) => ({
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
        <h1>Edit Product</h1>

        <div className="form-group">
          <label htmlFor="name" class="required">
            Name
          </label>
          <input type="text" id="name" name="name" value={productEdit.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description" class="required">
            Description
          </label>
          <input type="text" id="description" name="description" value={productEdit.description} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="price" class="required">
            Price
          </label>
          <input type="text" id="price" name="price" value={productEdit.price} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="sku" class="required">
            SKU
          </label>
          <input type="text" id="sku" name="sku" value={productEdit.sku} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="stock" class="required">
            Stock
          </label>
          <input type="text" id="stock" name="stock" value={productEdit.stock} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="status" className="required">
            Status
          </label>
          <select id="statusOption" name="status" value={productEdit.status} onChange={handleInputChange}>
            <option key={null} value={null}></option>
            {status.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button className="submitBtn" type="submit" onClick={EditProduct}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
