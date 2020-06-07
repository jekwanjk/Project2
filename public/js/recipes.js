$(document).ready(function () {

  /* ROUTE NEEDS TO BE SET UP IN DATABASE FOR THIS TO WORK */
  // let dietRestrictions;
  // let calories;
  // let dietType;
  // Will display name of user next to Welcome
  // $.get("/api/user_data").then(function (data) {
  //   $("#memberName").text(data.name);
  //  dietRestrictions = data.dietaryRestrictions;
  //  calories = data.calories; 
  //  dietType = data.dietType;
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

  const queryURL =
    "https://api.spoonacular.com/mealplanner/generate?apiKey=3b438cba7ddc4b5799d460a7b2d7aab7&timeframe=week?targetCalories=" +
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

        // Get all ingredients to add to bottom of page
        let allIngredients = [];
        for (let i = 0; i < finalRecipes.length; i++) {
          allIngredients.push(finalRecipes[i].ingredients);
        }
        console.log("INGREDIENTS" , allIngredients);

        var finalAllIngredients = [].concat.apply([], allIngredients);
        console.log("ALL INGREDIENTS", finalAllIngredients);

        // Get all qtys to add to bottom of page
        let allQty = [];
        for(let i = 0; i < finalRecipes.length; i++){
          allQty.push(finalRecipes[i].qty);
        }

        var finalAllQty = [].concat.apply([], allQty);
        console.log("ALL QTY: ", finalAllQty);

        for(let i = 0; i < finalAllQty.length; i++){
          let newIngredientandQtyLi = $("<li>");
          let newIngredientClass = "ingredientli" + i;
          newIngredientandQtyLi.text(finalAllIngredients[i] + ": " + finalAllQty[i]);
          $("#ingredientsQty").append(newIngredientandQtyLi);
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
          "/information?apiKey=3b438cba7ddc4b5799d460a7b2d7aab7";

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
            ingredients: ingredients,
            qty: qty
          });
        });
      }
      resolve(recipes);
    });
  }
});
