import express from 'express'
import jwt from 'jsonwebtoken'
import { signup } from '../controllers/signup.js'
import { signin } from '../controllers/signin.js'
import { getusers } from '../controllers/getusers.js'

const router = express.Router()

// Opem Route - Public Route
router.get('/', (req, res) => {
	res.status(200).json({ msg: 'Bem Vindo a nossa API!' })
}) 

// Private Route
router.get('/user/:id', checkToken, getusers )

function checkToken(req, res, next) {

	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (!token) {
		return res.status(401).json({msg: 'Não autorizado!'})
	}

	try {

		const secret = process.env.SECRET

		jwt.verify(token, secret)

		next()
	} catch(error){
		res.status(400).json({msg: 'Sessão Invalida'})
	}
}

// Register User
router.post('/auth/register', signup)

// Login User
router.post('/auth/login', signin)

export {
	router
}