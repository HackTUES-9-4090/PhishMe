import React from "react";
import Image from "./Image.component";

export default function Logo({ size }) {
	return <Image size={size} src="/logo.png" alt="phishme" />;
}
