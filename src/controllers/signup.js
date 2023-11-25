import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//Models
import { User } from '../models/User.js'
import { formatdate } from '../utils/formatdate.js'

export const signup = async (req, res) => {    
	const {name, email, telefones, password, confirmpassword} = req.body

	//validations
	if(!name) {
		return res.status(422).json({ msg: 'O nome é Obrigatório!' })
	}

	if(!email) {
		return res.status(422).json({ msg: 'O email é obrigatório! ' })
	}

	if(!telefones) {
		return res.status(422).json({ msg: 'O telefone é obrigatório! ' })
	}

	if(!password) {
		return res.status(422).json({ msg: 'A senha é obrigatória!' })
	}

	if(password !== confirmpassword) {
		return res.status(422).json({ msg: 'As senhas não conferem' })
	}

	// Check if user exists
	const userExist = await User.findOne({ email: email})

	if(userExist) {
		return res.status(422).json({ msg: 'Email já Cadastrado' })
	}

	// Create password
	const salt = await bcrypt.genSalt(12)
	const passwordHash = await bcrypt.hash(password, salt)

	// create user
	const user = new User({
		name,
		email,
		telefones,
		password: passwordHash,
	})

	try {

		const userdata = await user.save()
		const data = formatdate(Date.now())
		const token = jwt.sign({email: userdata.email}, process.env.SECRET, {expiresIn: '30m'})
		const result = {
			id: userdata.id,
			data_criacao: data,
			data_atualizacao: data,
			ultimo_login: data,
			token
		}
		res.status(201).json(result)

	} catch(error) {

		console.log(error)

		res.status(500)
			.json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'})
	}
}
