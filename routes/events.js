const express = require('express')
const { getEvents, createEvent, updateEvent, deleteEvent } = require( "../controlers/events" )
const { validarCampos } = require( "../middlewares/validar-campos" )
const { validarJWT } = require( "../middlewares/validar-jwt" )
const { check } = require( 'express-validator' )
const { isDate } = require( '../helpers/isDate' )

const router = express.Router()

router.use(validarJWT)

// Obtener eventos
router.get('/', getEvents)

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'The title is obligatory').not().isEmpty(),
        check('start', 'Please use a valid start date').custom(isDate),
        check('end', 'Please use a valid end date').custom(isDate),

        validarCampos,
    ],
     createEvent)

// Actualizar evento
router.put(
    '/:id',
    [
        check('title', 'The title is obligatory').not().isEmpty(),
        check('start', 'Please use a valid start date').custom(isDate),
        check('end', 'Please use a valid end date').custom(isDate),

        validarCampos,
    ],
    updateEvent)

// Borrar evento
router.delete('/:id', deleteEvent)

module.exports = router