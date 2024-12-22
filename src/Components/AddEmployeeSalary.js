/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddEmployeeSalary = () => {
	const [employeeSalaryData, setEmployeeSalaryData] = useState({
		employeeId: 0,
		salaryDate: "",
		salaryAmount: 0,
		paymentMode: "",
		chequeNumber: "",
		paidBy: "",
	});
    const [paymentMode] = useState(["Cash", "Cheque"]);
	const [employee, setEmployee] = useState([]);

	const fetchEmployee = async () => {
		try {
			const response = await axios.get("http://localhost:8080/carrentalapi/employeeDropdown/getList");
			setEmployee(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching Employee:", error);
		}
	};

	function replaceEmployeeWithId(name) {
		const foundObject = employee.find((obj) => obj.employeeName === name);
		return foundObject?.id;
	}

	useEffect(() => {
		fetchEmployee();
	}, []);

	function hasEmptyValues(obj) {
		return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
	}

	const notify = () => toast("Employee Salary Created Successfully!", { type: "success" });
	const notifyError = () => toast("Error While Adding Employee Salary!", { type: "error" });
	const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
	//const notifyPin = () => toast("The color provided should be having @gmail.com characters!", { type: "warning" });

	const AddEmployeeSalary = async () => {
		console.log(employeeSalaryData);
		if (hasEmptyValues(employeeSalaryData)) {
			notifyWarning();
			return;
		} else {
			try {
				const response = await axios.post("http://localhost:8080/carrentalapi/employeeSalary/add", employeeSalaryData);
				setEmployeeSalaryData({
					employeeId: 0,
					salaryDate: "",
					salaryAmount: 0,
					paymentMode: "",
					chequeNumber: "",
					paidBy: "",
				});
				notify();
			} catch (error) {
				notifyError();
			}
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEmployeeSalaryData({
			...employeeSalaryData,
			[name]: value,
		});
	};

	return (
		<div>
			<div className="card">
				<h2>Create Employee Salary</h2>

				<div className="form-groups">
					<label htmlFor="employeeId" class="requireds">
						Employee Names
					</label>
					<select id="statusOption" name="employeeId" value={replaceEmployeeWithId(employeeSalaryData.employeeId)} onChange={handleInputChange}>
						<option key={null} value={null}></option>
						{employee.map((g) => (
							<option key={g.employeeId} value={g.employeeId}>
								{g.employeeName}
							</option>
						))}
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="salaryDate" class="required">
						Salary Date
					</label>
					<input type="Date" id="salaryDate" name="salaryDate" value={employeeSalaryData.salaryDate} onChange={handleInputChange} />
				</div>
				<div className="form-groups">
					<label htmlFor="paymentMode" className="requireds">
						Payment Mode
					</label>
					<select id="statusOption" name="paymentMode" value={employeeSalaryData.paymentMode} onChange={handleInputChange}>
						<option key={null} value={null}></option>
						{paymentMode.map((p) => (
							<option key={p} value={p}>
								{p}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="salaryAmount" class="required">
						Salary Amount
					</label>
					<input type="text" id="salaryAmount" name="salaryAmount" value={employeeSalaryData.salaryAmount} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="chequeNumber" class="required">
						Cheque Number
					</label>
					<input type="text" id="chequeNumber" name="chequeNumber" value={employeeSalaryData.chequeNumber} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="paidBy" class="required">
						Paid By
					</label>
					<input type="text" id="paidBy" name="paidBy" value={employeeSalaryData.paidBy} onChange={handleInputChange} />
				</div>

				<button className="submitBtn" type="submit" onClick={AddEmployeeSalary}>
					Create Employee Salary
				</button>
			</div>
		</div>
	);
};

export default AddEmployeeSalary;
