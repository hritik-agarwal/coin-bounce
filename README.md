# coin-forum

It is essentially a cryto blog page with following features :-
* It showcases recent news related to crypto, blockchain by fetching data from NewsAPI.
* It also uses another api from coingecko to fetch recent market prices of cryptocurrencies sorted in order of their market cap.
* It has authentication feature which allows users to log in and write their own blogs and also comment on blogs written by others.
* For the tech stack it uses React for frontent, Node for Backend and MongoDB for database.

## Screenshots

<img src="https://drive.google.com/uc?export=view&id=1Ae1ChMMFDRp-ZgW1Z4y0hHekCpSxeUo7" />
<img src="https://drive.google.com/uc?export=view&id=1SQZbXyN8JHw1-6-BS0Tp6e8zyh5E39ph" />
<img src="https://drive.google.com/uc?export=view&id=1c7YEtQEoD95caEafsj2HX1buHbF6PQv7" />
<img src="https://drive.google.com/uc?export=view&id=1lXntYdRyOpaPR_qtbK733flEWsLvcQU_" />

#### Note: If screenshots are not loading, try reloading the site.

## To test the project in Local 

1. Create .env files in both frontend and backend

a. backend .env file
  * Create mongodb account, then create a project and add the respective credentials below (refer youtube/mongo documents)
  * to generate access and refresh token, run node in terminal and then use require('crypto').randomBytes(64).toString('hex')
  * Go to cloudinary and its respected credentials
```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ygalda6.mongodb.net/<database>?retryWrites=true&w=majority
ACCESS_TOKEN_SECRET=<access_token>
REFRESH_TOKEN_SECRET=<refresh_token>
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
```
b. frontend .env file
  * go to newsapi and get your api key
```env
REACT_APP_INTERNAL_API_PATH=http://localhost:4000
REACT_APP_NEWS_API_KEY=<news_api_key>
```
2. Run backend and frontend in seperate terminal
```
// to run backend
npm install
npm run dev

// to run frontend
npm install
npm run start
```
