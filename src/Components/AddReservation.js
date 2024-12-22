/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddReservation = () => {
	const [reservationData, setReservationData] = useState({
		branchId: "",
		customerId: "",
		carId: "",
		startDate: "",
		endDate: "",
		totalCost: "",
		status: "",
		createdAt: new Date,
	});

	const [car, setCar] = useState([]);
	const [customer, setCustomer] = useState([]);
	const [branch, setBranch] = useState([]);
	const [status] = useState(["Completed", "Pending"]);

	const fetchCar = async () => {
		try {
			const response = await axios.get("http://localhost:8080/carrentalapi/carDropdown/getList");
			setCar(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching reservation:", error);
		}
	};

	const fetchCustomer = async () => {
		try {
			const response = await axios.get("http://localhost:8080/carrentalapi/customerDropdown/getList");
			setCustomer(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching reservation:", error);
		}
	};

	const fetchBranch = async () => {
		try {
			const response = await axios.get("http://localhost:8080/carrentalapi/branchDropdown/getList");
			setBranch(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching reservation:", error);
		}
	};

	function replaceCarWithId(name) {
		const foundObject = car.find((obj) => obj.carName === name);
		return foundObject?.id;
	}

	function replaceBranchWithId(name) {
		const foundObject = branch.find((obj) => obj.branchName === name);
		return foundObject?.id;
	}

	function replaceCustomerWithId(name) {
		const foundObject = customer.find((obj) => obj.fullName === name);
		return foundObject?.id;
	}

	useEffect(() => {
		fetchCar();
		fetchCustomer();
		fetchBranch();
	}, []);

	function hasEmptyValues(obj) {
		return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
	}

	const notify = () => toast("reservation Created Successfully!", { type: "success" });
	const notifyError = () => toast("Error While Adding reservation!", { type: "error" });
	const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
	//const notifyPin = () => toast("The color provided should be having @gmail.com characters!", { type: "warning" });

	const AddReservation = async () => {
		console.log(reservationData);
		if (hasEmptyValues(reservationData)) {
			notifyWarning();
			return;
		} else {
			try {
				const response = await axios.post("http://localhost:8080/carrentalapi/reservation/add", reservationData);
				setReservationData({
					branchId: "",
					customerId: "",
					carId: "",
					startDate: "",
					endDate: "",
					totalCost: "",
					status: "",
					createdAt: "",
				});
				notify();
			} catch (error) {
				notifyError();
			}
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setReservationData({
			...reservationData,
			[name]: value,
		});
	};

	return (
		<div>
			<div className="card">
				<h2>Create Reservation</h2>
				<div className="form-group">
					<label htmlFor="branchId" class="required">
						Branch Names
					</label>
					<select id="statusOption" name="branchId" value={replaceBranchWithId(reservationData.branchId)} onChange={handleInputChange}>
						<option key={null} value={null}></option>
						{branch.map((g) => (
							<option key={g.branchId} value={g.branchId}>
								{g.branchName}
							</option>
						))}
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="customerId" class="required">
						Customers Names
					</label>
					<select id="statusOption" name="customerId" value={replaceCustomerWithId(reservationData.customerId)} onChange={handleInputChange}>
						<option key={null} value={null}></option>
						{customer.map((g) => (
							<option key={g.customerId} value={g.customerId}>
								{g.fullName}
							</option>
						))}
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="carId" class="required">
						Car Names
					</label>
					<select id="statusOption" name="carId" value={replaceCarWithId(reservationData.carId)} onChange={handleInputChange}>
						<option key={null} value={null}></option>
						{car.map((g) => (
							<option key={g.carId} value={g.carId}>
								{g.carName}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="startDate" class="required">
						Start Date
					</label>
					<input type="date" id="startDate" name="startDate" value={reservationData.startDate} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="endDate" class="required">
						End Date
					</label>
					<input type="date" id="endDate" name="endDate" value={reservationData.endDate} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="totalCost" class="required">
						Total Cost
					</label>
					<input type="number" id="totalCost" name="totalCost" value={reservationData.totalCost} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="status" className="required">
						Status
					</label>
					<select id="statusOption" name="status" value={reservationData.status} onChange={handleInputChange}>
						<option key={null} value={null}></option>
						{status.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</div>
				<button className="submitBtn" type="submit" onClick={AddReservation}>
					Create Car
				</button>
			</div>
		</div>
	);
};

export default AddReservation;
