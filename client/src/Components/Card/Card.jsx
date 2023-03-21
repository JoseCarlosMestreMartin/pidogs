import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({
  image,
  name,
  temperament,
  weightMin,
  weightMax,
  id,
}) {
  return (
    <div className={style.card}>
      <div className={style.cardImg}>
        <img
          className={style.img}
          src={image}
          alt={`of: ${name}`}
          height="300px"
          width="200px"
        />
      </div>

      <div className={`${style.cardInfo}`}>
        <div className={`${style.titleStyle}`}>
          <Link to={"/Detail"}>
            <h3>{name}</h3>
          </Link>
          <h2>{temperament}</h2>
          <h2>
            Weigth: {weightMin} to {weightMax} Kg
          </h2>
        </div>
      </div>
    </div>
  );
}
