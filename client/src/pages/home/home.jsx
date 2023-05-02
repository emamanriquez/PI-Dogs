import '../home/home.css';
import {  useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import {getAllRace, getAllTemperaments, orderByNameAz, orderByNameZa, filterCreated,orderByTemperaments, orderByPesoMin, orderByPesoMax,  } from '../../Redux/actions';
import Card from '../home/Card/card';
import Searchbar from '../../components/searchbar/searchbar';
import { Link } from 'react-router-dom';
import Paginacion from '../../components/paginado/paginado';


export default function Home() {

const state = useSelector((state) => state.breed);
const dogtemperaments = useSelector ((state) => state.temperaments);
const dispatch = useDispatch();
  
useEffect (()=> {                   //me trae todas las razas
  dispatch (getAllRace())
  dispatch(getAllTemperaments())
}, [dispatch]) 


const [order, setOrder] = useState('')
const [page, setPage] = useState(1);

 
//paginacion
    
const [currentPage, setCurrentPage] = useState(1);
const [couPerPage] = useState(8);
const indexlast = currentPage * couPerPage; // devuelve 8
const indexFirst = indexlast - couPerPage; // 0
const allpages = state.slice(indexFirst, indexlast);


const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
};



function hadleClick (e) {
    e.preventDefault ();
    dispatch(getAllRace())
};

function handleSortName(e){ 
    if(e.target.value === "Asc"){
        e.preventDefault ();
        dispatch (orderByNameAz(e.target.value));
        setPage (1);
        setOrder (`Ordenado ${e.target.value}`)
    }else if(e.target.value === "Desc"){
        e.preventDefault ();
        dispatch (orderByNameZa(e.target.value));
        setPage (1);
        setOrder (`Ordenado ${e.target.value}`)
    }else{
        
    }
}


function handleSortPeso(e){
    if(e.target.value === "Min"){
        e.preventDefault ();
        dispatch (orderByPesoMin(e.target.value));
        setPage (1);
        setOrder (`Ordenado ${e.target.value}`)
    }else if(e.target.value === "Max"){
        e.preventDefault ();
        dispatch (orderByPesoMax(e.target.value));
        setPage (1);
        setOrder (`Ordenado ${e.target.value}`)
    }else{
       
    }
}

function handleFilterCreated (e) {
    dispatch(filterCreated (e.target.value))
}

function handleTemperaments (e) { 
 console.log(e)
   dispatch(orderByTemperaments(e.target.value))

}




return (
    <div className='containergeneral1'>
       <div>  
       <Searchbar/>
        </div>
        <Paginacion dogs={state.length} couPerPage={couPerPage} paginado={paginado}/>
        <div className='crearraza'>
            
        <Link className="sinlinea" to='/create' id="click">
       
        <div className="textCrear"> CREAR RAZA</div>
        </Link>
        <button className="botonRefresh" onClick={hadleClick} >Volver a cargar todas las razas</button>
      </div>
      <div className="ubicaTodos">
            <select  onChange={(e) => handleSortName (e)} className="ordenalf" defaultValue="All">
                <option Value='All' selected="selected" hidden="hidden">Ordenar por orden alfabético</option>
                <option Value= 'Asc'>A-Z</option>
                <option Value= 'Desc'>Z-A</option>
            </select>
            <select onChange={handleSortPeso}  className="peso" defaultValue="Min">
                <option selected="selected" hidden="hidden">Ordenar por peso</option>
                <option Value="Min">Min-Max</option>
                <option Value="Max">Max-Min</option>
            </select>  
            <select onChange={ (e) =>handleTemperaments (e)} className="temperamentofil" >
            <option selected="selected" hidden="hidden">Filtrar por temperamento</option>
            {dogtemperaments.map((t)=>(
                              <option key={t?.id} value={t?.name}>{t?.name}</option>
                           ))}
            </select>
            <select onChange={(e) => handleFilterCreated (e)} className="razafil" defaultValue="All">
                <option value='All' selected="selected" hidden="hidden">Filtrar por raza</option>
                <option value='Existentes'>Existentes</option>
                <option value='Creadas'>Creadas</option>
            </select>           
            </div>  
            <div className='cardtodas'>
{allpages?.map((c)=>(
  <Card id={c?.id} image={c?.image} name={c?.name} temperament={c?.temperament} weight={c?.weight} /> 
))}
    </div>        
     
    </div>
  );
}

