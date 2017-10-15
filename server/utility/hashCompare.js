/**
 * @desc this function will compare the input with the hash
 * @author gaurav sharma
 * 
 */
import bcrypt from 'bcrypt';

export default (text, hash) => new Promise ((resolve, reject) => {
	bcrypt.compare (text, hash, (err, compare) => {
		if (err) return reject (err);
		return resolve (compare);
	})
});