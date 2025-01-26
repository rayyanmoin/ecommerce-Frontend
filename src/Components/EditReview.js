import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";
import { useNavigate } from "react-router-dom";


export const EditReview = () => {
  const { id } = useParams(); // Get the review ID from the URL
  const [reviewEdit, setReviewEdit] = useState({
    productId: 0,
    userId: 0,
    rating: "",
    comment: "",
    createdAt: new Date(),
  });
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");                                                                   
  const [selectedUserId, setSelectedUserId] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate
  

  // Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/dropUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/products/dropProduct");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  // Fetch review by ID
  const fetchReviewById = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/reviews/${id}`);
      const { productId, userId, rating, comment, createdAt } = response.data;
      setReviewEdit({ productId, userId, rating, comment, createdAt });
      setSelectedProductId(productId);
      setSelectedUserId(userId);
    } catch (error) {
      console.error("Error fetching review by ID:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchReviewById();
  }, [fetchUsers, fetchProducts, fetchReviewById]);

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("Review Updated Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Editing Review!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const EditReview = async () => {
    console.log(reviewEdit);
    if (hasEmptyValues({ ...reviewEdit, productId: selectedProductId, userId: selectedUserId })) {
      notifyWarning();
      return;
    } else {
      try {
        const updatedReviewEdit = {
          ...reviewEdit,
          productId: selectedProductId,
          userId: selectedUserId,
          id: Number(id),
        };
        await axios.put(`http://localhost:8080/reviews/edit/${id}`, updatedReviewEdit);

        // Reset all fields
        setReviewEdit({
          productId: 0,
          userId: 0,
          rating: "",
          comment: "",
          createdAt: new Date(),
        });
        setSelectedProductId("");
        setSelectedUserId("");

        notify();
         navigate(`/review`);
      } catch (error) {
        notifyError();
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewEdit((prevState) => ({
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
        <h1>Edit Review</h1>

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
          <input type="text" id="rating" name="rating" value={reviewEdit.rating} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="comment" className="required">
            Comment
          </label>
          <input type="text" id="comment" name="comment" value={reviewEdit.comment} onChange={handleInputChange} />
        </div>

        <button className="submitBtn" type="submit" onClick={EditReview}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditReview;
