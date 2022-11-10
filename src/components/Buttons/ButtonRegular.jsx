import React from "react";
import styles from "./ButtonRegular.module.css";

function ButtonRegular({ children, handleClick }) {
  return (
    <button className={styles.btnRegular} type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

export default ButtonRegular;
