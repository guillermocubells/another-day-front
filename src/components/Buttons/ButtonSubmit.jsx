import React from "react";
import styles from "./ButtonSubmit.module.css";

function ButtonSubmit({ children }) {
  return (
    <button className={styles.btnSubmit} type="submit">
      {children}
    </button>
  );
}

export default ButtonSubmit;
