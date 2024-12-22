/** @format */

// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/addProducts">AddProducts</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li>
        <li>
          <Link to="/addCategory">AddCategory</Link>
        </li>
        <li>
          <Link to="/order">Order</Link>
        </li>
        <li>
          <Link to="/addOrder">AddOrder</Link>
        </li>
        <li>
          <Link to="/payment">Payment</Link>
        </li>
        <li>
          <Link to="/addPayment">AddPayment</Link>
        </li>
        <li>
          <Link to="/address">Address</Link>
        </li>
        <li>
          <Link to="/addAddress">AddAddress</Link>
        </li>
        <li>
          <Link to="/review">Review</Link>
        </li>
        <li>
          <Link to="/addReview">AddReview</Link>
        </li>
        <li>
          <Link to="/roles">Roles</Link>
        </li>
        <li>
          <Link to="/addRoles">AddRoles</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/addUser">AddUser</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
