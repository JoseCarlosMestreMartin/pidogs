import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import style from "./Detail";
import { Link } from "react-router-dom";

export default function Detail() {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);
  const detail = useSelector((state) => state.detail);

  return (
    <div>
      Este es el Detail de la raza funciona{id}
      <Link to="/Home">
        <button>Home</button>
      </Link>
      <div>
      <div className={style.card}>
      <div className={`${style.imageDiv}`}>
        <img src={image} alt={`of: ${name}`} with={100} />
      </div>
    aqui te q uedaste
      <div className={`${style.cardInfo}`}>
        <div className={style.conteinerFlex}>
          <div className={`${style.name}`}>
            <Link to={`/Detail/${id}`}>
              <h3>{name}</h3>
            </Link>
          </div>
          <div className={style.text}>
            <h3>{temperament}</h3>
            <h3>
              Weigth: {weightMin} to {weightMax} Kg
            </h3>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}
aqui te quedaste