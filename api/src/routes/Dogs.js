const {Router} = require ('express');
const {getAllDogsAndName, getById, createNewRace} = require ('../controllers/DogsControl')


const router = Router ();

//GET
router.get ('/get', getAllDogsAndName) //todos y el name por query
router.get ('/:id', getById)
//POST
router.post ('/create', createNewRace)

module.exports = router;