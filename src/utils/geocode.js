const fs = require('fs')
const path = require('path')
const request = require('request')

const filePath = path.join(__dirname, 'mapboxapi.txt')
const dataBuffer = fs.readFileSync(filePath)
const data = dataBuffer.toString()

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + adress + '.json?access_token=' + data +'&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode