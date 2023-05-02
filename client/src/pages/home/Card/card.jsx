import React from 'react'
import '../Card/card.css';
import { Link } from 'react-router-dom';


export default function Card ({id,image, name, temperament,weight}) {
  return (
      <div className='cardperro'>
         <div>
            
            <div className='containergeneral'>
                
                <div className='container1'>
        <Link to={`/dogs/${id}`}>
            <p className='p' >{name}</p>

        </Link>
                   <img className='breedimage' src= {image} alt = "breed.img" width='250px' />
                      {/* <div className='namedog'>{name}</div> */}
                </div>
                
               
                
                <div className='container2'> 

                      <div className='nameTemp'>TEMPERAMENTS: {temperament}</div>
                         {/* <div className='textotemp'>{temperament}</div> */}
                  
                
                   
                
                </div>
                   <div className='container3'>
                      <div className='numpeso'>PESO: {weight}kg</div>
                        
                   </div>
             
             </div>
         
          </div>
       
       </div>
      
  )
}
