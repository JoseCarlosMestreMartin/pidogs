import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByTemperament } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function FilterByTemperament({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [textToFilter, setTextToFilter] = useState("All");
  const navigate = useNavigate();
  
  const handleInput = (e) => {
    e.preventDefault();
    
    setTextToFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("dentro de submit del filter by temperament");
   // setTextToFilter(e.target.value);
   console.log("textToFilter",textToFilter);
    dispatch(filterByTemperament(textToFilter));
    setCurrentPage(1);
    navigate("/home");
  };

  return (
    <div>
      <form>
        <input type="text"
        onChange={handleInput}
        placeholder= {textToFilter}/>
        <button type= "submit" onClick={handleSubmit}>Filter by temperament</button>
      </form>
    </div>
  );
}
