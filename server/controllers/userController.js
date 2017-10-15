/**
 * this module contains the route controller middlewares
 * related to user
 */

 export default {
	 /**
	  * to be called just after passport succeeds in authenticating
	  * the user.
	  */
	loginController: ( req, res, next ) => {
		res.send (req.user)
	},
	/**
	 * invalidate the session token and move the route to root /
	 */
	logoutController: ( req, res, next ) => {
		console.log (req.headers);
		req.logout();
		req.session.destroy();

		res.redirect ('/');
	}
 };