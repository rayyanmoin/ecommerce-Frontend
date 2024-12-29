/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Order = () => {
	const [order, setOrder] = useState([]);
	const defaultPageSize = 20;
	const fetchOrder = async () => {
		try {
			const response = await axios.get("http://localhost:8080/order/list");
			setOrder(response.data);
		} catch (error) {
			console.error("Error fetching Order:", error);
		}
	};

	useEffect(() => {
		fetchOrder();
	}, []);

	const columnDefs = [
		{ headerName: "Order Id", field: "id", width: 160 },
		{ headerName: "Order Date", field: "orderDate", width: 320 },
		{ headerName: "Status", field: "status", width: 290 },
		{ headerName: "Total", field: "total", width: 200 },
	]; 

	return (
    <div className="ag-theme-alpine" style={{ height: "390px", width: "1000px", margin: "0 auto" }}>
      {order.length > 0 ? (
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1>Total Order: {order.length}</h1>

          <AgGridReact columnDefs={columnDefs} rowData={order} pagination={true} paginationPageSize={defaultPageSize} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Order;
