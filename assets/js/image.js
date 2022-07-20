function createfn() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const imageURL = urlParams.get('image');
  source = urlParams.get('source');

  //set up our back button
  document.getElementById('navigation').innerHTML = "<div class='container-fluid'><form onsubmit='onenter(); return false;' class='d-flex flex-row mb-3' role='search'><a href='recipes.html?mode=" + source + "' class='btn btn-primary'>←</a><input id='input' class='form-control me-2 p-2' type='search' placeholder='Search' aria-label='Search'><button class='btn btn-outline-success p-2' type='submit'>Search</button></form>";

  // clear the body of the page in case we were called from search()
  document.getElementById('main-container').innerHTML = "";

  // create container element
  var container = document.createElement("div");
  container.className = "container-fluid text-center";

  var image = document.createElement("img");
  image.src = "assets/img/" + imageURL;
  image.style = "max-height: 400px;";
  image.className = "img-fluid";
  container.appendChild(image);

  // place our new container of buttons into the page
  document.getElementById('main-container').appendChild(container);
}

function onenter() {
  console.log("on enter");
  var getUrl = window.location;
  console.log(getUrl);
  var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
  console.log(baseUrl);
  var searchValue = document.getElementById("input").value;
  //window.location.assign("https://www.w3schools.com");
  location.replace(window.location.pathname.slice(0, -18) + "/recipes.html?mode=" + source + "&search=" + searchValue);
}

// when the window loads, execute the creation of the buttons
createfn();