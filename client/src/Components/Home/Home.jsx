import React from "react";
import Card from "../Card/Card";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../redux/actions";

import { useState, useEffect } from "react";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDogs());
    setTimeout(() => {
      console.log("fin de espera de 5s");
      //console.log("dogs del seTimer :", dogs);
    }, 5000);
  }, [dispatch]);

  const dogs = useSelector((state) => state.dogs); //traigo las razas para mostrar
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const lastIndex = currentPage * dogsPerPage;
  const firstIndex = lastIndex - dogsPerPage;
  const dogsToPaint = dogs.slice(firstIndex, lastIndex); // luego reemplazar segun el paginado
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log("dogsToPaint :", dogsToPaint);
  console.log("dogs1 :", dogs);

  return (
    <div>
      <div>
        <SearchBar setCurrentPage={setCurrentPage}/> 
      </div>
      <div>
        <Link to="/Form">
          <button>Created a dog</button>
        </Link>
      </div>
      <div className={style.content}>
        
        {dogsToPaint?.map((e) => {
          //validacion que existan los datos
          return (
            <div>
              <Card
                image={e.image}
                name={e.name}
                temperament={e.temperament}
                weightMin={e.weightMin}
                weightMax={e.weightMax}
                id={e.id}
              />
            </div>
          );
        })}

        
      </div>
      <div className={style.pagination}>
        <Paginate
          cantDogsPerPage={dogsPerPage}
          cantDogs={dogs.length}
          currentPage={currentPage}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
