// import React, {useEffect,useState} from "react";
// import Card from "./Card";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllRace } from "../../../Redux/actions";


// import { Link } from "react-router-dom";




// export default function Cards () {
//     const dispatch = useDispatch(); //es para usas esa cosntante e ir despachando mis acciones, envía la info al reducer
//     const estadoCard = useSelector(state => state.races); //esta cosntante trae todo lo que está en el estado de races. Ya lo tenemos disponible

    
 
//     useEffect (()=> {                   //trae del estado las razas cuando el componente se monta
//       dispatch (getAllRace())
//     }, [dispatch]) //esta última parate es para que no se genere un bucle infinito de llamados, como no depende de nada el dispatch se lo podría sacar.

//     // ver si puedo agragar una imagen randon para no tenerla que poner en el render del detail
//     return (
       
//        <div>
//            <div className="ordenPaginado">
          
//            </div>
          
//             <div className="ordenCards">
//             {currentCards.map( (dogRace) => {
//                    return (
//                        <div key={dogRace.id} >
//                            <Link to= {"/detail/" + dogRace.id} className="sinlinea">
//                               <Card  image={dogRace.image}  temperament={dogRace.temperament} weight={dogRace.weight} /> 
//                            </Link>
//                        </div>
//                    )}               
//                )}           
//             </div>
       
//         </div>
        
//     );
// };
