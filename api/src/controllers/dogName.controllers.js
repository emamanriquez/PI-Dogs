const axios = require('axios');
const { Router } = require('express');
const router = Router();

// router.get('/dogs', async(req, res) => {
//     try {
//         const name = await axios.get(URL)
//         const response = name.data;
        
//       const nameDogs = name.data.results.map((t) => t.names);
//       const names = nameDogs.flat()





//       } catch (error) {
//         console.log(error);
//     }

    
//     });

const apiResponse = await axios.get("https://api.thedogapi.com/v1/breeds");
const breedsMap = apiResponse?.data.map((breed) => {
    const height = breed?.height["imperial"].split(" - ");
    const weight = breed?.weight["imperial"].split(" - ");
    const temperament =
      breed?.temperament !== null && breed?.temperament !== undefined
        ? breed?.temperament?.split(",")?.map((el) => el.trim())
        : ["No Temperament"];
    return {
      id: uuidv4().toString().toUpperCase().substring(0, 6),
      name: breed.name.toLowerCase(),
      image: breed?.image.url,
      temperament: temperament,
      min__height: parseInt(height[0])
        ? parseInt(height[0])
        : parseInt(height[1]),
      max__height: parseInt(height[1])
        ? parseInt(height[1])
        : parseInt(height[0]),
      min__weight: parseInt(weight[0])
        ? parseInt(weight[0])
        : parseInt(weight[1]),
      max__weight: parseInt(weight[1])
        ? parseInt(weight[1])
        : parseInt(weight[0]),
      life__span: breed.life_span,
    };
  });

  // Ingreso a la DB
  breedsMap?.map(async (dog) => {
    const newBreed = await Breed.create(dog);
    dog?.temperament?.map(async (t) => {
      const temperament = await Temperament.findOrCreate({
        where: {
          temperament: t.toLowerCase()
        },
        defaults: {
          temperament: t.toLowerCase(),
        }
      })
      await newBreed.addTemperament(temperament[0].id)
    })
  });
    







      module.exports = router;
