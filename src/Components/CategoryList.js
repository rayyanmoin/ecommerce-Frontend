

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


const Category = () => {
 
  const [category, setCategory] = useState([]);
  const defaultPageSize = 20;
  const navigate = useNavigate();


	const fetchCategory = async () => {
		try {
			const response = await axios.get("http://localhost:8080/category/list");
			setCategory(response.data);
		} catch (error) {
			console.error("Error fetching Category:", error);
		}
	};

      const handleEdit = (id) => {
        console.log("Edit Roles ID:", id);
        // Redirect to the EditReview component with the review ID
        navigate(`/editCategory/${id}`);
      };

	useEffect(() => {
		fetchCategory();
	}, []);

	const columnDefs = [
    { headerName: "Category ID", field: "id", width: 110 },
    { headerName: "Name", field: "name", width: 190 },
    { headerName: "Description", field: "description", width: 450 },
    { headerName: "CreatedAt", field: "createdAt", width: 240 },
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
      {category.length > 0 ? (
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1>Total Category: {category.length}</h1>

          <AgGridReact columnDefs={columnDefs} rowData={category} pagination={true} paginationPageSize={defaultPageSize} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );

 
};

export default Category;
