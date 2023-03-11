import React from "react";
import styles from "../utils/GlobalStyles.module.css";

function Center(props) {
	return <div className={styles.Center}>{props.children}</div>;
}

export default Center;
