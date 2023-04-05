import React, { useState} from "react";
import { useDispatch } from "react-redux";

export default function SearchBar(){
    const dispatch = useDispatch;
    const [ name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        
    };


}