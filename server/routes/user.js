/**
 * @desc the routes related to user
 * @author gaurav sharma
 */
import express from 'express';
import passport from '../services/passport';
import { UserController, AuthController } from '../controllers';

const router = express.Router();

/**
 * define the user routes here
 * @param {*} app express instance
 */
export default ( app ) => {
	// TODO implement routes here
	app.post ('/login', passport.authenticate ('local', {}), UserController.loginController);
	app.post ('/logout', AuthController.authRequest, UserController.logoutController);
	
	// get the details of a user based on token
	app.post ('/details', AuthController.authRequest, (req, res) => {
		res.end();
	});
}