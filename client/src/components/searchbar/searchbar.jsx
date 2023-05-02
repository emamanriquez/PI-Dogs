import React from "react";
import './searchbar.css'
import { searchForName } from "../../Redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";



export default function Searchbar () {

const dispatch = useDispatch();
const [name, setName] = useState ('');

function handleInputChange (e) {
   setName (e.target.value);
}

function handleSubmit (e) {
    e.preventDefault()
    dispatch (searchForName(name))
    setName('')
    
}

    return (
        <div>
           <div className="buttom">
              <button type="submit" onClick={handleSubmit} className='btnPatita'></button>

            </div>
           
               <div className='input'>
             <input value={name} onChange={handleInputChange} type="text" placeholder="Buscar por raza.."  className="searchName"/>
             </div>
            
           </div>
        
        
    )

}