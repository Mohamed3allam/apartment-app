"use client";
import React from "react";
import styles from "./styles/loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
}
