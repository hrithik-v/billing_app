import React, { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "../footer";
import Logout from "../logout";

export default function GuestLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname === "/" &&
      window.localStorage.getItem("auth-token")
    ) {
      navigate("/dashboard"); // to dashboard, means user logged in
    }
  });

  return (
    <>
      <div id="navBar">
        <Link className="Link" to="/">
          Login
        </Link>
        <Link className="Link" to="/register">
          Register
        </Link>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
