/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddReview = () => {
  const [reviewData, setReviewData] = useState({
    productId: 0,
    userId: 0,
    rating: "",
    comment: "",
    createdAt: new Date(),
  });

  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/dropUsers");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products/dropProduct");
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProduct();
  }, []);

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("Review Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding Review!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const AddReview = async () => {
    console.log(reviewData);
    if (hasEmptyValues({ ...reviewData, productId: selectedProductId, userId: selectedUserId })) {
      notifyWarning();
      return;
    } else {
      try {
        const updatedReviewData = {
          ...reviewData,
          productId: selectedProductId,
          userId: selectedUserId,
        };
        await axios.post("http://localhost:8080/reviews/add", updatedReviewData);

        // Reset all fields
        setReviewData({
          productId: 0,
          userId: 0,
          rating: "",
          comment: "",
          createdAt: new Date(),
        });
        setSelectedProductId("");
        setSelectedUserId("");

        notify();
      } catch (error) {
        notifyError();
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewData((prevState) => ({
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
        <h1>Add Review</h1>

        <div className="form-group">
          <label htmlFor="product" className="required">
            Product Names
          </label>
          <select id="statusOption" name="product" value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
            <option key="" value="">
              Select a product
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="user" className="required">
            User Names
          </label>
          <select id="statusOption" name="user" value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
            <option key="" value="">
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="rating" className="required">
            Rating
          </label>
          <input type="text" id="rating" name="rating" value={reviewData.rating} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="comment" className="required">
            Comment
          </label>
          <input type="text" id="comment" name="comment" value={reviewData.comment} onChange={handleInputChange} />
        </div>

        <button className="submitBtn" type="submit" onClick={AddReview}>
          Add Review
        </button>
      </div>
    </div>
  );
};

export default AddReview;
