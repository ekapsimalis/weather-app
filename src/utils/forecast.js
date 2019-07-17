const fs = require('fs')
const path = require('path')
const request = require('request')

const filePath = path.join(__dirname, 'darkskyapi.txt')
const dataBuffer = fs.readFileSync(filePath)
const data = dataBuffer.toString()

const forecast = (latitude, longitude, callback) => {
    const url ='https://api.darksky.net/forecast/' + data +'/' + latitude + ',' + longitude + '?units=si'

    request({url:url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to resolve location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' There is ' + body.currently.temperature + ' degrees out. There are ' + body.currently.precipProbability * 100 + '% chance of rain. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow)
        }
    })
}

module.exports = forecast