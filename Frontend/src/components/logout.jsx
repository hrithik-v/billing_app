import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const handleClick = () => {
    window.localStorage.removeItem("auth-token");
    navigate("/");
  };

  return (
    <>
      <button onClick={handleClick}>Logout</button>
    </>
  );
}

export default Logout;
