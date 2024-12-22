/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddCar = () => {
	const [carData, setCarData] = useState({
		branchId: 0,
		make: "",
		model: "",
		year: "",
		color: "",
		licensePlate: "",
		status: "",
		dailyRentalRate: "",
	});

      const [branches, setBranches] = useState([]);
      const [status] = useState(["Available", "Rented", "Maintenance"]);

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

	const notify = () => toast("Car Created Successfully!", { type: "success" });
	const notifyError = () => toast("Error While Adding Car!", { type: "error" });
	const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
	//const notifyPin = () => toast("The color provided should be having @gmail.com characters!", { type: "warning" });

	const AddCar = async () => {
		console.log(carData);
		if (hasEmptyValues(carData)) {
			notifyWarning();
			return;
		} else {
			try {
				const response = await axios.post("http://localhost:8080/carrentalapi/cars/add", carData);
				setCarData({
					branchId: "",
					make: "",
					model: "",
					year: "",
					color: "",
					licensePlate: "",
					status: "",
					dailyRentalRate: "",
				});
				notify();
			} catch (error) {
				notifyError();
			}
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCarData({
			...carData,
			[name]: value,
		});
	};

	return (
		<div>
			<div className="card">
				<h2>Create Car</h2>

				<div className="form-group">
					<label htmlFor="branchId" class="required">
						Branch Names
					</label>
					<select id="statusOption" name="branchId" value={replaceBranchWithId(carData.branchId)} onChange={handleInputChange}>
						<option key={null} value={null}></option>
						{branches.map((g) => (
							<option key={g.branchId} value={g.branchId}>
								{g.branchName}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="make" class="required">
						Make
					</label>
					<input type="text" id="make" name="make" value={carData.make} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="model" class="required">
						Model
					</label>
					<input type="text" id="model" name="model" value={carData.model} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="year" class="required">
						Year
					</label>
					<input type="text" id="year" name="year" value={carData.year} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="color" class="required">
						Color
					</label>
					<input type="text" id="color" name="color" value={carData.color} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="licensePlate" class="required">
						License Plate
					</label>
					<input type="text" id="licensePlate" name="licensePlate" value={carData.licensePlate} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="dailyRentalRate" class="required">
						daily Rental Rate
					</label>
					<input type="text" id="dailyRentalRate" name="dailyRentalRate" value={carData.dailyRentalRate} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="status" className="required">
						Status
					</label>
					<select id="statusOption" name="status" value={carData.status} onChange={handleInputChange}>
						<option key={null} value={null}></option>
						{status.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</div>

				<button className="submitBtn" type="submit" onClick={AddCar}>
					Create Car
				</button>
			</div>
		</div>
	);
};

export default AddCar;
