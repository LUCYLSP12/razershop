import React from "react";
import s from "./Button.module.css";
export const Button = ({ children, ...otherProps }) => {
  return (
    <button {...otherProps} className={s.btn}>
      {children}
    </button>
  );
};
