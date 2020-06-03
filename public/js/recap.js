// Make API calls to get recipes based on their preferences using Spoonacular
// Category - randomize throughout the week; pick three

// FourSquare API to get stores nearby so they can buy ingredients

// Read and set environment variables
require("dotenv").config();

const request = require("request");

request(
  {
    url: "https://api.foursquare.com/v2/venues/explore",
    method: "GET",
    qs: {
      client_id: process.env.FOURSQUARE_ID,
      client_secret: process.env.FOURSQUARE_SECRET,
      ll: "40.7243,-74.0018",
      // change ll value to near: (city,State)
      // https://developer.foursquare.com/docs/api-reference/venues/search/
      categoryId: "52f2ab2ebcbc57f1066b8b46",
      v: "20180323",
      limit: 10
    }
  },
  function (err, res, body) {
    if (err) {
      console.error(err);
    } else {
      console.log(body);
    }
  }
);
