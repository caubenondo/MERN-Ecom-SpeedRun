# Scalable Ecommerce with MERN
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


    
[Live Demo](https://glacial-lowlands-84709.herokuapp.com/)

  ## Description
  This is an CMS(content management system) for both B2C and B2B. It's build on top of MERN stack and RESTapi. (The app will be converted to GraphQL whenever the foundation put down)

  ## Table of Contents
  * [Installation](#Installation)
  * [Usage](#Usage)
  * [License](#License)
  * [Contributing](#Contributing)
  * [Tests](#Tests)
  * [Questions](#Questions)

  ## Installation <a name='Installation'></a>
  To install necessary dependencies, run the following command:
  ```
    npm i
  ```
  Create your `.env` file at root folder with `NODE_ENV`,`PORT`,`MONGO_URI`, `PAYPAL_CLIENT_ID` and `JWT_SECRET` for environment set up. (save them on MongoDB Atlas as Variables if you prefer working directly on cloud database)
  
  To Seed default data, use: 
  ```
    npm run seed
  ```
  To drop database, use:
  ```
    npm run seed:del
  ```

  To run development, use:
  ```
    npm run dev
  ```

  To deploy use: 
  ```
  npm run build
  ```   

  ## Technologies <a name='Usage'></a>
  - Front end:
    - React
    - React Bootstrap
    - REDUX
    - REDUX devtools extension
    - REDUX thunk
    - React Paypal JS

  - Back End:
    - MongoDB
    - Mongoose
    - Nodejs
    - Express
    - Express async handler
    - Bcrypt
    - JWT
    - Multer
    - REST API as starter
    - GraphQL (Working on it)
    

  
  ## License <a name='License'></a>
  The project is under [MIT](https://opensource.org/licenses/MIT) license.

  ## Contributing <a name='Contributing'></a>
  if you want to contribute to this project, please contact me with the info below.
  - Team:
    - Hai Duong
    - Marshall
    - Patrick
    - Cecelia
    - Richmond

  ## API set up <a name='Tests'></a>
- `/api/users` enpoint
    - `GET` (private, isAdmin) return list of users
    - `POST` (public) create user
    - `/api/users/:id`
        - `PUT` (private, isAdmin) update user
        - `GET` (private, isAdmin) get user
        - `DEL` (private,isAdmin) delete user
    - `/api/users/prifile`
        - `GET` (private) get current user profile
        - `PUT` (private) up profile
    - `/api/users/login` (auth) login
- `/api/products` endpoint
    - `GET` (public) get all products
    - `POST` (private, Admin) post a product
    - `/api/products/:id`
        - `GET` (public) get product by id
        - `DEL` (private, isAdmin) delete specific product
        - `PUT` (private, isAdmin) update product
- `/api/orders`
    - `POST` (private) add order to account
    - `/api/orders/myorders` 
        - `GET` (private) get my orders list
    - `/api/orders/:id`
        - `GET` (pirvate) get 1 oder via id
    - `/api/orders/:id/pay`
        - `PUT` (private) update the payment to paid after assiciate with paypal
    - `MORE TO COME - WORK IN PROGRESS`
  ## Questions <a name='Questions'></a>
  If you have any questions about the repo, open an issue or contact me directly at caubenondo@gmail.com.
  You can find more of my work at [caubenondo](https://github.com/caubenondo)
