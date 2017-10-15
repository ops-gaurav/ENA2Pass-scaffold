/**
 * @desc TDD unit tests for the existing system
 * @author gaurav sharma
 */
import { UserModel } from '../server/models/';
import { hashGenerator, hashCompare, decodeToken, generateToken } from '../server/utility/';
let expect = require ('chai').expect;

const name = "Gaurav Sharma"
const username = "gaurav";
const phone = 9041766560;
const email = "sharma02gaurav@gmail.com";
const password = "password";

describe ('The application tests', () => {

	// # TESTS for user model
	describe ('Tests for user model', function () {
		// this.timeout (10000);

		it ('should insert a new user into the database', done => {
			UserModel.register ({ name, phone, username, password, email}).then (success => {
				expect (success).to.eq ('success');
				done();
			}).catch (err => done(err));
		})

		it ('should check a user exists or not', done => {
			UserModel.exists ({ email }).then (success => {
				expect (success).to.eq (true);
				done();
			}).catch (err => done(err));
		})

		it ('should check the authentication', done => {
			UserModel.authenticate ({ username, password }).then (auth => {
				expect (auth.matched).to.eq (true);
				done ();
			}).catch (err => done (err));
		})

		it ('should find a user from database', done => {
			UserModel.find ({ phone }).then (user => {
				expect (user).to.not.eq (undefined);
				expect (user.name).to.eq (name);
				done();
			}).catch (err => done (err)); 
		})
	})

	/**
	 * Test suites for bcrypt module
	 */
	describe ('Tests for bcrypt module', () => {
		it ('Will compare the input hash with the text', done => {
			hashCompare ('password', '$2a$10$sUY5GKhjwNgbFMgJVMZt..nsq5sMK2EvIT9iZZgAUYwXjyNILv3Ey').then (comparison => {
				expect (comparison).to.eq (true);
				done();
			}).catch (err => done (err));
		})
	})

	describe ('Tests related to JSON WEB TOKENS', () => {
		it ('will generate the jwt token for input payload', done => {
			const token = generateToken ({ name: name });
			// expect (token).to.eq ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2F1cmF2IFNoYXJtYSIsImlhdCI6MTUwNzE0MTAyMiwiZXhwIjoxNTA3MTQyMTYyfQ.35iXQDZ-VZpRQ3hDAtt6xxPzU96xQmAZL68RnSv6tm8');

			const payload = decodeToken (token);
			expect (payload).has.property ('name')

			done();
		})

		it ('should show error for invalid token', done => {
			const invalid = decodeToken ('sfjhrghjrbhjbfj');
			expect (invalid).to.eq (undefined);
			// console.log (invalid);
			done();
		})
	})
})