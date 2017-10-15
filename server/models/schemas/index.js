import mongoose from 'mongoose';

export const contactsSchema = new mongoose.Schema({
	name: String,
	contact: Number,
	email: String,
	type: String,
	profile: String
});

export const userSchema = new mongoose.Schema ({
	name: String,
	phone: Number,
	username: String,
	email: String,
	password: String,
	contacts: [contactsSchema]
});