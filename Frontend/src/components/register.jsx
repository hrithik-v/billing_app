import React, { useState } from "react";
import BannerMsg from "./bannerMsg";
import { useNavigate } from "react-router-dom";

// need to optimize by removing this using || opeator
const emptyRecord = {
  GSTIN: "",
  tradeName: "",
  representative: "",
  address: "",
  contactInfo: {
    mobileNo: "",
    email: ""
  },
  password: ""
};

function Register() {
  const navigate = useNavigate();
  const [isSaved, setStatus] = useState({
    message: "",
    status: false,
    color: ""
  });
  const [record, setRecord] = useState(emptyRecord);

  if (isSaved.status) {
    setTimeout(() => {
      setStatus({ status: false });
    }, 4000);
  }

  // ---------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault(); //  to stop implicit loading of page
    // console.log(record);
    try {
      var response = await fetch("http://127.0.0.1/register", {
        method: "POST",
        headers: {
          "content-type": "application/JSON"
        },
        body: JSON.stringify(record)
      });
      var res = await response.json();
      console.log(res);

      setStatus({
        message: res.message,
        status: true,
        color: response.status === 400 ? "#a0abf0d4" : "#008000d4"
      });
      setRecord(emptyRecord);
      if (response.status === 200) {
        window.localStorage.setItem("auth-token", res["auth-token"]);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      setStatus({
        message: "Seems lost connection to Server",
        status: true,
        color: "#b20000d4"
      });
    }
  };
  // ---------------------------------------
  const add = (event) => {
    var e = event.target;
    setRecord((curr) => {
      if (e.name === "mobileNo" || e.name === "email") {
        return {
          ...curr,
          contactInfo: { ...curr.contactInfo, [e.name]: e.value }
        };
      } else {
        return { ...curr, [e.name]: e.value };
      }
    });
  };

  return (
    <div className="box-register">
      <div style={{ margin: "23px", textAlign: "center" }} className="title">
        <h1>Welcome to this Utility</h1>
      </div>
      <form className="register" onSubmit={handleSubmit}>
        <input
          required
          style={{ gridArea: "gstin" }}
          onChange={add}
          type="text"
          placeholder="GSTIN"
          name="GSTIN"
          value={record.GSTIN}
        />
        <input
          required
          style={{ gridArea: "tradeName" }}
          onChange={add}
          type="text"
          placeholder="Trade Name"
          name="tradeName"
          value={record.tradeName}
        />
        <input
          required
          style={{ gridArea: "rep" }}
          onChange={add}
          type="text"
          placeholder="Representative"
          name="representative"
          value={record.representative}
        />
        <input
          required
          style={{ gridArea: "add" }}
          onChange={add}
          type="text"
          placeholder="Address"
          name="address"
          value={record.address}
        />
        <input
          required
          style={{ gridArea: "email" }}
          onChange={add}
          type="email"
          placeholder="Email Id"
          name="email"
          value={record.contactInfo.email}
        />
        <input
          required
          style={{ gridArea: "mob" }}
          onChange={add}
          type="text"
          placeholder="Contact No"
          name="mobileNo"
          value={record.contactInfo.mobileNo}
        />
        <input
          required
          style={{ gridArea: "pass" }}
          onChange={add}
          type="password"
          placeholder="Enter Password"
          name="password"
          value={record.password}
        />
        <input
          required
          style={{ gridArea: "reg" }}
          type="submit"
          value="Register"
        />
      </form>
      {isSaved.status ? BannerMsg(isSaved) : undefined}
    </div>
  );
}

export default Register;
