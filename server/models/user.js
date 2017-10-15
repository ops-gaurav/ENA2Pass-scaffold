/**
 * @desc this document defines the mongoose schema for user 
 * @author gaurav sharma
 */
import mongoose from 'mongoose';
import { mongoDevelopment, mongoProduction } from '../constants';
import { Promise as es6Promise } from 'es6-promise';
import { hashGenerator, hashCompare } from '../utility/';
import { userSchema } from './schemas/';

const url = process.env.NODE_ENV === 'production' ? mongoProduction : mongoDevelopment;

mongoose.Promise = es6Promise;
mongoose.connect (url);

const UserModel = mongoose.model ('User', userSchema);

const User = {
	/**
	 * check if a username exists
	 * valid params are username, email, phone but all are not required
	 * query is built based on search criterial. Could use this as global
	 * look function.
	 */
	exists: ({ username, email, phone }) => new Promise ((resolve, reject) => {
		if ( username || email || phone ) {
			const query = {$or: [{username: username ? username: ''}, {email: email ? email: ''}, {phone: phone ? phone: ''}]};
			UserModel.findOne (query, (err, user) => {
				if (err) {
					return reject (err);
				}
				if (user) return resolve (true);
				return resolve (false);
			});
		}else
		return reject ({ code: 100, message: 'Missing required properties' });
	}),

	/**
	 * use this model to register the new user
	 * @return Promise resolving or rejecting the request
	 */
	register: ({ name, phone, username, email, password }) => new Promise ((resolve, reject) => {
		if (name && phone && username && email && password) {
			// const query = UserModel.where ({ username: username });
			const query = {$or: [{username: username}, {email: email}, {phone: phone}]};
			UserModel.findOne (query, (err, user) => {
				if (err) {
					return reject (err);
				}
				if (user) {
					return reject ({ code: 101, message: 'user already exists'});
				}
				// register the new user by encrypting the password
				hashGenerator (password).then (hash => {
					new UserModel ({
						name:name,
						phone: phone,
						username: username,
						email: email,
						password: hash
					}).save().then(() => {
						return resolve ("success");
					});
					
				}).catch (err => {
					return reject (err);
				})
			})
		} else{
			return reject ({ code: 100, message: 'Missing required properties' });
		}
	}),

	/**
	 * callback to authenticate the username/email and password combination
	 */
	authenticate: ({ username, email, password }) => new Promise ((resolve, reject) => {
		if ((username || email) && password) {
			const condition = username ? { username: username } : { email: email };
			const query = { condition, password: password };
			// console.log (...query);
			UserModel.findOne (condition, (err, user) => {
				// console.log (user);
				if (err) return reject (err);
				else if (user) {
					const fetchedPassword = user.password;
					hashCompare ( password, fetchedPassword ).then ( matched => {
						return matched ? resolve ({matched: true, user}): reject ({matched: false, user: undefined})
					}).catch (err => {return reject (err) });
				} else return reject ({matched: false, user: undefined});
			})
		} else {
			return reject ({ code: 100, message: 'Missing required parameter' });
		}
	}),

	/**
	 * getting a user by username, email or phone
	 */
	find: ({ username, email, phone }) => new Promise ((resolve, reject) => {
		if (username || email || phone) {
			const query = {$or: [{username: username ? username : ''}, {email: email ? email : ''}, {phone: phone ? phone : ''}]};
			UserModel.findOne (query, (err, user) => {
				return err ? reject (err) : user ? resolve (user) : resolve (undefined) 
			})
		} else {
			return reject ({ code: 100, message: 'Missing required parameter' });
		}
	}),

	/**
	 * find a contact by username or return all contacts if no contact name
	 * is provided.
	 * // TODO finish this
	 */
	findContact: ({ user, contactName }) => new Promise ((resolve, reject) => {
		if ( contactName ) {
			// find by contact name
			const query = { name: { $regex: contactName, $options: 'i' } };
			UserModel.findOne ( query, (err, contact) => {
				
			});
		} else {
			// return all
			UserModel.findOne ()
		}
	})
};

export default User;