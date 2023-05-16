import React from "react";
const tdStyleRight = {
  textAlign: "right"
};
const tdStyleCePadBor = {
  textAlign: "center",
  padding: "6px"
};

const Display = (props) => {
  return (
    <table style={{ width: "100%" }} id="display">
      <thead>
        <tr>
          <th>GSTIN</th>
          <th>IRN</th>
          <th>Date</th>
          <th style={tdStyleRight}>Amount(₹)</th>
        </tr>
      </thead>
      <tbody>
        {props.map((i, index) => {
          var amt = 0;
          i.products.forEach((j) => {
            amt += j.qty * j.rate;
          });
          amt += (i.gstRate / 100) * amt;
          return (
            <tr
              style={{
                color: "#222222",
                backgroundColor: index % 2 ? "white" : "#b9b9b9"
              }}
            >
              {/* <tr style={{ color: "#4a4949" }}> */}
              <td style={tdStyleCePadBor}>{i.clientGSTIN}</td>
              <td style={tdStyleCePadBor}>{i.invoiceId}</td>
              <td style={tdStyleCePadBor}>
                {new Date(i.date).toLocaleString()}
              </td>
              <td
                style={{
                  ...tdStyleRight,
                  padding: "6px"
                }}
              >
                {amt.toFixed(2)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Display;
