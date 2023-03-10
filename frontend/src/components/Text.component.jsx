import React from "react";
import { textColor } from "../utils/Constants";

function Text({ text, onClick, style, className }) {
  return (
    <p
      className={className ? className : null}
      style={{ color: textColor, ...style }}
      {...{ onClick }}
    >
      {text}
    </p>
  );
}

export default Text;
