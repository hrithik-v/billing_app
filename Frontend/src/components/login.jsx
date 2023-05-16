import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerMsg from "./bannerMsg";

export default function Login() {
  const navigate = useNavigate();
  //
  const [msg, setMsg] = useState({
    status: false,
    message: "",
    color: ""
  });
  const [creds, setCreds] = useState({
    GSTIN: "",
    password: ""
  });
  //
  setTimeout((i) => {
    if (msg.status) {
      setMsg({
        status: false,
        ...i
      });
    }
  }, 4000);

  //
  const handleChange = (event) => {
    setCreds((i) => {
      return {
        ...i,
        [event.target.name]:
          event.target.name === "GSTIN"
            ? event.target.value.toUpperCase()
            : event.target.value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var response = await fetch("http://127.0.0.1/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(creds)
      });
      var res = await response.json();
      if (response.status === 404 || response.status === 401) {
        setMsg({
          message: res.message,
          status: true,
          color: "#b20000d4"
        });
      } else {
        setMsg({
          message: res.message,
          status: true,
          color: "#008000d4"
        });
        window.localStorage.setItem("auth-token", res["auth-token"]);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      setMsg({
        message: "Error while connecting to server",
        status: true,
        color: "#b20000d4"
      });
    }
  };

  return (
    <>
      {msg.status ? BannerMsg(msg) : undefined}
      <div className="box-login">
        <div style={{ margin: "23px", textAlign: "center" }} className="title">
          <h1>Welcome Back</h1>
        </div>
        <form className="login" onSubmit={handleSubmit}>
          <input
            name="GSTIN"
            style={{ gridArea: "userid" }}
            required
            type="text"
            placeholder="Enter GSTIN"
            value={creds.GSTIN}
            onChange={handleChange}
          />
          <input
            name="password"
            style={{ gridArea: "pass" }}
            required
            type="password"
            value={creds.password}
            placeholder="Enter Pasword"
            onChange={handleChange}
          />
          <input style={{ gridArea: "btn" }} type="submit" value="Login" />
        </form>
      </div>
    </>
  );
}
