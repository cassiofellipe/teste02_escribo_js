import mongoose from 'mongoose'

const User = mongoose.model('User', {
	name: String,
	email: String,
	telefones:[{numero:String, ddd:String}],
	password: String
})

export {
	User
}