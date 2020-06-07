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
    console.log("get/login");
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

  // app.get("/recipes", isAuthenticated, function (req, res) {
  //   console.log("get/recipes");
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     // res.redirect("/recipes");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/login.html"));
  // });
};
