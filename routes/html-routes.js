// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", function (req, res) {
    console.log("get/");
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/recipes");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    console.log("get /login");
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/recipes");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function (req, res) {
    console.log("get/signup");
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/recipes", isAuthenticated, function (req, res) {
    console.log("get/recipes");
    // If the user already has an account send them to the members page
    if (req.user) {
      // res.redirect("/recipes");
      console.log("res.sendFile(recipe)");
      res.sendFile(path.join(__dirname, "../public/recipes.html"));
    }

    return console.log("req.user undefined - sendFile(login)");
    // res.sendFile(path.join(__dirname, "../public/login.html"));
  });
};
