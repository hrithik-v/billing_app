import React, { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "../footer";
import Logout from "../logout";

export default function UserLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname.search("dashboard") !== -1 &&
      !window.localStorage.getItem("auth-token")
    ) {
      navigate("/"); // to login-page , means user not Logged in
    }
  });

  return (
    <>
      <div id="navBar">
        <Link className="Link" to="/dashboard">
          Invoice
        </Link>
        <Link className="Link" to="/dashboard/search">
          Search
        </Link>
        <Logout />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
