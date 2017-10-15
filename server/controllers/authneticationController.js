/**
 * this module deals with the authentication of the
 * routes
 */
import { decodeToken } from '../utility/';


 export default {
	 /**
	  * call this authenticate every request with middleware
	  */
	 authRequest: ( req, res, next ) => {
		//  console.log (req.query.token);
		 const { authorization } = req.headers;
		 if ( authorization ) {
			// docode the token to check validity
			if (decodeToken (authorization)) return next ();
			res.status (401).send ('Token invalid');
		 } return res.status (401).send ("Unauthorized access");
	 }
 }