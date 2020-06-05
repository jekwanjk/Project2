/* TO DO
------------------------------------------------------------------------------
// Establish connection to Spoonacular with meal planning section using user’s profile created in sign up page
// Call our API route to get the user’s inputs
// Setup API calls to Spoonacular & get following recipe info
// Name of day of week for recipe
// Recipe name
// Recipe type (breakfast, lunch, dinner)
// Recipe image URL (another call)
// Recipe ingredients (another call)
// Recipe info URL
// Recipe Summary
// Send objects of recipes to our database table
// Display recipes using call to our database
*/

$(document).ready(function () {
  // Will save name of user to variable after sign-up form input
  let name = "";

  // Placeholder values for user input
  let dietRestrictions = "peanuts";
  let calories = 2000;
  let dietType = "Gluten Free";

  // Array of objects with recipe id, title, sourceURL
  let mealIdsTitleSource = [];

  // Array of objects with id, img, ingredients, qty
  let recipes = [];

  // Array of objects with final recipes with all information
  let finalRecipes = [];

  // API call to generate recipes for the week using user input for calories, diet type, and diet restrictions
  const queryURL =
    "https://api.spoonacular.com/mealplanner/generate?apiKey=7223b9c04d354ff3b7a4602ff691a66a&timeframe=week?targetCalories=" +
    calories +
    "?diet=" +
    dietType +
    "?exclude=" +
    dietRestrictions;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    // Get ids, name of day, recipe name, info URL, and summary for all Monday
    for (let i = 0; i < 3; i++) {
      mealIdsTitleSource.push({
        id: response.week.monday.meals[i].id,
        title: response.week.monday.meals[i].title,
        sourceUrl: response.week.monday.meals[i].sourceUrl
      });
    }

    // Get ids, name of day, recipe name, info URL, and summary for all Tuesday
    for (let i = 0; i < 3; i++) {
      mealIdsTitleSource.push({
        id: response.week.tuesday.meals[i].id,
        title: response.week.tuesday.meals[i].title,
        sourceUrl: response.week.tuesday.meals[i].sourceUrl
      });
    }

    // Get ids, name of day, recipe name, info URL, and summary for all Wednesday
    for (let i = 0; i < 3; i++) {
      mealIdsTitleSource.push({
        id: response.week.wednesday.meals[i].id,
        title: response.week.wednesday.meals[i].title,
        sourceUrl: response.week.wednesday.meals[i].sourceUrl
      });
    }

    // Get ids, name of day, recipe name, info URL, and summary for all Thursday
    for (let i = 0; i < 3; i++) {
      mealIdsTitleSource.push({
        id: response.week.thursday.meals[i].id,
        title: response.week.thursday.meals[i].title,
        sourceUrl: response.week.thursday.meals[i].sourceUrl
      });
    }

    // Get ids, name of day, recipe name, info URL, and summary for all Friday
    for (let i = 0; i < 3; i++) {
      mealIdsTitleSource.push({
        id: response.week.friday.meals[i].id,
        title: response.week.friday.meals[i].title,
        sourceUrl: response.week.friday.meals[i].sourceUrl
      });
    }

    // Get ids, name of day, recipe name, info URL, and summary for all Saturday
    for (let i = 0; i < 3; i++) {
      mealIdsTitleSource.push({
        id: response.week.saturday.meals[i].id,
        title: response.week.saturday.meals[i].title,
        sourceUrl: response.week.saturday.meals[i].sourceUrl
      });
    }

    // Get ids, name of day, recipe name, info URL, and summary for all Sunday
    for (let i = 0; i < 3; i++) {
      mealIdsTitleSource.push({
        id: response.week.sunday.meals[i].id,
        title: response.week.sunday.meals[i].title,
        sourceUrl: response.week.sunday.meals[i].sourceUrl
      });
    }

    getRecipeImgIngredients().then((response) => {
      // response should be recipes which is an array of objects with id, img, ingredients, qty
      console.log("here");
      console.log("RECIPE LIST");
      console.log(response);
      console.log(mealIdsTitleSource);

      // Find the corresponding ids in the response array of objects with the mealsIdsTitleSource object
      // Add the title and source URL to the response object
      for (let i = 0; i <= response.length; i++) {
        response[i]["name"] = mealIdsTitleSource.find(
          (x) => x.id == response[i].id
        ).title;
        response[i]["sourceUrl"] = mealIdsTitleSource.find(
          (x) => x.id == response[i].id
        ).sourceUrl;
      }
      // Set the final recipes array of objects with all values to global variable
      response = finalRecipes;
    });
  });

  // Use ids of recipes to get recipe img, ingredients, and quantity
  function getRecipeImgIngredients() {
    new Promise(function (resolve, reject) {
      for (let i = 0; i < mealIdsTitleSource.length; i++) {
        let queryURLImgs =
          "https://api.spoonacular.com/recipes/" +
          mealIdsTitleSource[i].id +
          "/information?apiKey=7223b9c04d354ff3b7a4602ff691a66a";

        $.ajax({
          url: queryURLImgs,
          method: "GET"
        }).then(function (response) {
          let ingredients = [];
          let qty = [];

          for (let i = 0; i < response.extendedIngredients.length; i++) {
            ingredients.push(response.extendedIngredients[i].name);
            qty.push(response.extendedIngredients[i].amount);
            // mealImages.push(response.image);
            // mealIngredientsName.push(response.extendedIngredients[i].name);
            // mealIngredientsQty.push(response.extendedIngredients[i].amount);
            // console.log("IMG " + mealImages);
            // console.log("Name " + mealIngredientsName);
            // console.log("Qty " + mealIngredientsQty);
          }

          recipes.push({
            id: mealIdsTitleSource[i].id,
            img: response.image,
            ingredients: ingredients.join(", "),
            qty: qty.join(", ")
          });
        });
      }
      resolve(recipes);
    });
  }
});

// function createObjs() {
//   console.log("IMG " + mealImages);
//   console.log("Name " + mealIngredientsName);
//   console.log("Qty " + mealIngredientsQty);

//   for (let i = 0; i <= 21; i++) {}

// $.post("/api/signup", {
//   email: email,
//   password: password
// })
//   .then(function (data) {
//     window.location.replace("/members");
//     // If there's an error, handle it by throwing up a bootstrap alert
//   })
//   .catch(handleLoginErr);
//   }

// $(".recipeImg1").attr("src", response.week.monday.meals[0].);

// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
// $.get("/api/user_data").then(function (data) {
//   $("#memberName").text(data.name);
// });

// const request = require("request");

// request(
//   {
//     url: "https://api.foursquare.com/v2/venues/explore",
//     method: "GET",
//     qs: {
//       client_id: process.env.FOURSQUARE_ID,
//       client_secret: process.env.FOURSQUARE_SECRET,
//       ll: "40.7243,-74.0018",
//       // change ll value to near: (city,State)
//       // https://developer.foursquare.com/docs/api-reference/venues/search/
//       categoryId: "52f2ab2ebcbc57f1066b8b46",
//       v: "20180323",
//       limit: 10
//     }
//   },
//   function (err, res, body) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(body);
//     }
//   }
// );
