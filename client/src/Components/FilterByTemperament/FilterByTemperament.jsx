import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByTemperament } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function FilterByTemperament({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [textToFilter, setTextToFilter] = useState("All");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("dentro de submit del filter by temperament");
    setTextToFilter(e.target.value);
    dispatch(filterByTemperament(e.target.value));
    setCurrentPage(1);
    navigate("/home");
  };

  return (
    <div>
      <form>
        <input type="text"
        placeholder= {textToFilter}/>
        <button type= "submit" onClick={handleSubmit}>Filter by temperament</button>
      </form>
    </div>
  );
}
