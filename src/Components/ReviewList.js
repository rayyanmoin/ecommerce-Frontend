/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Review = () => {
  const [review, setReview] = useState([]);
  const defaultPageSize = 20;
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

  const columnDefs = [
    { headerName: "Id", field: "id", width: 90 },
    { headerName: "Product Name", field: "productName", width: 190 },
    { headerName: "User Name", field: "userName", width: 190 },
    { headerName: "Rating", field: "rating", width: 150 },
    { headerName: "Comment", field: "comment", width: 170 },
    { headerName: "Created At", field: "createdAt", width: 200 },
  ];


  return (
    <div className="ag-theme-alpine" style={{ height: "390px", width: "1000px", margin: "0 auto" }}>
      {review.length > 0 ? (
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1>Total Review: {review.length}</h1>

          <AgGridReact columnDefs={columnDefs} rowData={review} pagination={true} paginationPageSize={defaultPageSize} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Review;
