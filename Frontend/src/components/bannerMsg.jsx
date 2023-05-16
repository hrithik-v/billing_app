import React from "react";
function BannerMsg(props) {
  const styles = {
    // display: "block",
    width: "100vw",
    boxSizing: "border-box",
    paddingLeft: "15px",
    position: "fixed",
    color: "white",
    backgroundColor: props.color
  };

  return (
    <>
      <div style={styles} id="bannerMsg">
        <p>{props.message}</p>
      </div>
    </>
  );
}

export default BannerMsg;
