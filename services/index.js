'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config')

function createToken(user) {
    const payload = {
        sub: user._id,
        //indica en que momento fue creado el token
        iat: moment().unix(),
        //indica en que momento expira el token
        exp: moment().add(14, 'days').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
    //utilisamos promesas de forma nativa
    const decoded = new Promise((resolve, reject) => {
        try {
            //mandamos a llamar la funcion decode de jwt
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            //COMPROBAMOS SI ES EL TOKEN VALIDO
            if (payload.exp <= moment().unix()) {
                resolve({
                    status:401,
                    message: 'El token ha expirado'
                })
            }
            //de lo contrario si el token es valio entonces contendra el token decodificado
            resolve(payload.sub)

        } catch (err) {
            reject({
                status: 500,
                message: 'token invalido'
            })

        }
    })
    return decoded
}

module.exports ={
    createToken,
    decodeToken
};