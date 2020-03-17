const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs')
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const port = process.env.PORT || 3000;


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views locatoin
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Edward'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Edward'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: '12345',
        title: 'Help',
        name: 'Edward'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error });
        }
    
        forecast(latitude, longitude, (error, data) => {
            if(error) {
                return res.send({ error });
            }
            
            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'edward',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'edward',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`server up on port ${port}`)
});
