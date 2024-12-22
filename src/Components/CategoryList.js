

/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
 
  const [category, setCategory] = useState([]);

	const fetchCategory = async () => {
		try {
			const response = await axios.get("http://localhost:8080/category/list");
			setCategory(response.data);
		} catch (error) {
			console.error("Error fetching Category:", error);
		}
	};

	useEffect(() => {
		fetchCategory();
	}, []);

	const columnDefs = [
    { headerName: "Category ID", field: "id", width: 110 },
    { headerName: "Name", field: "name", width: 190 },
    { headerName: "Description", field: "description", width: 450 },
    { headerName: "CreatedAt", field: "createdAt", width: 240 },
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

          <AgGridReact columnDefs={columnDefs} rowData={category} pagination={true} paginationPageSize={10} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );

 
};

export default Category;
