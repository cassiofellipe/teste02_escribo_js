import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//Models
import { User } from '../models/User.js'
import { formatdate } from '../utils/formatdate.js'

export const signin = async (req, res) => {

	const {email, password} = req.body

	// validations
	if(!email) {
		return res.status(422).json({ msg: 'O email é obrigatório! ' })
	}

	if(!password) {
		return res.status(422).json({ msg: 'A senha é obrigatória!' })
	}

	//check if user exists 
	const user = await User.findOne({ email: email})

	if(!user) {
		return res.status(401).json({ msg: 'Usuário e/ou senha inválidos!' })
	}

	// check if password math
	const checkPassword = await bcrypt.compare(password, user.password)

	if(!checkPassword) {
		return res.status(401).json({ msg: 'Usuário e/ou senha inválidos!' })
	}

	// Criação do Tokem
	try {
                
		const data = formatdate(Date.now())
		const token = jwt.sign({email: user.email}, process.env.SECRET, {expiresIn: '30m'})
		const result = {
			id: user.id,
			data_criacao: data,
			data_atualizacao: data,
			ultimo_login: data,
			token
		}
        
		res.status(200).json(result)
	} catch(err) {
		console.log(err)

		res.status(500)
			.json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'})

	}
}