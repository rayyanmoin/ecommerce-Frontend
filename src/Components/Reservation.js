/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Reservation = () => {
	const [reservation, setReservation] = useState([]);

	const fetchReservation = async () => {
		try {
			const response = await axios.get("http://localhost:8080/carrentalapi/reservation/getList");
			setReservation(response.data);
		} catch (error) {
			console.error("Error fetching Reservation:", error);
		}
	};

	useEffect(() => {
		fetchReservation();
	}, []);

	const columnDefs = [
		{ headerName: "Reservation Id", field: "reservationId", width: 140 },
		{ headerName: "Start Date", field: "startDate", width: 240 },
		{ headerName: "End Date", field: "endDate", width: 240 },
		{ headerName: "Total Cost", field: "totalCost", width: 130 },
		{ headerName: "Status", field: "status", width: 120 },
		{ headerName: "Created At", field: "createdAt", width: 250 },
		{ headerName: "Branch Name", field: "branchName", width: 180 },
		{ headerName: "Make", field: "make", width: 150 },
		{ headerName: "Model", field: "model", width: 150 },
		{ headerName: "Year", field: "year", width: 150 },
		{ headerName: "CNIC", field: "cnic", width: 180 },
		{ headerName: "Full Name", field: "fullName", width: 250 },
	];

	return (
		<div className="ag-theme-alpine" style={{ height: "550px", width: "1200px", margin: "0 auto" }}>
			{reservation.length > 0 ? (
				<>
					<h1>Total Reservation: {reservation.length}</h1>

					<AgGridReact columnDefs={columnDefs} rowData={reservation} pagination={true} paginationPageSize={10} />
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Reservation;
