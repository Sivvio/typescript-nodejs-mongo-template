# Typescript NodeJS Server Template

## Setup
Install the dependencies with the following command
```shell
$ npm install
```

## Running the server
To run the server in dev mode run
```shell
$ npm start
```

## Environment Variables
To add an environment variable, add it to the .env file. 
To inject the variables inside the application, find /config/config.ts.
Edit the Config interface with the newly added variable and perform
the necessary checks inside initConfig(). 

To get the values in your code just call:
```js
global.appConfig.yourconfig
```

## Writing integration tests
Make sure the .env.test file is up to date. The test framework uses
that file to set environment variables.

Create a __test__ folder inside your routes folder, create a test for every 
endpoint.

You can change the behaviour of tests by editing the file 
/test/setup.ts

## Running tests
To watch tests (ideal for TDD) run the command
```shell
$ npm test 
```
