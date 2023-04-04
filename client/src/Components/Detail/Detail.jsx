import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import style from "./Detail";
import { Link } from "react-router-dom";

export default function Detail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const detail = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  console.log("________detail: ",detail);
  console.log("_____id: ",id);
  if (detail) {
    return (
      <div>
        Este es el Detail de la raza id: {id}
        <Link to="/Home">
          <button>Home</button>
        </Link>
        <div>
          <div className={style.card}>
            <div className={style.imageDiv}>
              <img src={detail.image} alt={`of: ${detail.name}`} with={100} />
            </div>
            <div className={style.cardInfo}>
              <div className={style.conteinerFlex}>
                <div className={style.name}>
                  <Link to={`/Detail/${id}`}>
                    <h3>{detail.name}</h3>
                  </Link>
                </div>
                <div className={style.text}>
                  <h3>{detail.temperament}</h3>
                  <h3>
                    Weigth: {detail.weightMin} to {detail.weightMax} Kg
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
  }else{
    return (
      <div>
        cargando raza id: {id} ...
        <Link to="/Home">
          <button>Home</button>
        </Link>
        <div>
              <h1>Cargando...</h1>          
        </div>
      </div>
    );
  
  }
  }
