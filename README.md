# Web API Development Back End Demonstration Code

#### Current Status


| API Layer                                | Completed?             |
|------------------------------------------|------------------------|
| Routing                                  | Yes                    |
| DB Integration                           | Yes                    |
| Schema-Based Validation                  | Yes                    |
| User Authentication                      | Yes                    |
| User Permissions                         | Yes                    |
| HATEOAS Compliance                       | Yes                    |
| Search / Pagination / Partial Responses  | Yes                    |
| Caching / ETags                          | Yes                    |
| OpenAPI Specification                    | Yes                    |
| Static code documentation (JSDoc)        | Yes                    |
| Test Suites                              | Yes                    |
| Code linting/formatting (ESLint)         | Yes                    |


## About
Trading Licence Limitied

The project was build by using a NodeJs server which uses Express framework. The database was created with mysql

In order to run this project please install the required packages and follow the steps here and the example files.

------------------------------------------------------------------------------------------------------------------------------

In the project directory, you can run:
npm install - To install all necessary packages
npm run server - To start the server

Once you use npm run server 
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
This project also uses ESlint which will show any errors in the terminal

------------------------------------------------------------------------------------------------------------------------------------------------

The tests were done by using Jest and SuperTest. You can run the test by running the npm run test  Command which should launch the tests in the terminal
API documention - OpenAPI

The application provides with an user interface supported by OpenApi, where all end-points can be tested. 
To find out more information please open open http://localhost:8080/coursework-submission/docs/openapi/index.html to view it in the browser.