/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const EmployeeSalary = () => {
	const [employeeSalary, setEmployeeSalary] = useState([]);

	const fetchEmployeeSalary = async () => {
		try {
			const response = await axios.get("http://localhost:8080/carrentalapi/employeeSalary/getList");
			setEmployeeSalary(response.data);
		} catch (error) {
			console.error("Error fetching Employee Salary:", error);
		}
	};

	useEffect(() => {
		fetchEmployeeSalary();
	}, []);

	const columnDefs = [
		{ headerName: "Salary Id", field: "salaryId", width: 100 },
		{ headerName: "Name", field: "name", width: 180 },
		{ headerName: "Salary Date", field: "salaryDate", width: 270 },
		{ headerName: "Salary Amount", field: "salaryAmount", width: 170 },
		{ headerName: "Payment Mode", field: "paymentMode", width: 160 },
		{ headerName: "Cheque Number", field: "chequeNumber", width: 170 },
		{ headerName: "Paid By", field: "paidBy", width: 160 },
	];

	return (
		<div className="ag-theme-alpine" style={{ height: "550px", width: "1200px", margin: "0 auto" }}>
			{employeeSalary.length > 0 ? (
				<>
					<h1>Total Employee Salary: {employeeSalary.length}</h1>

					<AgGridReact columnDefs={columnDefs} rowData={employeeSalary} pagination={true} paginationPageSize={10} />
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default EmployeeSalary;
