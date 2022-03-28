import React from "react";

function Cell({ children, ...props }) {
  return <td {...props}>{children}</td>;
}

export default Cell;
