const request = require('request');

const forecast = (lat, long, cbf) => {
    const url = `https://api.darksky.net/forecast/27b763b5720f58c1ef38430777c6860c/${lat},${long}?units=si`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            cbf('Unable to connect to weather service', undefined)
        } else if (body.error) {
            cbf('Unable to find location', undefined)
        } else {
            cbf(undefined, `${body.daily.data[0].summary} it is currently ${body.currently.temperature} degrees out. This high today is ${body.daily.data[0].temperatureHighbody.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast;

