const routes = require('express').Router();
const {validate} = require('../controllers/clientController')

routes.post('/',validate);

module.exports = routes