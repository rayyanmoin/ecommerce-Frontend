/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {

  const [payment, setPayment] = useState([]);


	const fetchPayment = async () => {
		try {
			const response = await axios.get("http://localhost:8080/payment/list");
			setPayment(response.data);
		} catch (error) {
			console.error("Error fetching Payment:", error);
		}
	};

	useEffect(() => {
		fetchPayment();
	}, []);

	const columnDefs = [
    { headerName: "ID", field: "id", width: 90 },
    { headerName: "paymentDate", field: "paymentDate", width: 220 },
    { headerName: "amount", field: "amount", width: 150 },
    { headerName: "paymentMethod", field: "paymentMethod", width: 170 },
    { headerName: "status", field: "status", width: 120 },
    { headerName: "transactionId", field: "transactionId", width: 180 },
    { headerName: "orderId", field: "orderId", width: 110 },
  ];

	return (
    <div className="ag-theme-alpine" style={{ height: "390px", width: "1000px", margin: "0 auto" }}>
      {payment.length > 0 ? (
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1>Total Payment: {payment.length}</h1>

          <AgGridReact columnDefs={columnDefs} rowData={payment} pagination={true} paginationPageSize={10} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Payment;
