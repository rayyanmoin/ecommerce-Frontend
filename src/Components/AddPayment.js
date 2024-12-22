/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddPayment = () => {
  const [paymentData, setPaymentData] = useState({
    paymentDate: new Date(),
    amount: 0,
    paymentMethod: "",
    status: "",
    transactionId: "",
    orderId: 0,
  });

  const [status] = useState(["PENDING", "COMPLETED"]);
  const [paymentMethods] = useState(["CREDIT_CARD", "PAYPAL","BANK_TRANSFER"]);


  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("payment Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding payment!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
  //const notifyPin = () => toast("The color provided should be having @gmail.com characters!", { type: "warning" });

  const AddPayment = async () => {
    console.log(paymentData);
    if (hasEmptyValues(paymentData)) {
      notifyWarning();
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8080/payment/add", paymentData);
        setPaymentData({
          paymentDate: new Date(),
          amount: 0,
          paymentMethod: "",
          status: "",
          transactionId: "",
          orderId: 0,
        });
        notify();
      } catch (error) {
        notifyError();
      }
    }
  };

 const handleInputChange = (event) => {
   const { name, value } = event.target;
   setPaymentData((prevState) => ({
     ...prevState,
     [name]: value,
   }));
 };


  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="cardsssss">
        <h1>Pay Order</h1>

        <div className="form-group">
          <label htmlFor="amount" class="required">
            Amount
          </label>
          <input type="text" id="amount" name="amount" value={paymentData.amount} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="transactionId" class="required">
            Transaction Id
          </label>
          <input type="text" id="transactionId" name="transactionId" value={paymentData.transactionId} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="orderId" class="required">
            Order Id
          </label>
          <input type="text" id="orderId" name="orderId" value={paymentData.orderId} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethods" className="required">
            Payment Method
          </label>
          <select id="paymentOption" name="paymentMethod" value={paymentData.paymentMethod || ""} onChange={handleInputChange}>
            <option key="empty" value="">
              Select a payment method
            </option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="status" className="required">
            Status
          </label>
          <select id="statusOption" name="status" value={paymentData.status} onChange={handleInputChange}>
            <option key={null} value={null}></option>
            {status.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button className="submitBtn" type="submit" onClick={AddPayment}>
          Pay
        </button>
      </div>
    </div>
  );
};

export default AddPayment;
