/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddEmployee = () => {
	const [employeeData, setEmployeeData] = useState({
		name: "",
		profession: "",
		phoneNumber: "",
		address: "",
		branchId: 0,
	});

	const [branches, setBranches] = useState([]);

	const fetchBranches = async () => {
		try {
			const response = await axios.get("http://localhost:8080/carrentalapi/branchDropdown/getList");
			setBranches(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching branches:", error);
		}
	};

	function replaceBranchWithId(name) {
		const foundObject = branches.find((obj) => obj.branchName === name);
		return foundObject?.id;
	}

	useEffect(() => {
		fetchBranches();
	}, []);

	function hasEmptyValues(obj) {
		return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
	}

	const notify = () => toast("Employee Created Successfully!", { type: "success" });
	const notifyError = () => toast("Error While Adding Employee!", { type: "error" });
	const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
	//const notifyPin = () => toast("The color provided should be having @gmail.com characters!", { type: "warning" });

	const AddEmployee = async () => {
		console.log(employeeData);
		if (hasEmptyValues(employeeData)) {
			notifyWarning();
			return;
		} else {
			try {
				const response = await axios.post("http://localhost:8080/carrentalapi/employee/add", employeeData);
				setEmployeeData({
					name: "",
					profession: "",
					phoneNumber: "",
					address: "",
					branchId: 0,
				});
				notify();
			} catch (error) {
				notifyError();
			}
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEmployeeData({
			...employeeData,
			[name]: value,
		});
	};

	return (
		<div>
			<div className="card">
				<h2>Create Employee</h2>

				<div className="form-groups">
					<label htmlFor="branchId" class="requireds">
						Branch Names
					</label>
					<select id="statusOption" name="branchId" value={replaceBranchWithId(employeeData.branchId)} onChange={handleInputChange}>
						<option key={null} value={null}></option>
						{branches.map((g) => (
							<option key={g.branchId} value={g.branchId}>
								{g.branchName}
							</option>
						))}
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="name" class="required">
						Name
					</label>
					<input type="text" id="name" name="name" value={employeeData.name} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="profession" class="required">
						Profession
					</label>
					<input type="text" id="profession" name="profession" value={employeeData.profession} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="phoneNumber" class="required">
						Phone Number
					</label>
					<input type="text" id="phoneNumber" name="phoneNumber" value={employeeData.phoneNumber} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="address" class="required">
						Address
					</label>
					<input type="text" id="address" name="address" value={employeeData.address} onChange={handleInputChange} />
				</div>

				<button className="submitBtn" type="submit" onClick={AddEmployee}>
					Create Employee
				</button>
			</div>
		</div>
	);
};

export default AddEmployee;
