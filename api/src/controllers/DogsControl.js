
const axios = require ('axios');
const {Dog, Temperament} = require ('../db')

//GETs

// All and byName
const getAllDogsApi = async () => {
    try {
        const pedidoApi = await axios (`https://api.thedogapi.com/v1/breeds`);
        const dataApi = await pedidoApi.data;
    
        if (dataApi){
            let infoApi = dataApi?.map (el => {
                let weigth1 = '';
                if (el.weight.metric === "NaN") {
                   weigth1 = "27 - 34"
                } else if (el.weight.metric.split(" - ")[0] === "NaN") {
                    weigth1 = "6 - 8"
                } else {
                    weigth1 = el.weight.metric
                }
                return {
                id: el.id,
                name: el.name,
                temperament: el.temperament? el.temperament : 'Perrito sin temperamento',
                weight: weigth1,
                image : el.image.url,
                }
            })
            // console.log(infoApi)
            return (infoApi)
        }
    } catch (error) {
        console.log ('Error en getAllDogsApi')
  }
};


const getAllDogsDB = async () => {
        try {

            let races = await Dog.findAll({
              include: {
                model: Temperament,
                attributes: ["name"], //traigo el nombre de los temperamentos
                through: {
                  attributes: [], //tomo solo lo que queda en el arreglo atributes
                },
              },
            });
            
            let racesStrig = [];
            for (let i=0; i< races.length; i++) {
                var temper = races[i].dataValues.temperaments && races[i].dataValues.temperaments.map(t=> t.name) 
                var temperaments = temper.join(", ")
                let race = {...races[i].dataValues, ["temperament"] : temperaments}
                racesStrig.push(race)

            } 
           
            //  console.log(races)
            return racesStrig
          } catch (error) {
            console.log("Hubo un error en getDbInfo", error)
          }
        };   

const allInfoApiAndDB = async () => { ///ESTA TENGO QUE USAR PARA LA PRÓXIMA RUTA
   try {
       const infApi = await getAllDogsApi ();
       const infDb = await  getAllDogsDB ();
       const allInfo = infApi.concat(infDb);
       return (allInfo)

   }catch (error) {
       console.log ('Error en allInfoApiAndDB')
   } 
}

const getAllDogsAndName = async (req,res ) =>{
try {
    const { name } = req.query;

    const dogs = await allInfoApiAndDB()
    if (name) {
      const fil = dogs.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      fil.length ? res.send(fil) : res.status(404).send({ msg: "not found" });
    } else {
      return res.send(dogs);
    }
  } catch (e) {
    console.log(e);
  }
};




const getDogsForIdDb = async (id) => { 
    try{
        // Me traigo todos los datos de la base de datos
        const resultado = await Dog.findAll({
            where: {
                id: id
            },
            include: Temperament
        })
        // console.log("2", resultado)
        let racesStrig = [];
        for (let i=0; i< resultado.length; i++) {
            var temper = resultado[i].dataValues.temperaments && resultado[i].dataValues.temperaments.map(t=> t.name) 
            var temperaments = temper.join(", ")
            let race = {...resultado[i].dataValues, ["temperament"] : temperaments}
            racesStrig.push(race)

        }         

        const listaDogs = racesStrig.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                life_span: dog.life_span + ' years',
                image: dog.image,
                temperament: dog.temperament, 
            }
        })
       
        return listaDogs;
    }
    catch(err){ 
        console.log(err);
        return err;
    }
}

const getoneByIdApi = async (id) => {
    
    try {
        const allForFilter = await axios (`https://api.thedogapi.com/v1/breeds`);
     if (id) {
        const result = allForFilter.data.filter(e => e.id === Number(id));
        return(result);
    }       

    }catch (error) {
        console.log('Error en oneById')
    }
}

const getById = async (req, res, next) => {
    const {id} = req.params  
    try{
    const allInfoById = await getoneByIdApi(id);
    if (id.length < 4) {
            let infoNecId = allInfoById?.map (el => {
                let weigth1 = '';
                if (el.weight.metric === "NaN") {
                   weigth1 = "27 - 34"
                } else if (el.weight.metric.split(" - ")[0] === "NaN") {
                    weigth1 = "6 - 8"
                } else {
                    weigth1 = el.weight.metric
                }
                return {
                    image: el.image.url,
                    name: el.name,
                    temperament: el.temperament? el.temperament : 'Perrito sin temperamento',
                    weight: weigth1,
                    height: el.height.metric,
                    life_span: el.life_span
                }
            })
            infoNecId.length === 0?
            res.status(404).send ('No se encontró el perrito requerido, intentelo de nuevo'):
            res.send (infoNecId)
        } else {
            let infoDbById = await getDogsForIdDb (id);
            console.log (infoDbById)            
            return res.json(infoDbById)
        }
    } catch (error) {
        next (error)
    }

};

//POST 
const createNewRace = async (req, res) => {
    try{
        const { name, height, weight, life_span, image, temperament, createdInDb } = req.body;
        const temperamentDB = await Temperament.findAll({
          where: { name: temperament },
        });
        
        const newRace = await Dog.create({
          name,
          height,
          weight,
          life_spam: life_span, 
          image,
          createdInDb
        });
        
        await newRace.addTemperament(temperamentDB);
        
        return res.status(200).send({ msg: "successfully created" });
    }catch (error) {
        res.status(400).json(error.message)
    }

};

// const createNewRace = async (req, res) => {
//     try{
//         const {name, height,weight,life_span, image, temperament, createdInDb } = req.body;
//         const newRace = await Dog.create({
//            name,
//            height,
//            weight,
//            life_span,
//            image,
//            createdInDb
//         })
//         const temperamentDB = await Temperament.findAll({
//                 where: { name: temperament },
//               })
            
//       await newRace.addTemperament(temperamentDB) 
    
//       return res.status(200).send({ msg: "successfully created" });
//     }catch (error) {
//         res.status(400).json(error.message)
//     }

// };


module.exports = {
    getAllDogsAndName, 
    getById, 
    createNewRace
}