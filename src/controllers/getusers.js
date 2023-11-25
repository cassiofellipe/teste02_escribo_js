
//Models
import { User } from '../models/User.js'

export const getusers = async (req, res) => {

	const id = req.params.id

	// check if usaer exists
	const user = await User.findById(id, '-password')

	if(!user) {
		return res.status(404).json({msg: 'Usuário não encontrado!'})
	}

	res.status(200).json({ user })
}