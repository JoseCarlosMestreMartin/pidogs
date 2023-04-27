import React, { useState } from "react";
import styles from "./FilterAndOrder.module.css";

const FilterAndOrder = () => {
  const [temperamento, setTemperamento] = useState("");
  const [esCreado, setEsCreado] = useState(false);
  const [ordenarPor, setOrdenarPor] = useState("raza");

  const handleTemperamentoChange = (event) => {
    setTemperamento(event.target.value);
  };

  const handleEsCreadoChange = (event) => {
    setEsCreado(event.target.checked);
  };

  const handleOrdenarPorChange = (event) => {
    setOrdenarPor(event.target.value);
  };

  const handleResetClick = () => {
    setTemperamento("");
    setEsCreado(false);
    setOrdenarPor("raza");
  };

  const handleAplicarClick = () => {
    // Aquí iría la lógica para aplicar los cambios
    console.log("Temperamento:", temperamento);
    console.log("Es creado:", esCreado);
    console.log("Ordenar por:", ordenarPor);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Filtrado de perros</h1>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="temperamento">Temperamento:</label>
          <input
            type="text"
            id="temperamento"
            name="temperamento"
            value={temperamento}
            onChange={handleTemperamentoChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="esCreado">Es creado:</label>
          <input
            type="checkbox"
            id="esCreado"
            name="esCreado"
            checked={esCreado}
            onChange={handleEsCreadoChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ordenarPor">Ordenar por:</label>
          <select
            id="ordenarPor"
            name="ordenarPor"
            value={ordenarPor}
            onChange={handleOrdenarPorChange}
            className={styles.select}
          >
            <option value="raza">Raza (A-Z)</option>
            <option value="-raza">Raza (Z-A)</option>
            <option value="temperamento">Temperamento (A-Z)</option>
            <option value="-temperamento">Temperamento (Z-A)</option>
          </select>
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={handleResetClick}>
            Volver al estado inicial
          </button>
          <button type="button" onClick={handleAplicarClick}>
            Aplicar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterAndOrder;
