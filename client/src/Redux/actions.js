import axios from 'axios';

export const GET_ALL_BREED = 'GET_ALL_BREED';
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT';
export const GET_DETAIL = 'GET_DETAIL';
export const SEARCH_FOR_NAME = 'SEARCH_FOR_NAME';
export const ORDER_FOR_NAME_AZ = 'ORDER_FOR_NAME_AZ';
export const ORDER_FOR_NAME_ZA = 'ORDER_FOR_NAME_ZA';
export const FILTER_CREATE = 'FILTER_CREATE';
export const ORDER_BY_TEMPERAMENT = 'ORDER_BY_TEMPERAMENT';
export const ORDER_BY_PESO_MIN = 'ORDER_BY_PESO_MIN';
export const ORDER_BY_PESO_MAX = 'ORDER_BY_PESO_MAX';
export const POST_BREED = 'POST_BREED';


const RUTA_GET = "http://localhost:3001/dogs/get";
const RUTA_GET_TEMPERAMENT = "http://localhost:3001/temperaments/get";
const RUTA_POST = "http://localhost:3001/dogs/create";


export const getAllRace = () => {
   return async function (dispatch) {
     try {
       let json = await axios.get(RUTA_GET);
       return dispatch({
         type: GET_ALL_BREED,
         payload: json.data,
       });
     } catch (error) {
         throw error;
     }
   };
 };

 export const getRaceDetail = (payload) => async dispatch => {
  
    return await fetch(`http://localhost:3001/dogs/${payload}`)
    .then (respose => respose.json())
    .then (json => dispatch ({type: GET_DETAIL, payload: json} ))
 }
 
 export const getAllTemperaments = () => async dispatch => {
    return await fetch(RUTA_GET_TEMPERAMENT)
       .then(respose => respose.json())
       .then (json => dispatch ({type: GET_TEMPERAMENT, payload: json}))
       
 }
 
 export const searchForName = (payload) => async dispatch => {
    try {
       
     
     return await fetch(`${RUTA_GET}/?name=${payload}`)
       .then (respose => respose.json())
      .then (json => dispatch ({type: SEARCH_FOR_NAME, payload:json}))
   }catch {
      return alert ('No se encontró la raza,intente con otra')
   }
  }

 
 export function postRace(payload) { 
    return async function() {
            const response = await axios.post(RUTA_POST, payload);
            console.log(response)
          return response;
    }
 };
 




 export const orderByNameAz = (payload) =>{
    console.log(payload)
    return {
       type: ORDER_FOR_NAME_AZ,
       payload
    }
 };
 
 export const orderByNameZa = (payload) =>{
    console.log(payload)
    return {
       type: ORDER_FOR_NAME_ZA,
       payload
    }
 };

 export const filterCreated = (payload) => {
    return  {
       type: FILTER_CREATE,
       payload
    }
 };
 
 export const orderByTemperaments = (payload) => {
 console.log(payload)
    return {
       type: ORDER_BY_TEMPERAMENT,
       payload
    }
 };
 
 export const orderByPesoMin = (payload) => {
    console.log(payload)
    return {
       type: ORDER_BY_PESO_MIN,
       payload
    }
 };
 
 export const orderByPesoMax = (payload) => {
    console.log(payload)
    return {
       type: ORDER_BY_PESO_MAX,
       payload
    }
 };