import React from "react";
import style from "./Paginate.module.css";

export default function Paginate({
  cantDogsPerPage,
  cantDogs,
  currentPage,
  paginado,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cantDogs / cantDogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={style.navContainer}>
      <ul className={style.ulContainer}>
        {pageNumbers &&
          pageNumbers.map((e) => {
            if (e == currentPage) {
              return(<li
                className={style.liContainerSelected}
                onClick={() => paginado(e)}
                key={e}
                
              >
                <button type="button"><h1>{e}</h1></button>
              </li>);
            }else{
              return(<li
                className={style.liContainer}
                onClick={() => paginado(e)}
                key={e}
              >
                <button type="button"><h4>{e}</h4></button>
              </li>);
            }
            
          })}
      </ul>
    </nav>
  );
}
