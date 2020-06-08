// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log("/api/login");
    console.log("req.user", req.user);
    return res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error

  // ADD USER LOCATION
  app.post("/api/signup", function (req, res) {
    console.log("/api/signup");
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      dietaryRestrictions: req.body.dietaryRestrictions,
      calories: req.body.calories,
      dietType: req.body.dietType,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode
    })
      .then(function (data) {
        console.log("res.json(data)");
        res.json(data);
        //res.redirect(307, "/login");
      })
      .catch(function (err) {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/recipes", function (req, res) {
    console.log("get /api/recipes req.user", req.user);
    if (!req.user) {
      console.log("req.user is undefined");
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Retrieve user data from database
      console.log("db.User.findOne");
      console.log("req.user.id", req.user.id);
      db.User.findOne({
        where: {
          id: req.user.id
        }
      }).then(function (dbUser) {
        console.log("res.json(dbUser)");
        res.json(dbUser);
      });

      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      // console.log("res.json(...req.user)");
      // res.json({
      //   email: req.user.email,
      //   id: req.user.id,
      //   name: req.user.name,
      //   dietaryRestrictions: req.user.dietaryRestrictions,
      //   calories: req.user.calories,
      //   dietType: req.user.dietType,
      //   address: req.user.address,
      //   city: req.user.city,
      //   state: req.user.state,
      //   zipCode: req.user.zipCode
      // });
    }
  });
};
