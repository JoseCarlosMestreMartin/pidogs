import React from "react";
import style from "./Paginate.module.css";

export default function Paginate({ cantDogsPerPage, cantDogs, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cantDogs / cantDogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={style.navContainer}>
      <ul className={style.ulContainer}>
        {
            pageNumbers && pageNumbers.map(e => (
                <li className={style.liContainer} onClick={() => paginado(e)} key={e}>
                    <button type="button">{e}</button>
                </li>
            ))
        }
      </ul>
    </nav>
  );
}
