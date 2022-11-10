import React from "react";
import styles from "./ButtonRegular.module.css";

function ButtonRegular({ children, handleClick, customClass }) {
  return (
    <button
      className={`${styles.btnRegular} ${customClass}`}
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default ButtonRegular;
