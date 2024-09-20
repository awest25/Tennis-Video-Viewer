import React from "react";
import SearchIcon from "@/public/search"; // Adjust the path as needed
import styles from "../styles/Dashboard.module.css";

const SearchPlaceholder = () => (
  <div className={styles.placeholderContainer}>
    <SearchIcon className={styles.searchIcon} /> <span>{"Search"}</span>
  </div>
);

export default SearchPlaceholder;
