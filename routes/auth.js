const express = require('express')
const router = express.Router()
    
const {crearUsuario, loginUsuario, revalidarToken} = require('../controlers/auth')
const { check } = require( 'express-validator' )
const { validarCampos } = require( '../middlewares/validar-campos' )
const { validarJWT } = require( '../middlewares/validar-jwt' )



router.post(
    '/new',
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 8 caracteres').isLength({min: 8}),
        validarCampos
    ], 
    crearUsuario)

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener mínimo 8 caracteres').isLength({min: 8}),
        validarCampos
    ],
    loginUsuario )

router.get('/renew', validarJWT, revalidarToken)

module.exports = router