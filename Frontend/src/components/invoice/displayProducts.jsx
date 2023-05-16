import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "./redux-store/slice";

const border = { borderBottom: "0.5px solid black" };
const styles = {
  width: "100%",
  fontSize: "0.9em"
};

const DisplayProducts = () => {
  const ProductsArray = useSelector((i) => i.ProductsArray);
  const dispatch = useDispatch();

  return (
    <>
      <table style={styles}>
        <thead style={{ textAlign: "center", ...border }}>
          <tr>
            <td>Description</td>
            <td>Qty</td>
            <td>Rate</td>
            <td></td>
          </tr>
        </thead>

        <tbody>
          {ProductsArray.map((x, index) => {
            return (
              // <div></div>
              <tr>
                <td style={{ width: "60%" }}>{x.name}</td>
                <td style={{ width: "15%", textAlign: "right" }}>{x.qty}</td>
                <td style={{ width: "20%", textAlign: "right" }}>{x.rate}</td>
                <td style={{ width: "5%", textAlign: "right" }}>
                  <img
                    style={{
                      width: "21px",
                      // gridArea: "addBtn",
                      alignSelf: "center",
                      justifySelf: "center",
                      cursor: "pointer"
                    }}
                    src="/staticAssets/deleteBtn.png"
                    alt="X"
                    onClick={() => {
                      dispatch(deleteProduct(index));
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DisplayProducts;
