import React from "react";
import Main from "./main";
import { Provider } from "react-redux";
import { Store } from "./redux-store/store";

function Index() {
  return (
    <>
      <Provider store={Store}>
        <div className="parentBox">
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
              New Invoice
            </h3>
          </div>
          <Main />
        </div>
      </Provider>
    </>
  );
}

export default Index;
