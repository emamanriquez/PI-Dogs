const axios = require ('axios');
const {Temperament} = require ('../db')



const getAllTemperaments = async (req, res, netx) => {
  try {
    const pedidoApiAll = await axios (`https://api.thedogapi.com/v1/breeds`);
    const dataApiAll = await pedidoApiAll.data;

    let infoApiTemp = dataApiAll?.map (el => {
            if(!el.temperament) return el.temperament = undefined;
        // A todos los demas los spliteo por ", " para añadirlos a un array en la constante aux
            const aux = el.temperament.split(", "); 
            return aux;
        });
    const ordenSinUnd = infoApiTemp.flat().filter(Boolean).sort();
    const stringUnicos = [...new Set(ordenSinUnd)];    
    

    stringUnicos.map(dog => Temperament.findOrCreate ({
        where : {name: dog}
    }));

    const busquedaDb = await Temperament.findAll();

    res.send (busquedaDb);    
       
  } catch (error) {
      console.log ('no anda getAllTemperaments')
  }
    
};



module.exports =  {
    getAllTemperaments
}