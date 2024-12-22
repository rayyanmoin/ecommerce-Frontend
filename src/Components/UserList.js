/** @format */
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

// Cell Renderer for Roles
const RoleCellRenderer = (props) => {
  const { roles } = props.data || {};

  // Debugging log
  console.log("Rendering roles:", roles);

  // Safeguard and process roles
  const rolesDisplay = Array.isArray(roles) ? roles.map((role) => role.name).join(", ") : "No Roles Assigned";

  return <span>{rolesDisplay}</span>;
};

const User = () => {
  const [user, setUser] = useState([]);

  // Fetch user data from API
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/list");
      console.log("API Response:", response.data); // Debugging API response
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching User:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Define columns for the grid
  const columnDefs = [
    { headerName: "Id", field: "id", width: 90 },
    { headerName: "User Name", field: "username", width: 170 },
    { headerName: "Email", field: "email", width: 240 },
    { headerName: "Password", field: "password", width: 180 },
    { headerName: "First Name", field: "firstName", width: 150 },
    { headerName: "Last Name", field: "lastName", width: 150 },
    { headerName: "Phone", field: "phone", width: 180 },
    { headerName: "Created At", field: "createdAt", width: 190 },
    { headerName: "Updated At", field: "updatedAt", width: 190 },
    { headerName: "Roles", field: "roles", width: 190, cellRenderer: RoleCellRenderer },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "390px", width: "1000px", margin: "0 auto" }}>
      {user.length > 0 ? (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1>Total Users: {user.length}</h1>
          <AgGridReact columnDefs={columnDefs} rowData={user} pagination={true} paginationPageSize={10} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default User;
