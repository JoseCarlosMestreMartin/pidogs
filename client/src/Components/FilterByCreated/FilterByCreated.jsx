import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByCreated } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function filterByCreated({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [flagToFilter, setFlagToFilter] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("dentro de submit del filter by temperament");

    dispatch(filterByCreated(true));
    setCurrentPage(1);
    navigate("/home");
  };

  return (
    <div>
      <form>
        <input type="text" onChange={handleInput} placeholder={textToFilter} />
        <button type="submit" onClick={handleSubmit}>
          Filter by temperament
        </button>
      </form>
    </div>
  );
}
