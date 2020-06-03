const request = require('request');

const forecast = (lat, longt, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=9091190bac527b1e66b7f0a30ba9d8b7&query=${lat},${longt}&units=f`;

    // console.log(url);
    //request(options obj,callback(error,resp)) - syntax of request.
    request({
        url,
        json: true
    }, (error, { //object destructuring - response object destructured to {body}
        body
    }) => {
        if (error) {
            callback('unable to connect to forecast service!!!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, ` ${body.current.weather_descriptions[0]}. It is currently  ${body.current.temperature}  degrees out . It feels like ${body.current.feelslike} degrees out.`);
        }
    })

};

module.exports = forecast;