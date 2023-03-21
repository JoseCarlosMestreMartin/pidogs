import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
export default function LandinPage() {
  return <div className={style.background}>
    <Link to="/Home" className={style.button}>
    <h1>Are you ready?...</h1>
    </Link>
    </div>;
}
