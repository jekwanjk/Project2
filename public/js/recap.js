// Make API calls to get recipes based on their preferences using Spoonacular
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=2000&diet=vegetarian&exclude=shellfish%252C%20olives",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "167c3ce9f6msh8d7bb8fbc6d5f58p16260djsn0fddb96bb0f5"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});

// ----------------------------------------------------------------------

// var recipes= {
// 	"timeFrame": "week",
// 	"diet":"vegetarian",
// 	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=2000&diet=vegetarian&exclude=shellfish%252C%20olives",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "167c3ce9f6msh8d7bb8fbc6d5f58p16260djsn0fddb96bb0f5",
//     }
// }
// $.ajax(recipes).done(function(response) {
// 	console.log(response);
// });
// // Category - randomize throughout the week; pick three


// // Whisk API to get stores nearby so they can buy ingredients
