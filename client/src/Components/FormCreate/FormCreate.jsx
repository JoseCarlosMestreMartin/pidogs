import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./FormCreate.module.css";
import validate from "./validate";
import { postDog } from "../../redux/actions";

export default function FormCreate() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    image:
      "https://www.shutterstock.com/image-vector/cute-fun-dog-cartoon-260nw-350881304.jpg",
    name: "Droopy",
    heightMin: 0.01,
    heightMax: 0.3,
    weightMin: 1,
    weightMax: 4,
    lifeSpanMin: 7,
    lifeSpanMax: 8,
    temperament: "Stubborn, Curious, Playful",
  });
  const [errors, setErrors] = useState({
    image: "",
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeSpanMin: "",
    lifeSpanMax: "",
    temperament: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors(validate({ ...form, [e.target.name]: e.target.value }));

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !errors.image &&
      !errors.name &&
      !errors.heightMin &&
      !errors.heightMax &&
      !errors.weightMin &&
      !errors.weightMax &&
      !errors.lifeSpanMin &&
      !errors.lifeSpanMax &&
      !errors.temperament
    ) {
      dispatch(postDog(form));
      //alert("Excelente, se creo la nueva raza :) ");

    }else{
      alert("Corriga los datos");
    };
  };

  return (
    <div>
      Este es el FormCreate
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <img src={form.image} alt={`droopy`} with={400} />

        <div className={styles.box}>
          <label>image: </label>
          <input
            name="image"
            type="text"
            value={form.image}
            onChange={handleInputChange}
          />
          {!errors.image ? null : (
            <p className={styles.danger}>{errors.image}</p>
          )}
        </div>

        <div className={styles.box}>
          <label>Name: </label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleInputChange}
          />
          {!errors.name ? null : <p className={styles.danger}>{errors.name}</p>}
        </div>

        <div className={styles.box}>
          <label>heightMin: </label>
          <input
            name="heightMin"
            type="number"
            value={form.heightMin}
            onChange={handleInputChange}
          />
          {!errors.heightMin ? null : (
            <p className={styles.danger}>{errors.heightMin}</p>
          )}
        </div>

        <div className={styles.box}>
          <label>heightMax: </label>
          <input
            name="heightMax"
            type="number"
            value={form.heightMax}
            onChange={handleInputChange}
          />
          {!errors.heightMax ? null : (
            <p className={styles.danger}>{errors.heightMax}</p>
          )}
        </div>

        <div className={styles.box}>
          <label>weightMin: </label>
          <input
            name="weightMin"
            type="number"
            value={form.weightMin}
            onChange={handleInputChange}
          />
          {!errors.weightMin ? null : (
            <p className={styles.danger}>{errors.weightMin}</p>
          )}
        </div>

        <div className={styles.box}>
          <label>weightMax: </label>
          <input
            name="weightMax"
            type="number"
            value={form.weightMax}
            onChange={handleInputChange}
          />
          {!errors.weightMax ? null : (
            <p className={styles.danger}>{errors.weightMax}</p>
          )}
        </div>

        <div className={styles.box}>
          <label>lifeSpanMin: </label>
          <input
            name="lifeSpanMin"
            type="number"
            value={form.lifeSpanMin}
            onChange={handleInputChange}
          />
          {!errors.lifeSpanMin ? null : (
            <p className={styles.danger}>{errors.lifeSpanMin}</p>
          )}
        </div>

        <div className={styles.box}>
          <label>lifeSpanMax: </label>
          <input
            name="lifeSpanMax"
            type="number"
            value={form.lifeSpanMax}
            onChange={handleInputChange}
          />
          {!errors.lifeSpanMax ? null : (
            <p className={styles.danger}>{errors.lifeSpanMax}</p>
          )}
        </div>

        <div className={styles.box}>
          <label>temperament: </label>
          <input
            name="temperament"
            type="text"
            value={form.temperament}
            onChange={handleInputChange}
          />
          {!errors.temperament ? null : (
            <p className={styles.danger}>{errors.temperament}</p>
          )}
        </div>

        <button className={styles.button} type="submit">
          Created
        </button>
      </form>
    </div>
  );
}
