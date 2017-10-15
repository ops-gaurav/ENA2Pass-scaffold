/**
 * this module deals with the encoding and decoding of the generated tokens
 * using jsonwebtoken
 */

 import jwt from 'jsonwebtoken';
 import { secretString } from '../constants';

 /**
  * this will generate the jwt toke for the payload
  * @param {*} payload the data to generate token from
  */
 export const generateToken = payload => jwt.sign ( payload, secretString )

 /**
  * this will decode the input token to the corrsopoonding payload
  * @param {*} token to decode. To be referred from generateToken method
  */
 export const decodeToken = token => jwt.verify ( token, secretString, ( err, decoded ) => err ? undefined: decoded);