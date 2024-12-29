/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Address = () => {
  const [address, setAddress] = useState([]);
  const defaultPageSize = 20;
  const fetchAddress = async () => {
    try {
      const response = await axios.get("http://localhost:8080/address/list");
      setAddress(response.data);
    } catch (error) {
      console.error("Error fetching Address:", error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const columnDefs = [
    { headerName: "Id", field: "id", width: 90 },
    { headerName: "Address Line1", field: "addressLine1", width: 190 },
    { headerName: "Address Line2", field: "addressLine2", width: 190 },
    { headerName: "City", field: "city", width: 150 },
    { headerName: "State", field: "state", width: 120 },
    { headerName: "postal Code", field: "postalCode", width: 140 },
    { headerName: "country", field: "country", width: 120 },
    { headerName: "Address Type", field: "addressType", width: 150 },
    { headerName: "CreatedAt", field: "createdAt", width: 190 },
    { headerName: "Updated At", field: "updatedAt", width: 190 },
    { headerName: "User Id", field: "userId", width: 120 },
  ];


  return (
    <div className="ag-theme-alpine" style={{ height: "390px", width: "1000px", margin: "0 auto" }}>
      {address.length > 0 ? (
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1>Total Address: {address.length}</h1>
          <AgGridReact columnDefs={columnDefs} rowData={address} pagination={true} paginationPageSize={defaultPageSize} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Address;
