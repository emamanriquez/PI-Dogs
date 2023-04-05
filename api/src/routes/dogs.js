const express = require('express');
const router = express.Router();
const { dogName } = require('../controllers/dogName.controllers');

router.get('/dogs', dogName)
router.get('/dogs/:idRaza')
router.get('/dogs/name="...."')

router.post('/dogs',)











module.exports = router;