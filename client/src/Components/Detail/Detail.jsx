import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearDetail, getDetail } from "../../redux/actions";
import style from "./Detail";
import { Link } from "react-router-dom";

export default function Detail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const detail = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => dispatch(clearDetail());
  }, [dispatch, id]);

  console.log("________detail: ", detail);
  console.log("_____id: ", id);
  if (detail.id) {
    return (
      <div>
        <Link to="/Home">
          <button>Home</button>
        </Link>
        <div>
          <div className={style.card}>
            <h3>ID: {detail.id}</h3>
            <div className={style.imageDiv}>
              <img src={detail.image} alt={`of: ${detail.name}`} width="80%" />
            </div>
            <div className={style.cardInfo}>
              <div className={style.conteinerFlex}>
                <div className={style.name}>
                  <Link to={`/Detail/${id}`}>
                    <h3>{detail.name}</h3>
                  </Link>
                  <h3>
                    Heigth: {detail.heightMin} to {detail.heightMax} mtrs
                  </h3>
                </div>
                <h3>
                  Weigth: {detail.weightMin} to {detail.weightMax} Kg
                </h3>
                <div className={style.text}>
                  <h3>{detail.temperament}</h3>
                  <h3>
                    {" "}
                    Span {detail.lifeSpanMin} to {detail.lifeSpanMax} years
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/Home">
          <button>Home</button>
        </Link>
        <div>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
}
