import React from "react";

function LoadingScreen () {
    return (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "black"}}>
         <span style={{
            width: "48px",
            height: "48px",
            border: "5px dotted #FFF",
            borderRadius: "50%",
            display: "inline-block",
            position: "relative",
            boxSizing: "border-box",
            animation: "rotation 2s linear infinite"
         }}></span>
      </div>
    );
  };

  export default LoadingScreen;