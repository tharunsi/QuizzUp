import React from "react";
import { TailSpin } from "react-loader-spinner";

const Spinner = ({ height = 50, width = 50, color = "#4fa94d" }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <TailSpin height={height} width={width} color={color} ariaLabel="loading" />
    </div>
  );
};

export default Spinner;