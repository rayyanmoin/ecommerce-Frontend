/** @format */

// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar.js";
import { Home } from "./Components/Home.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "./Components/ProductsList.js";
import AddProducts from "./Components/AddProducts.js";
import Category from "./Components/CategoryList.js"
import Order from "./Components/OrderList.js";
import AddOrder from "./Components/AddOrder.js";
import Payment from "./Components/PaymentList.js";
import Address from "./Components/AddressList.js";
import Review from "./Components/ReviewList.js";
import Roles from "./Components/RolesList.js";
import User from "./Components/UserList.js";
import AddCategory from "./Components/AddCategory.js";
import AddAddress from "./Components/AddAddress.js";
import AddPayment from "./Components/AddPayment.js";
import AddReview from "./Components/AddReview.js";
import AddRole from "./Components/AddRole.js";
import AddUser from "./Components/AddUser.js";

const AppRouter = () => {
	return (
    <Router>
      <Navbar />
      <ToastContainer
        toastStyle={{
          fontFamily: "monospace",
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addProducts" element={<AddProducts />} />
        <Route path="/products" element={<Product />} />
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/category" element={<Category />} />
        <Route path="/addOrder" element={<AddOrder />} />
        <Route path="/order" element={<Order />} />
        <Route path="/addPayment" element={<AddPayment />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/address" element={<Address />} />
        <Route path="/addAddress" element={<AddAddress />} />
        <Route path="/addReview" element={<AddReview />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/review" element={<Review />} />
        <Route path="/addRoles" element={<AddRole/>} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
