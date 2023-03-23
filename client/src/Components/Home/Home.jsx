import React from "react";
import Card from "../Card/Card";
import style from "./Home.module.css";

export default function Home() {
  return <div className={style.content}>
    <Card
    image="https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
    name="Affenpinscher"
    temperament="1 temperamento Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
    weightMin={3}
    weightMax={6}
  />
     <Card
    image="https://cdn2.thedogapi.com/images/rkiByec47.jpg"
    name="African Hunting Dog"
    temperament="2do temperamentoWild, Hardworking, Dutiful"
    weightMin={3}
    weightMax={6}
  />
  </div>;

}
