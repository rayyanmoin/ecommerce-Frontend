/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddOrder = () => {
  const [orderData, setOrderData] = useState({
        orderDate: new Date(),
        status: "",
        total: 0
  });

  const [status] = useState(["PENDING", "COMPLETED"]);

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("order Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding order!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
  //const notifyPin = () => toast("The color provided should be having @gmail.com characters!", { type: "warning" });

  const AddOrder = async () => {
    console.log(orderData);
    if (hasEmptyValues(orderData)) {
      notifyWarning();
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8080/order/add", orderData);
        setOrderData({
          orderDate: "",
          status: "",
          total: 0,
        });
        notify();
      } catch (error) {
        notifyError();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="cardss">
        <h1>Place Order</h1>

        <div className="form-group">
          <label htmlFor="total" class="required">
            Total
          </label>
          <input type="text" id="total" name="total" value={orderData.total} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="status" className="required">
            Status
          </label>
          <select id="statusOption" name="status" value={orderData.status} onChange={handleInputChange}>
            <option key={null} value={null}></option>
            {status.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button className="submitBtn" type="submit" onClick={AddOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default AddOrder;
