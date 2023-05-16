import React, { useState } from "react";
import BannerMsg from "../bannerMsg";
import Display from "./displayRecords";



// ------------------------
const fetchData = async (method, values) => {
  var SearchParams = "";
  if (method === "date") {
    SearchParams = new URLSearchParams({
      method: method,
      date_from: new Date(values.date_from + "T00:00:00+05:30").toISOString(),
      date_to: new Date(values.date_to + "T23:59:59+05:30").toISOString()
    });
  } else {
    SearchParams = new URLSearchParams({
      gstin: "07adzpv7370c1zus",
      method: method,
      value: values.value
    });
  }
  var response = await fetch("http://127.0.0.1/search?" + SearchParams, {
    headers: {
      "auth-token": window.localStorage.getItem("auth-token")
    }
  });
  if (response.status === 500) {
    return 500;
  }
  return await response.json();
};

//
//
//
//
//

// ==============Main Function============
function Search() {
  const [result, setResult] = useState([]);
  // ------------------------------------
  const [msg, setMsg] = useState({
    status: false,
    message: "",
    color: ""
  });
  const [select, setSelect] = useState("");
  const [ip_value, set_IpValue] = useState({
    value: "",
    date_from: "",
    date_to: ""
  });

  if (msg.status) {
    setTimeout(() => {
      setMsg({ status: false });
    }, 4000);
  }

  // ---------------Mini-Functions-------------
  const changeSelect = (event) => {
    setSelect(event.target.value);
  };
  const pull_Value = (event) => {
    if (select !== "") {
      set_IpValue({ value: event.target.value });
    }
  };
  const handleDateSearch = () => {
    return (
      <>
        <label htmlFor="startDate">From : </label>
        <input
          value={ip_value.date_from}
          onChange={(event) => {
            set_IpValue((prev) => {
              return {
                ...prev,
                date_from: event.target.value
              };
            });
          }}
          type="date"
          name="date_from"
        />
        <br />
        <label htmlFor="endDate">To : </label>
        <input
          value={ip_value.date_to}
          onChange={(event) => {
            set_IpValue((prev) => {
              return {
                ...prev,
                date_to: event.target.value
              };
            });
          }}
          type="date"
          name="date_to"
        />
        <input
          className="searchBtn"
          type="button"
          disabled={
            ip_value.date_from === "" || ip_value.date_to === "" ? true : false
          }
          style={{
            backgroundColor:
              ip_value.date_from === "" || ip_value.date_to === ""
                ? "#c3c0c0"
                : "rgb(2, 143, 2)"
          }}
          value="Search"
          onClick={handleSubmit}
        />
      </>
    );
  };
  // ----------------------------
  const placeholderText = () => {
    if (select === "clientGSTIN") {
      return "Enter GSTIN";
    } else if (select === "invoiceId") {
      return "Enter Invoice ID";
    } else {
      return "Select Option";
    }
  };
  // -----------------------------
  const handleSubmit = () => {
    fetchData(select, ip_value)
      .then((data) => {
        if (data === 500) {
          setMsg({
            status: true,
            message: "Internal Server Error",
            color: "#b20000d4"
          });
        } else {
          setResult(data);
          if (!data.length) {
            setMsg({
              status: true,
              message: "No Record found as per Search criteria",
              color: "#a0abf0d4"
            });
          }
        }
      })
      .catch((err) => {
        setMsg({
          status: true,
          message: "Error while connecting to Server",
          color: "#b20000d4"
        });
      });
  };
  // ----------------------------------------------------------------------
  return (
    <>
      <div className="parentBox">
        {msg.status ? BannerMsg(msg) : undefined}
        <div>
          <h3
            style={{
              margin: "1rem",
              marginLeft: "1.5rem",
              marginRight: "1.5rem",
              fontWeight: "600",
              fontSize: "1.75rem"
            }}
          >
            Search
          </h3>
        </div>
        <div className="box-search">
          <div className="search">
            <label htmlFor="method">Search By:</label>
            <select
              style={{ width: "20%" }}
              className="method"
              onChange={changeSelect}
              name="method"
              id="method"
              value={select}
            >
              <option value="">Select</option>
              <option value="clientGSTIN">GSTIN</option>
              <option value="invoiceId">Invoice ID</option>
              <option value="date">Date</option>
            </select>
            {select === "date"
              ? handleDateSearch()
              : (() => {
                  return (
                    <>
                      <input
                        onChange={pull_Value}
                        placeholder={placeholderText()}
                        type="text"
                        value={ip_value.value}
                      />
                      <input
                        className="searchBtn"
                        style={{
                          backgroundColor:
                            ip_value.value === "" ? "#c3c0c0" : "rgb(2, 143, 2)"
                        }}
                        type="button"
                        value="Search"
                        disabled={ip_value.value === "" ? true : false}
                        onClick={handleSubmit}
                      />
                    </>
                  );
                })()}
          </div>
          {result.length !== 0 ? (
            <div className="displayRecords">{Display(result)}</div>
          ) : undefined}
        </div>
      </div>
    </>
  );
}

export default Search;
