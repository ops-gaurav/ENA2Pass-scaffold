import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import path from 'path';
import flash from 'connect-flash';
import passport from 'passport';
import { secretString } from './constants';
import ActivateRoutes from './routes/';

const app = express();

app.use (bodyParser.json());
app.use (morgan ('dev'));
app.use (express.static (path.resolve ('dist')));
app.use (session ({ secret: secretString, resave: true, saveUninitialized: true }));
app.use (bodyParser.urlencoded ({ extended: false }));
app.use (passport.initialize ());
// app.use (passport.session ());
app.use (flash ());

// call this to activate routes or define inside the route directory
ActivateRoutes (app);

app.get ('/', (req, res) =>  res.sendFile (path.resolve ('dist/index.html')));

app.listen (3000);