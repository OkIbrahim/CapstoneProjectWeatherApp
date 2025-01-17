import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const apiKey = 'cc64d77627200fc7891204b60dfeac34';

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/weather', async (req, res) => {
    const cityName = req.body.cityName;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        res.render('weather.ejs', { weather: weatherData });
    } catch (error) {
        res.render('weather.ejs', { weather: null, error: 'Error, please try again' });
    }
});

app.listen(port, () => {
    console.log(`Weather app is live on port ${port}`);
});