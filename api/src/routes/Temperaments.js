const {Router} = require ('express');
const {getAllTemperaments} = require ('../controllers/TemperamentsControl');


const router = Router ();

//GET
router.get ('/get', getAllTemperaments)


module.exports = router;