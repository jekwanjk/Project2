$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var fullNameInput = $("input#fullname-input");
  var caloriesInput = $("input#calories-input");
  var addressInput = $("input#address-input");
  var cityInput = $("input#city-input");
  var stateInput = $("input#state-input");
  var zipcodeInput = $("input#zipcode-input");
  var restrictOption = $("#restrict-option option:selected");
  var dietOption = $("#diet-option option:selected");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    console.log("clicked");
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      name: fullNameInput.val().trim(),
      calories: caloriesInput.val().trim(),
      address: addressInput.val().trim(),
      city: cityInput.val().trim(),
      state: stateInput.val().trim(),
      zipCode: zipcodeInput.val().trim(),
      dietaryRestrictions: restrictOption.text(),
      dietType: dietOption.text()
    };
    console.log(userData);
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
    fullNameInput.val("");
    caloriesInput.val("");
    addressInput.val("");
    cityInput.val("");
    zipcodeInput.val("");
    restrictOption.val("");
    dietOption.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", userData)
      .then(function (data) {
        console.log("response data", data);
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(JSON.stringify(err.responseJSON, null, 2));
    $("#alert").fadeIn(500);
  }
});
