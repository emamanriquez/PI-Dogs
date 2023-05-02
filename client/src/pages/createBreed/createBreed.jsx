import React, { useState } from "react";

import './createBreed.css'
import { Link} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getAllTemperaments, postRace } from "../../Redux/actions";


//validaciones
export function validate (input) {
   let errors = {};
   if (!input.name) {
      errors.name = "Campo requerido"
   }else if (!/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)) {
      errors.name= "Ingrese más de una letra ,la primera letra en Mayúscula, solo letras y números"
   }

   if (!input.heightMin) {
      errors.heightMin = "Campo requerido"
   }else if (!/^[0-9]\d*(\.\d+)?$/.test(input.heightMin)) {
      errors.heightMin = "Solo numeros enteros"
   }else if (input.heightMin < 1) {
      errors.heightMin = "No es un insecto ;)"
   }else if (input.heightMin > 99) {
      errors.heightMin = "No es jirafa ;)"
   }

   if (!input.heightMax) {
      errors.heightMax = "Campo requerido"
   }else if (!/^[0-9]\d*(\.\d+)?$/.test(input.heightMax)) {
      errors.heightMax = "Ingrese solo números enteros"   ///lee el primer numero no el numero entero
   }else if (parseInt(input.heightMax) <= parseInt(input.heightMin)) {
      errors.heightMax = "Debe ser mayor a la altura miníma"
   }else if (input.heightMax > 149) {
      errors.heightMax = "No es jirafa ;)"
   }

//Peso
   if (!input.weightMin) {
      errors.weightMin= "Campo requerido"
   }else if (!/^[0-9]\d*(\.\d+)?$/.test(input.weightMin)) {
      errors.weightMin = "Ingrese solo números enteros"
   }else if (input.weightMin < 1) {
   errors.weightMin = "No es pluma ;)"
   }else if (input.weightMin > 100) {
   errors.weightMin = "Ni que fuese elefante ;)"
   }

   if (!input.weightMax) {
      errors.weightMax = "Campo requerido"
   }else if (!/^[0-9]\d*(\.\d+)?$/.test(input.weightMax)) {
      errors.pesoMax = "Ingrese solo números enteros"
   }else if (parseInt(input.weightMax)  <=  parseInt(input.weightMin)) {
   errors.weightMax = "Debe ser mayor al peso minímo"
   }else if (input.weightMax > 130) {
   errors.weightMax= "Ni que fuese elefante ;)"
   }

//Vida acá solo un numero
   if (!input.life_span) {
      errors.life_span = "Campo requerido"
   }else if (!/^[0-9]\d*(\.\d+)?$/.test(input.life_span)) {
      errors.life_span = "Ingrese solo números enteros"
   }else if (input.life_span  <  1) {
   errors.life_span = "Todavía está en la panza?"
   }else if (input.life_span > 29) {
   errors.life_span = "No es tortuga..."
   }


if (!input.temperament.length) errors.temperament = "Debe seleccionar al menos un temperamento"

   return errors
}

export default function NewRace () {

const dogtemperaments = useSelector ((state) => state.temperaments);
const dispatch = useDispatch ();

const [errors, setErrors] = useState ({})

useEffect(() => {
    dispatch(getAllTemperaments())
},[dispatch])

// Inputs 
const [input, setInput] = useState ({
      name: '',
      heightMin: '',
      heightMax :'',
      weightMin: '',
      weightMax: '',
      life_span: '',
      temperament: []
})


const handleInputChange = (e) => {
   // S
   e.preventDefault ();
   setInput ( {
      ...input,
      [e.target.name]: e.target.value
   })
   console.log(input)
   setErrors (validate ({
      ...input,
      [e.target.name]: e.target.value
   })
  );
}

const handleSelect = (e) => {
   let newArray = input.temperament;
   let find = newArray.indexOf(e.target.value);
   
   if (find >= 0) {
       newArray.splice(find, 1)
   } else {
       newArray.push(e.target.value)
   }
   setInput ({
      ...input, 
      temperament: newArray
   })
   setErrors (validate ({
      ...input,
      [e.target.name]: e.target.value
   })
  );

}

const handleSubmit = async (e) =>  {
   e.preventDefault()
   
   if (Object.values(errors).length > 0) {
      alert("Por favor complete la información requerida");
  } else if (
     input.name === '' && 
     input.heightMin === '' && 
     input.heightMax === '' &&
     input.weightMin === '' &&
     input.weightMax === '' &&
     input.life_span === '' &&
     !input.temperament.length) {
     alert("Por favor complete el formulario");}
 else {
   dispatch(postRace(input))
   alert ("Se creo un nueva raza")
   setInput ({
      name: '',
      heightMin: '',
      heightMax :'',
      weightMin: '',
      weightMax: '',
      life_span: '',
      temperament: []
   })
   
 }
}

    return (
        <div>
          
           
           <div>
           <Link to='/home' id="click">
                 <button className="buttonVolver">VOLVER</button>
            </Link>
           </div>   
           
           <div className="imageF">
           
           <div>
              <form className="fondoGris" onSubmit={handleSubmit}>
                  <div className="tituloCrear">CREA TU PROPIA RAZA</div>
                  
                  <div className="cajaname">
                     <label className="textName">Nombre</label>
                     <br/>
                 
                     <div>
                        <input autocomplete="off" className="barraName" placeholder="nombre" type= "text" name="name" value={input.name} onChange={handleInputChange} />
                        {errors.name && (
                           <p className="valNombre"> {errors.name} </p> 
                        )}
                     </div>                 
                  </div>
                  <br/>
                  
                  <div className="cajaAltura">
                     <label className="textAltura">Altura</label>
                     <br/>

                     <div className="ordenAlturaMin">
                     <input autocomplete="off" className="barraAlturaMin" placeholder="min. cm" type= "text" name="heightMin" value={input.heightMin} onChange={handleInputChange}/>
                        {errors.heightMin && (
                           <p className="valAMin"> {errors.heightMin}</p> 
                        )}
                     </div>                 
                     
                    <div className="ordenAlturaMax">
                       <input autocomplete="off" className="barraAlturaMax" placeholder="max. cm" type= "text" name="heightMax" value={input.heightMax} onChange={handleInputChange}/>
                           {errors.heightMax && (
                              <p className="valAMax"> {errors.heightMax} </p> 
                        )}  
                    </div>
                    
                  </div>
                  <br/>

                  <div className="cajaPeso">
                     <label className="textPeso">Peso</label>
                     <br/>
                     
                     <div className="ordenPesoMin">
                     <input autocomplete="off" className="barraPesoMin" placeholder="min. kg" type= "text" name="weightMin" value={input.weightMin} onChange={handleInputChange}/>
                     {errors.weightMin && (
                        <p className="valPMin"> {errors.weightMin} </p> 
                     )}
                    </div>
                    
                    <div className="ordenPesoMax">
                     <input autocomplete="off" className="barraPesoMax" placeholder="max. Kg" type= "text" name="weightMax" value={input.weightMax} onChange={handleInputChange}/>
                     {errors.weightMax && (
                        <p className="valPMax"> {errors.weightMax} </p> 
                     )}
                    </div>
                  
                  </div>
                  <br/>

                  <div className="cajaLife">
                  <label className="textLife">Años de vida</label>
                  <br/>
                  <input autocomplete="off" className="barraLife" placeholder="life" type= "text" name="life_span" value={input.life_span} onChange={handleInputChange}/>
                  {errors.life_span && (
                        <p className="valVida"> {errors.life_span} </p> 
                     )}
                  </div>
                  
                  <div className="cajatemp"> 
                  <select className="selecTemp" onChange={handleSelect} >
                     <option disabled selected>Elegir temperamento/s</option>
                        {dogtemperaments && dogtemperaments.map((dt)=>(
                              <option key={dt.id} value={dt.name}>{dt.name}</option>
                           ))}
                  </select>
                  <div>
                  {errors.temperament && (
                        <p className="valTempe"> {errors.temperament} </p> 
                     )} 
                  </div>
                  
                  <div className="cajaValiTem">
                  <ul className="sinitem"><li> {input.temperament.map(ele => ele + " ,")}</li></ul>
                  </div>
                  
                  </div>

                  <div className="cajaBoton">
                  <button type="submit" className="crear">CREAR</button>
                  </div>
                 
                  </form>
           </div>
           
           </div>       
        
        </div>
    )
}