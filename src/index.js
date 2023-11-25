import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { app } from './app.js'

// Credencials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
	.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.h8rga4e.mongodb.net/?retryWrites=true&w=majority`,)
	.then(() => {
		app.listen(process.env.PORT || 3000)
		console.log('Conectou ao Banco!')
	})
	.catch((err) => console.log(err))


    