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
  /* ROUTE NEEDS TO BE SET UP IN DATABASE*/
  // Will display name of user next to Welcome
  // $.get("/api/user_data").then(function (data) {
  //   $("#memberName").text(data.name);
  // });

  // Placeholder values for user input !!!!! NEED TO BE UPDATED TO DATABASE BY MOVING INTO LINE 21 and setting dietRestrictions to data.dietaryRestrictions
  let dietRestrictions = "peanuts";
  let calories = 2000;
  let dietType = "Gluten Free";

  // Array of objects with recipe id, title, sourceURL
  let mealIdsTitleSource = [];

  // Array of objects with id, img, ingredients, qty
  let recipes = [];

  // Array of objects with final recipes with all information
  let finalRecipes = [];

  /* WILL WORK ONLY IF WE SET UP THE DATABASE */

  // Boolean to check if there is data for the user or not
  // let dataCheck = false;

  // API call to check if there are recipes in the database for the current user
  // $.get("/api/all_recipes")
  //   .then(function (data) {
  // //      for (let i = 0; i < data.length; i++) {
  //         let recipeName = "recipeName" + [i];
  //         $("." + recipeName).text(data[i]["name"]);
  //       }
  //     if (data) {
  //       // placeholders = data;
  //       dataCheck = true;
  //     } else {
  /* ADD ALL BELOW HERE ONE DATABASE IS SET UP */
  //     }
  //   })
  //   .catch(handleLoginErr);

  // API call to generate recipes for the week using user input for calories, diet type, and diet restrictions - needs to be moved inside the else statement above once database is set up
  const queryURL =
    "https://api.spoonacular.com/mealplanner/generate?apiKey=a6bd8b6773734999898939dfaf079624&timeframe=week?targetCalories=" +
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

      let resData = response;
      console.log("RECIPE LIST");
      console.log("RESPONSE", response);
      console.log(mealIdsTitleSource);

      // Find the corresponding ids in the response array of objects with the mealsIdsTitleSource object
      // Add the title and source URL to the response object

      setTimeout(function () {
        for (let i = 0; i < resData.length; i++) {
          console.log(resData[i]);
          for (let j = 0; j < mealIdsTitleSource.length; j++) {
            if (mealIdsTitleSource[j].id === resData[i].id) {
              console.log("MATCH");
              resData[i]["name"] = mealIdsTitleSource[j].title;
              resData[i]["sourceUrl"] = mealIdsTitleSource[j].sourceUrl;
            }
          }
        }
        finalRecipes = resData;
        console.log("FINAL DATA: ");
        console.log(finalRecipes);

        /* THIS WILL ONLY WORK IF DATABASE IS SET UP */
        // sendDataToDatabase();

        // Add recipe names to front-end
        for (let i = 0; i < finalRecipes.length; i++) {
          let recipeName = "recipeName" + [i];
          $("." + recipeName).text(finalRecipes[i]["name"]);
        }

        // Add recipe sourceURL to front-end
        for (let i = 0; i < finalRecipes.length; i++) {
          let recipeSourceURL = "recipeSourceURL" + [i];
          $("." + recipeSourceURL).attr(
            "onclick",
            "window.open('" + finalRecipes[i]["sourceUrl"] + "', '_blank');"
          );
        }

        // Add img to front-end
        for (let i = 0; i < finalRecipes.length; i++) {
          let recipeImg = "recipeImg" + [i];
          $("." + recipeImg).attr("src", finalRecipes[i]["img"]);
        }

        // Add ingredients to bottom of page
        for (let i = 0; i < finalRecipes.length; i++) {
          let allIngredients = finalRecipes[i]["ingredients"];

          let newIngredientDiv = $("<div>");
          let newIngredientClass = "ingredientDiv" + i;
          newIngredientDiv.addClass("uk-grid-small");
          newIngredientDiv.addClass("uk-grid");
          newIngredientDiv.addClass(newIngredientClass);
          newIngredientDiv.removeClass("uk-grid-stack");
          newIngredientDiv.attr("uk-grid", "");
          $("#ingredientHolder").append(newIngredientDiv);
        }
      }, 2000);
    });
  });

  // Use ids of recipes to get recipe img, ingredients, and quantity
  function getRecipeImgIngredients() {
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < mealIdsTitleSource.length; i++) {
        let queryURLImgs =
          "https://api.spoonacular.com/recipes/" +
          mealIdsTitleSource[i].id +
          "/information?apiKey=a6bd8b6773734999898939dfaf079624";

        $.ajax({
          url: queryURLImgs,
          method: "GET"
        }).then(function (response) {
          let ingredients = [];
          let qty = [];

          for (let i = 0; i < response.extendedIngredients.length; i++) {
            ingredients.push(response.extendedIngredients[i].name);
            qty.push(response.extendedIngredients[i].amount);
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

// Send final object to database - WILL ONLY WORK WHEN DATABASE IS SET UP
// function sendDataToDatabase() {
//   for (let i = 0; i < finalRecipes.length; i++) {
//     $.post("/api/addData", {
//       recipeId: finalRecipes[i].id,
//       imgUrl: finalRecipes[i].img,
//       ingredients: finalRecipes[i].ingredients,
//       name: finalRecipes[i].name,
//       qty: finalRecipes[i].qty,
//       sourceUrl: finalRecipes[i].sourceUrl
//     })
//       .then(function (data) {
//         // If there's an error, handle it by throwing up a bootstrap alert
//         console.log("Added to database");
//       })
//       .catch(handleLoginErr);
//   }
// }
