import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByName } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function SearchBar({setCurrentPage}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    e.preventDefault();
    console.log("handreInput");
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    dispatch(filterByName(name));
    setCurrentPage(1);
    navigate("/home");
  };

  return (
    <div>
      <form>
        <input type="text" 
        onChange={handleInput}
        placeholder = "Text to search..." />
        <button type = "submit" onClick={handleSubmit}>"Search"</button>
      </form>
    </div>
  );
}
