const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibmF2aW5oYXJlZSIsImEiOiJja2FnNzBhNjcwMGEyMnhuNGY0c2lvaGExIn0.jR1o1WKbregdZPpj9fNzAA&limit=1`;

    // console.log(url);

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to Geocoding service!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location...change location!!!', undefined);
        } else {
            //callback(undefined, response.body.features[0].center);

            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    })

};

module.exports = geoCode;