# roverChallenge
Installation process
==========================================

This project includes two directories, one for the backend (main) and an input mechanism in the form of a 
UI in which you can put the instructions in to be processed.

The main project is developed using node js, an express server, and mongo db. Please follow the instructions
below to install and run.

Environment Requirements (Please install the following)
===========================================================
1.) Node js
2.) NPM
3.) MongoDB

back-end
========================
1.) run "npm install" in in this directory to install the dependencies.
2.) run "initialise.js" to initialise the project.
3.) run "server.js" to get the project up, and running. 
4.) the project is running through port "9091"

UI
========================
1.) run "npm install" in in this directory to install the dependencies.
2.) run "server.js" to get the project up, and running. 
3.) enter "http://localhost:9090" to get access to the input UI

POST MAN
=========================
You may also use the "Post Man Software" to input data.

1.) Use the following URL: "http://localhost:9091/moveRover"
2.) The request type/method must be "POST"
3.) The body must be raw, and select the JSON(application/json) option
4.) Input example is as follows.

{
	"position":"1 2 N",
	"instruction": "RMMLMRMM"
}


