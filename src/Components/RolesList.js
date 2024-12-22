/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Roles = () => {
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/roles/list");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching Roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const columnDefs = [
    { headerName: "Id", field: "id", width: 150 },
    { headerName: "Name", field: "name", width: 260 },
    { headerName: "Description", field: "description", width: 550 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "390px", width: "1000px", margin: "0 auto" }}>
      {roles.length > 0 ? (
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1>Total Roles: {roles.length}</h1>

          <AgGridReact columnDefs={columnDefs} rowData={roles} pagination={true} paginationPageSize={10} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Roles;
