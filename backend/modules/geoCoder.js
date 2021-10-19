const fetch = require('node-fetch');

const GeoCoder = function(geocoder) {
  this.coordinates = geocoder.coordinates; // coordinates is a list of objects {lattitude: , longitude: }
  this.radius = geocoder.radius;
}

let API_KEY = "Your_API_KEY";
// takes an address in string format and returns a geocoded map containing longitude and latitude
async function getLatitudeLongitude(address) {
    let geocodedAddress = {};
    await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(responseJson => {
      geocodedAddress = responseJson["results"][0]; 
    })
    .catch(error => console.error(error));

    return {
      latitude: geocodedAddress["geometry"]["location"]["lat"],
      longitude: geocodedAddress["geometry"]["location"]["lng"],
    };
}

// geocodes two address then gets the distance between then in kilometers
GeoCoder.getDistanceBetweenAddresses = async (address1, address2) => {
  try {
    let coords1 = await getLatitudeLongitude(address1);
    let coords2 = await getLatitudeLongitude(address2);
    
    console.log("coordinates");
    console.log(coords1);
    console.log(coords2);

    return Math.abs(getDistance(coords1, coords2)) / 1000;
  } catch (err) {
    console.error("Caught geocoder error");
    console.error(err);
    return -1;
  }
}

/** Following two functions credited to StackOverflow: https://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3 */
function rad(x) {
  return x * Math.PI / 180;
};

function getDistance(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meters
  var dLat = rad(p2.latitude - p1.latitude);
  var dLong = rad(p2.longitude - p1.longitude);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meters
};

module.exports = GeoCoder;
