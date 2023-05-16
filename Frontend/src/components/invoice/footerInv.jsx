import React from "react";

function Footer(arr, gstRate) {
  var Total = arr
    .map((i) => {
      return i.qty * i.rate;
    })
    .reduce((Total, i) => {
      return Total + i;
    }, 0)
    .toFixed(2);

  return (
    <>
      {Total > 0 && (
        <div
          style={{
            fontSize: "0.9em",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridArea: "fooInv",
            margin: "6px"
          }}
        >
          <div>
            <p>Total:</p>
            <p>GST:</p>
            <p style={{ fontWeight: "bold" }}>Grand Total:</p>
          </div>
          <div
            style={{
              textAlign: "right"
            }}
          >
            <p>{Total}</p>
            <p>{((gstRate / 100) * Total).toFixed(2)}</p>
            <p style={{ fontWeight: "bold" }}>
              {((1 + gstRate / 100) * Total).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
