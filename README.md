# React-Demo
 An implementation of the official reactjs tutorial -- a browser game of tic-tac-toe

Main branch is the guided portion of the tutorial.
Other branches are the features reccoended in the tutorial, but not given to the user

# Starting a new project
-------------------------------------------------------------
Type the following in the terminal:

npx create-react-app [NAME_OF_PROJECT]

This creates a new folder with the files needed to run a project.
Delete the contents of src/ folder using 

rm -f * (mac, linux)
or 
del *   (windows)

Create an index.js file in src/ (index.css, too but). 
Add following to top of index.js:

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type "npm start" in project folder to start the project.
May need to enter http://localhost:3000 to view project