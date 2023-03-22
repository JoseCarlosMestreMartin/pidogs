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
      <div className={`${style.imageDiv}`}>
        <img src={image} alt={`of: ${name}`} with={100} />
      </div>

      <div className={`${style.nameInfo}`}>
        <Link to={"/Detail"}>
          <h3>{name}</h3>
        </Link>
      </div>
      <div className={`${style.cardInfo}`}>
      
          <h3>{temperament}</h3>
          <h3>
            Weigth: {weightMin} to {weightMax} Kg
          </h3>
      
      </div>
    </div>
  );
}
