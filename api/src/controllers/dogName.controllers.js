const axios = require('axios');
const { Router } = require('express');
const router = Router();
const URL = 'https://api.thedogapi.com/v1/breeds';

router.get('/dogs', async(req, res) => {
    try {
        const name = await axios.get(URL)
        const response = name.data;
        
      const nameDogs = name.data.results.map((t) => t.names);
      const names = nameDogs.flat()





      } catch (error) {
        console.log(error);
    }

    
    });
    







      module.exports = router;
