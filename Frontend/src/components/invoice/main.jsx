import React, { useState } from "react";
import CreateRecord from "./createRecord";
import DisplayProducts from "./displayProducts";
import { useDispatch, useSelector } from "react-redux";
import { clearAll } from "./redux-store/slice";
import Footer from "./footerInv";
import BannerMsg from "../bannerMsg";

const emptyRecord = {
  clientGSTIN: "",
  tradeName: "",
  address: "",
  gstRate: ""
};

function Invoice() {
  const dispatch = useDispatch();
  const [URL, setURL] = useState("");
  const [msg, setMsg] = useState({ message: "", status: false, color: "" });
  const productsArray = useSelector((i) => i.ProductsArray);
  const [invoice, updateInvoice] = useState(emptyRecord);

  if (msg.status) {
    setTimeout(() => {
      setMsg({ status: false });
    }, 4000);
  }

  const handleChange = (event) => {
    if (URL !== "") setURL("");
    updateInvoice((curr) => {
      return {
        ...curr,
        [event.target.name]: event.target.value
      };
    });
  };
  // -------------------
  const handleSubmit = async () => {
    try {
      var data = invoice;
      data.products = productsArray;
      const response = await fetch(
        "http://127.0.0.1/newinvoice",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/JSON",
            "auth-token": window.localStorage.getItem("auth-token")
          }
        }
      );

      if (response.status === 400) {
        var res = await response.json();
        setMsg({
          message: res.message,
          status: true,
          color: "#a0abf0d4"
        });
      } else {
        setMsg({
          message: "Successfully created invoice",
          status: true,
          color: "#008000d4"
        });
        var resContent = await response.arrayBuffer();
        var blob = new Blob([resContent], { type: "application/pdf" });
        setURL(window.URL.createObjectURL(blob));
        updateInvoice(emptyRecord);
        dispatch(clearAll());
      }
    } catch (err) {
      setMsg({ message: "Connection Lost", status: true, color: "#b20000d4" });
    }
  };

  return (
    <>
      <div className="box-invoice">
        <div
          className="invoiceBox"
          style={{
            marginLeft: "1.5rem",
            marginRight: "1.5rem",
            borderRadius: "0.6rem"
          }}
        >
          <input
            style={{ gridArea: "clientGSTIN" }}
            className=""
            onChange={handleChange}
            type="text"
            placeholder="GSTIN"
            name="clientGSTIN"
            value={invoice.clientGSTIN}
          />
          <input
            style={{ gridArea: "tradeName" }}
            className=""
            onChange={handleChange}
            type="text"
            placeholder="Client Name"
            name="tradeName"
            value={invoice.tradeName}
          />
          <input
            style={{ gridArea: "address" }}
            className=""
            onChange={handleChange}
            type="text"
            placeholder="Address"
            name="address"
            value={invoice.address}
          />
          <CreateRecord />
          <div
            className="products"
            style={{
              gridArea: "products",
              display: productsArray.length === 0 ? "none" : "block"
            }}
          >
            <DisplayProducts />
          </div>
          <select
            style={{
              border: "0px",
              gridArea: "gstRate",
              alignSelf: "start",
              margin: "6px"
            }}
            onChange={handleChange}
            name="gstRate"
            value={invoice.gstRate}
          >
            <option value="">GST Rate</option>
            <option value="3">3%</option>
            <option value="6">6%</option>
            <option value="9">9%</option>
            <option value="12">12%</option>
            <option value="15">15%</option>
            <option value="18">18%</option>
          </select>
          {Footer(productsArray, invoice.gstRate)}
        </div>
        <div className="btns">
          <input
            className="submit"
            onClick={handleSubmit}
            type="button"
            value="Submit"
          />
          {msg.status ? BannerMsg(msg) : undefined}
          <a
            className="download"
            role="button"
            style={{
              display: URL === "" ? "none" : "block"
            }}
            target="_blank"
            rel="noreferrer"
            href={URL}
          >
            Download
          </a>
        </div>
      </div>
    </>
  );
}

export default Invoice;

