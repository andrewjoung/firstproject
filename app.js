
let looper = 0
let j = 0;
let username;

let database = firebase.database()

// database.ref("/accounts").set({
//   name: 12
// });



// Checks Username upon registering. Will return either true or false
let checkUserName = () => {
  let driver;
  let firstName = $("#registerFirstName").val()
  let lastName = $("#registerLastName").val()
  let email = $("#registerEmail").val()
  let password = $("#registerPassword").val()
  let address = $("#registerAddress").val()
  let city = $("#registerCity").val()
  let state = $("#registerState").val()
  let phone = $("#registerPhone").val()
  let userName = $("#registerUserName").val()
  let license = $("#registerLicense").val()
  let MPG = $("#registerMPG").val()
  let make = $("#registerMake").val()
  let model = $("#registerModel").val();
  let year = $("#registeryear").val();
  if($('input[name="checkbox"]').is(":checked")){
    driver = true;

  }

  else{
    driver = false
  }



  setUsername(userName)

  if (firstName === "" || lastName === "" || email === "" || password === "" || address === "" || city === "" || state === "" || phone === "" || userName === "") {
    document.getElementById("submit-button").disabled = true;

    $(".container").attr("id", "shake-me")
    $("#change-title").text("Please fill all fields")
    $("#change-title").css("color", "red")
    $("#transfer-button").attr("href", "#")

    setTimeout(function () {
      // document.getElementById("sign-in").disabled = false
      $(".container").attr("id", "")


    }, 1000)
    setTimeout(function () {
      document.getElementById("submit-button").disabled = false;
      $("#change-title").css("color", "#1DB954")
      $("#change-title").text("Sign Up")
    }, 2000)
  }

  else {


    let count = 0;
    let looper = 0;

    database.ref("accounts").on("value", function (data) {

      looper++

      let value = data.val()
      console.log(data.val())
      let keysArray = Object.keys(value);

      for (var i = 0; i < keysArray.length; i++) {

        if (keysArray[i] === userName) {

          console.log("checked")
          count = 1
        }
      }

      if (count === 0) {
        // console.log("pushing")

        database.ref("accounts").child(userName).push({

          firstName: firstName,
          lastName: lastName,
          username: userName,
          email: email,
          password: password,
          address: address,
          city: city,
          state: state,
          phone: phone,
          license: license,
          carMake: make,
          carModel:model,
          MPG: MPG,
          year:year,
          driver:driver




        })

        window.location.href = "index.html"
        // console.log($("#transfer-button")[0])

        // console.log("looping")
      }

      else if (count === 1 && looper === 1) {
        // document.getElementById("sign-in").disabled = true
        document.getElementById("submit-button").disabled = true;

        $(".container").attr("id", "shake-me")
        $("#change-title").text("Username is Unavailable")
        $("#change-title").css("color", "red")
        $("#transfer-button").attr("href", "#")





        //Reset all text fields to empty
        $("#registerEmail").val('')
        $("#registerPassword").val('')
        $("#registerAddress").val('')
        $("#registerCity").val('')
        $("#registerState").val('')
        $("#registerPhone").val('')
        $("#registerUserName").val('')
        $("#registerFirstName").val('')
        $("#registerLastName").val('')
        setTimeout(function () {
          // document.getElementById("sign-in").disabled = false
          $(".container").attr("id", "")


        }, 1000)
        setTimeout(function () {
          document.getElementById("submit-button").disabled = false;
          $("#change-title").css("color", "#1DB954")
          $("#change-title").text("Sign Up")
        }, 2000)
      }
    })
  }
}

//main sign in page function


let checkSignIn = () => {

  let userSignIn = $("#userName").val().trim()
  let userPassword = $("#user-password").val().trim()



  database.ref("accounts").on("value", function (data) {
    let keys = Object.keys(data.val());
    console.log(keys)
    for (var i = 0; i < keys.length; i++) {
      // console.log(keys)
      // console.log(userSignIn)
      if (userSignIn == keys[i]) {

        database.ref("accounts").child(userSignIn).on("value", function (data) {
          let userKeysArray = Object.keys(data.val())
          console.log(data.val()[userKeysArray[0]].password)
          console.log(userPassword)

          if (userPassword == data.val()[userKeysArray[0]].password) {
            console.log("loading correctly")
            window.location.href = "landingPage.html"

          }

        })
      }

    }
    setTimeout(function () {
      document.getElementById("sign-in").disabled = true;
      $(".container").attr("id", "shake-me")
      $("#change-title-sign-in").text("Incorrect Username Or Password")
      $("#change-title-sign-in").css("color", "red")
      $("#transfer-button").attr("href", "#")
      $("#userName").val('')
      $("#user-password").val('')

      setTimeout(function () {
        $(".container").attr("id", "")
        // document.getElementById("sign-in").disabled = false


      }, 1000)
      setTimeout(function () {
        document.getElementById("sign-in").disabled = false;
        $("#change-title-sign-in").css("color", "#1DB954")
        $("#change-title-sign-in").text("Sign Up")


      }, 2000)
    }, 500)
  })
}









//start of next part of function, put ins ame function due to asyncrhonous check






$("#submit-button").on("click", function () {

  checkUserName()

})


$("#sign-in").on("click", function () {

  checkSignIn()


})

let checkedDriver = () => {

  if (j === 0) {
    $(".input-hidden").css({ "position": "static", "opacity": "1", "transition": "opacity 1s linear" })
    j = 1
  }
  else if (j === 1) {
    $(".input-hidden").css({ "position": "absolute", "opacity": "0", "transition": "opacity 0.00001s linear" })
    j = 0;
  }



}

// function initialize() {
//   var input = document.getElementById('search-text-field');
//   new google.maps.places.Autocomplete(input);
// }

// google.maps.event.addDomListener(window, 'load', initialize);

let setUsername = (username) => {
  localStorage.setItem("username", username);
}

let fillUserName = () => {
  $("#userName").val(localStorage.getItem("username"))
}

fillUserName()


// $("#driverSubmitRide").on("click", function(){
//   console.log("working")
//   username = localStorage.getItem("username")
//   let time = $("#departureTime").val().trim();
//   let range = $("#pickupRange").val().trim();
//   let seats = $("#availableSeats").val().trim();

//   database.ref("drivers").child(username).set({
//     time:time,
//     range:range,
//     seats:seats
//   })
// })







