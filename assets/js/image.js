function createfn() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const imageURL = urlParams.get('image');

    // clear the body of the page in case we were called from search()
    document.getElementById('main-container').innerHTML = "";

    // create container element
    var container = document.createElement("div");
    container.className = "container-fluid";

    var image = document.createElement("img");
    image.src = "assets/img/" + imageURL;
    image.style = "height: 500px;";
    container.appendChild(image);

    // place our new container of buttons into the page
    document.getElementById('main-container').appendChild(container);
}

// when the window loads, execute the creation of the buttons
createfn();