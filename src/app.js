
// Imports
import { router } from './routes/index.js'
import express from 'express'

const app = express()

// Config JSON response
app.use(express.json())
app.use(router)

export {
	app
}

