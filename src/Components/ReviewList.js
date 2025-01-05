/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const [review, setReview] = useState([]);
  const defaultPageSize = 20;
  const navigate = useNavigate(); // Hook to programmatically navigate

  const fetchReview = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reviews/list");
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching Review:", error);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit Review ID:", id);
    // Redirect to the EditReview component with the review ID
    navigate(`/edit/${id}`);
  };

const columnDefs = [
  { headerName: "Id", field: "id", width: 90 },
  { headerName: "Product Name", field: "productName", width: 180 },
  { headerName: "User Name", field: "userName", width: 160 },
  { headerName: "Rating", field: "rating", width: 90 },
  { headerName: "Comment", field: "comment", width: 170 },
  { headerName: "Created At", field: "createdAt", width: 190 },
  {
    headerName: "Edit",
    field: "edit",
    width: 100,
    cellRenderer: (params) => (
      <button className="custom-edit-button" onClick={() => handleEdit(params.data.id)}>
        Edit
      </button>
    ),
  },
];


  return (
    <div className="ag-theme-alpine" style={{ height: "390px", width: "1000px", margin: "0 auto" }}>
      {review.length > 0 ? (
        <>
          <br />
          <h1>Total Review: {review.length}</h1>
          <AgGridReact reactUi={true} columnDefs={columnDefs} rowData={review} pagination={true} paginationPageSize={defaultPageSize} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Review;
