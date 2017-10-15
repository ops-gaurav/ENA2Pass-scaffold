import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/';
import { generateToken, decodeToken } from '../utility/';

/**
 * serialize the generated access token
 */
passport.serializeUser ((token, done) => done (undefined, token));
/**
 * deserialize the generated token
 */
passport.deserializeUser ((token, done) => {
	const payload = decodeToken (token);
	done (undefined, payload);
});
/**
 * define the local authentication
 */
passport.use (new LocalStrategy (( username, password, done ) => {
	const isEmail = (username.indexOf ('@') !== -1) ? true : false;
	UserModel.authenticate ({ username: isEmail ? undefined : username, email: isEmail? email: undefined, password })
		.then (response => {
			if (response.matched && response.user) {
				// implement jwt here
				// do not send the user.. send token instead
				const user = { name: response.user.name, email: response.user.email, username: response.user.username};
				const token = generateToken (user);
				// console.log (token)
				return done (undefined, token);
			}
		}).catch (err => done (null, false, { message: 'Username/password is incorrect '}));
}));

export default passport;