/**
 * @desc this function will generate a hash for the input phrase
 * @author gaurav sharma
 * 
 */
import bcrypt from 'bcrypt';

export default text => new Promise ((resolve, reject) => {
	bcrypt.hash (text, 10, (err, hash) => {
		if (err) return reject (err);
		return resolve (hash);
	});
});