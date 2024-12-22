/** @format */

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

const Customers = () => {
	const [customerData, setCustomerData] = useState({
		cnic: "",
		fullName: "",
		email: "",
		phoneNumber: "",
		address: "",
		createdAt: new Date(),
	});

	function hasEmptyValues(obj) {
		return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
	}

	const notify = () => toast("Customer Created Successfully!", { type: "success" });
	const notifyError = () => toast("Error While Adding Customer!", { type: "error" });
	const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
	//const notifyPin = () => toast("The Email provided should be having @gmail.com characters!", { type: "warning" });

	const addCustomer = async () => {
		console.log(customerData);
		if (hasEmptyValues(customerData)) {
			notifyWarning();
			return;
		} else {
			try {
				const response = await axios.post("http://localhost:8080/carrentalapi/customer/add", customerData);
				setCustomerData({
					cnic: "",
					fullName: "",
					email: "",
					phoneNumber: "",
					address: "",
				});
				notify();
			} catch (error) {
				notifyError();
			}
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCustomerData({
			...customerData,
			[name]: value,
		});
	};

	return (
		<div>
			<div className="card">
				<h2>Create Customer</h2>
				<div className="form-group">
					<label htmlFor="cnic" class="required">
						CNIC
					</label>
					<input type="text" id="cnic" name="cnic" value={customerData.cnic} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="fullName" class="required">
						Full Name
					</label>
					<input type="text" id="fullName" name="fullName" value={customerData.fullName} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="email" class="required">
						Email
					</label>
					<input type="text" id="email" name="email" value={customerData.email} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="phoneNumber" class="required">
						Phone Number
					</label>
					<input type="text" id="phoneNumber" name="phoneNumber" value={customerData.phoneNumber} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="address" class="required">
						Address
					</label>
					<input type="text" id="address" name="address" value={customerData.address} onChange={handleInputChange} />
				</div>
				<button className="submitBtn" type="submit" onClick={addCustomer}>
					Create Customer
				</button>
			</div>
		</div>
	);
};

export default Customers;
