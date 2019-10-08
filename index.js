var axios = require('axios');
var express = require('express');
var cors = require('cors');
var request = require('request');

const app = express();
app.use(cors());
const router = express.Router();
const API_PORT = 3000;
const apiKey = '85f25ffa5ab3017b7273d2a1d0018133';
const queryString = 'The fi';
const includeAdult = false;
const searchMoviewUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${queryString}&page=1&include_adult=${includeAdult}`
// axios.get(searchMoviewUrl)
//     .then(function (response) {
//         console.log(response.data);
//     });


const state = { results: [] };
function getTitles(listOfMovies) {
    //only return the titles
    listOfMovies = Array.from(listOfMovies);

    let listOfTitles = [];
    listOfMovies.forEach(element => {
        listOfTitles.push(element.title);
    });

    return listOfTitles;
}

router.get('/getData', (req, res) => {
    console.log('exec');
    axios.get(searchMoviewUrl)
        .then(function (response) {
            res.setHeader("Access-Control-Allow-origin", "http://localhost:3001");
            console.log(getTitles(response.data.results));
            res.status(200).send({ data: getTitles(response.data.results) });
        });
});

app.use('/api', router);
app.listen(API_PORT, () => console.log(`listening on port : ${API_PORT}`));
// module.exports = app;
