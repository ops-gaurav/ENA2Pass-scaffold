# NodeJS ES6, Angular 2, Passport Standalone scaffold
This is a standalone scaffold build with es6-scaffolder's Angular 2 + webpack scaffold and adding server code along with. 
# Directory Structure
> - dist : contains build of angular 2 . 
> - server : Contains the backend code. 
> - src : Contains angular 2 frontend code.
> - tests : Contains unit tests.

# Common Actions
1. `npm test` to run the mocha tests in "tests" directory.
2. `npm run configure` run for first time deployment in watch mode.
3. `npm run deploy` first time run and deploy.
4. `npm run build` build the angular 2 code.
5. `npm run start:livedev` run webpack live server on 4500 port. Port can be changed later.
6. `npm start` build the angular code and then start the angular code on port `4500`.
7. `npm run server` run the node server code.
8. `npm run server:dev` run the server in development mode. (Uses nodemon).
9. `server:forever` uses forever module to run script forever as daemon.