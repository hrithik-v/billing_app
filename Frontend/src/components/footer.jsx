import React from "react";

const styles = {
  backgroundColor: "rgb(46, 44, 44)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "16px"
};

export default function Footer() {
  return (
    <footer className="footer" style={styles}>
      <p>
        Made by{" "}
        <a
          onMouseOver={(event) => {
            event.target.style.color = "white";
          }}
          onMouseOut={(event) => {
            event.target.style.color = "skyblue";
          }}
          style={{
            all: "unset",
            color: "skyblue",
            textDecoration: "underline",
            cursor: "pointer",
            transition: "color 0.5s ease-in"
          }}
          href="mailto:hrithikverma_co22a4_48@dtu.ac.in"
        >
          Hrithik verma
        </a>
      </p>
      <div
        style={{
          width: "5rem",
          display: "flex",
          justifyContent: "space-between"
        }}
        className="icons"
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/hrithik-v/"
        >
          <img
            style={{
              width: "1.5em"
              // borderRadius: "50%"
              // backgroundColor: "white"
            }}
            src="/staticAssets/linkedin.svg"
            alt="Linkedin"
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/hrithik-v/"
        >
          <img
            style={{
              width: "1.5em",
              borderRadius: "50%"
              // backgroundColor: "white"
            }}
            src="/staticAssets/gitHub.svg"
            alt="GitHub"
          />
        </a>
      </div>
    </footer>
    // </div>
  );
}
