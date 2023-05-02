import React, { useState } from "react";

import '../dogDetail/dogDetail.css'
import { Link, useParams } from "react-router-dom";
import { getRaceDetail } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function DogDetail (props) {

const dispatch = useDispatch();
const raceDetails = useSelector(state => state.breedDetail);



const {id}=useParams();

/// VER COMO HACER PARA QUE NO ME RENDERICE LA RAZA ANTERIOR       
useEffect(() => {
    dispatch(getRaceDetail(id))
}, [dispatch, id]);
                       
    return (
        <div className='div' key={id}>
          
           
           
           <div>
              <Link to='/home' id="click">
                 <button className="buttonVolverD">VOLVER</button>
              </Link>
           </div> 
{raceDetails.length > 0 ? 
           <div>
               
               <div  >
                   <img src={raceDetails[0].image? raceDetails[0].image :"https://images.pexels.com/photos/3299905/pexels-photo-3299905.jpeg?cs=srgb&dl=pexels-goochie-poochie-grooming-3299905.jpg&fm=jpg"} alt="La imagen no se encuentra" className="imageDetail"/>
               </div>
               <div className="nameDetail">{raceDetails[0].name}</div>



                <div className='temperamentos'>
               <div className="tempNameDetail">Temperamentos: {raceDetails[0].temperament} </div>

               
               </div>

               <div className='pesos'>
               <div className="pesoNameDetail" >Peso: {raceDetails[0].weight}</div>

               
             </div>

                <div className='alturas'>
               <div className="alturaNameDetail">Altura: {raceDetails[0].height} cm  </div>

              
               </div>

               <div className='añosdevida'>
               <div className="liveNameDetail">Años de vida: {raceDetails[0].life_span} </div>

               
                </div>
            </div>
            : <p>Volver a Home</p>
    } </div>
    )
}