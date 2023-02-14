// var MD5 = require("crypto-js/md5");
// const name = MD5(
//   1 +
//     "43398cd2c921ac523b546d6d31791fb015300573" +
//     "8fc6f978258fe23fb428f93d3a84e90c"
// ).toString();
// console.log(name);

var response; // create a variable to hold the response from the API
var favItem = []; // create an empty array to hold favorite items
var getfavItem = JSON.parse(localStorage.getItem("favItem")); // get favorite items from local storage and parse it as JSON

// if there are favorite items, assign them to favItem array, otherwise keep it as an empty array
favItem = getfavItem ? [...getfavItem] : [];

// create an asynchronous function to fetch data from API
const fetchApiHandeler = async () => {
  let searchItem = document.getElementById("searchItem").value; // get the search item value from the input field

  // create the URL with the search item value and API key
  let url = `https://gateway.marvel.com:443/v1/public/characters?name=${searchItem}&ts=1&apikey=8fc6f978258fe23fb428f93d3a84e90c&hash=6f9f5d9b79f33bf48fe66627f30100c1`;
  let body = await fetch(url); // fetch data from the URL
  response = await body.json(); // convert the response to JSON and assign it to the response variable

  // if the response code is 409, display an error message
  if (response.code == 409) {
    document.getElementById("main").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("message").innerHTML =
      "Please enter something before search!!";
  }
  if (response.data.count) {
    const filteredData = favItem.filter(
      (item) => item.id === response.data.results[0].id
    );

    // if the response count is greater than 0, display the data on the page
    if (filteredData.length > 0) {
      document.getElementById("FavButtonLink").innerHTML = "Already Added";
      document.getElementById("FavButtonLink").disabled = true;
    } else {
      document.getElementById("FavButtonLink").innerHTML = "Add to favorites";
      document.getElementById("FavButtonLink").disabled = false;
    }
    document.getElementById("main").style.display = "block";
    document.getElementById("error").style.display = "none";
  } else {
    document.getElementById("main").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("message").innerHTML =
      "You have entered wrong name!!";
  }

  // display the character image, title, and description on the page
  document.getElementById("img").src =
    response.data.results[0].thumbnail.path +
    "/portrait_xlarge." +
    response.data.results[0].thumbnail.extension;
  document.getElementById("title").innerHTML = response?.data?.results[0]?.name
    ? response?.data?.results[0]?.name
    : "Not Found";
  document.getElementById("discription").innerHTML = response?.data?.results[0]
    ?.description
    ? response?.data?.results[0]?.description
    : "Not Available";
  document.getElementById("urlLink").href =
    response?.data?.results[0]?.urls[0]?.url;
};

// This function adds an item to the favItem array, sets the favItem array in local storage,
// and filters the array to get the data that matches the id of the first item in the response array.
function favStorage() {
  favItem.push(response.data.results[0]);
  localStorage.setItem("favItem", JSON.stringify(favItem));
  console.log("button clicked");
  const filteredData = favItem.filter(
    (item) => item.id === response.data.results[0].id
  );

  // if item with matching ID is found, disable the favorite button
  if (filteredData.length > 0) {
    document.getElementById("FavButtonLink").innerHTML = "Already Added";
    document.getElementById("FavButtonLink").disabled = true;
  } else {
    document.getElementById("FavButtonLink").innerHTML = "Add to favorites";
    document.getElementById("FavButtonLink").disabled = false;
  }
  getFavCount();
}

// This function retrieves the favItem array from local storage, counts the number of items, and updates the display of the favorite count.
function getFavCount() {
  document.getElementById("favCount").innerHTML = JSON.parse(
    localStorage.getItem("favItem")
  ).length;
}
getFavCount(); // Call getFavCount() function to update the display of the favorite count on page load.
