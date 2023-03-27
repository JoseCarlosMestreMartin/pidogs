import React from "react";
import Card from "../Card/Card";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../redux/actions";

import { useState, useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDogs());
    setTimeout(() => {
      console.log("fin de espera de 5s");
      console.log("dogs del seTimer :",dogs);}, 5000);
  }, [dispatch]);

  const dogs = useSelector((state) => state.dogs); //traigo las razas para mostrar
  const dogsToPaint = dogs.slice(0, 16); // luego reemplazar segun el paginado
  console.log("dogsToPaint :", dogsToPaint);
  console.log("dogs1 :",dogs);

  return (
    <div className={style.content}>
      {/* {dogsToPaint.forEach(e => {
        <Card
          image="https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
          name="Affenpinscher"
          temperament="1 temperamento Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
          weightMin={3}
          weightMax={6}
        />;
      })} */}
         {dogsToPaint?.map((e) => {//validacion que existan los datos
          return(
            <div >
              <Card
            image={e.image}
            name={e.name}
            temperament={e.temperament}
            weightMin={e.weightMin}
            weightMax={e.weightMax}
            id={e.id}
          />
            </div>      
          )
        })}
        
          
        

      
      <Card
        image="https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
        name="Affenpinscher"
        temperament="1 temperamento Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
        weightMin={3}
        weightMax={6}
      />
      {/* <Card
    image="https://cdn2.thedogapi.com/images/rkiByec47.jpg"
    name="African Hunting Dog"
    temperament="2do temperamentoWild, Hardworking, Dutiful"
    weightMin={3}
    weightMax={6}

  /> */}
    </div>
  );
}
