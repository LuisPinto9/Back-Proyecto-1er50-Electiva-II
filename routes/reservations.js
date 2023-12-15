const routes = require('express').Router()
const {save,update,findAll,findId,deleteReservation} = require('../controllers/reservationController')
const check = require("../middelware/auth")

routes.get('/',check.auth,findAll);
routes.get('/:id',check.auth,findId);
routes.post('/',check.auth,save);
routes.patch('/:id',check.auth,update);
routes.delete('/:id',check.auth,deleteReservation)

module.exports = routes