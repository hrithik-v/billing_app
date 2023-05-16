import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addProduct } from "./redux-store/slice";

const CreateRecord = () => {
  const [record, setRecord] = useState({ name: "", qty: "", rate: "" });

  const dispatch = useDispatch();
  // -----------------------------------
  const add = (event) => {
    setRecord((curr) => {
      return {
        ...curr,
        [event.target.name]: event.target.value
      };
    });
  };
  // -----------------------------
  const handleClick = () => {
    dispatch(addProduct(record));
    setRecord({
      name: "",
      qty: "",
      rate: ""
    });
  };

  // -----------------------------------------------------------------
  return (
    <>
      <input
        style={{ gridArea: "name" }}
        className="i_prodName"
        placeholder="Product Name"
        type="text"
        name="name"
        onChange={add}
        value={record.name}
      />
      <input
        style={{ gridArea: "qty" }}
        className="i_qty"
        placeholder="Qty"
        type="text"
        name="qty"
        onChange={add}
        value={record.qty}
      />
      <input
        style={{ gridArea: "rate" }}
        className="i_rate"
        placeholder="Rate"
        type="text"
        name="rate"
        onChange={add}
        value={record.rate}
      />
      <img
        style={{
          width: "20px",
          gridArea: "addBtn",
          alignSelf: "center",
          justifySelf: "center",
          cursor: "pointer"
        }}
        src="/staticAssets/add.svg"
        alt="+"
        onClick={handleClick}
      />
    </>
  );
};

export default CreateRecord;
