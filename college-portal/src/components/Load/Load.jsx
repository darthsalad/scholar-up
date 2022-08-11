import React from "react";
import { Loader } from "@mantine/core";

const Load = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader size="xl"></Loader>
    </div>
  );
};

export default Load;
