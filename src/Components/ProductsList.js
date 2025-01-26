/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const defaultPageSize = 20;
    const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products/list");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };
    const handleEdit = (id) => {
      console.log("Edit Products ID:", id);
      // Redirect to the EditReview component with the review ID
      navigate(`/editProduct/${id}`);
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columnDefs = [
    { headerName: "ID", field: "id", width: 70 },
    { headerName: "Name", field: "name", width: 220 },
    { headerName: "description", field: "description", width: 290 },
    { headerName: "Price", field: "price", width: 110 },
    { headerName: "SKU", field: "sku", width: 100 },
    { headerName: "Stock", field: "stock", width: 120 },
    { headerName: "Status", field: "status", width: 110 },
    { headerName: "Created At", field: "createdAt", width: 250 },
    { headerName: "Updated At", field: "updatedAt", width: 250 },
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
      {products.length > 0 ? (
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h2 className="heading">Total Products: {products.length}</h2>
          <AgGridReact columnDefs={columnDefs} rowData={products} pagination={true} paginationPageSize={defaultPageSize} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Product;
