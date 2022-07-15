function createfn() {
    // clear the body of the page in case we were called from search()
    document.getElementById('main-container').innerHTML = "";

    // create container element
    var container = document.createElement("div");
    container.className = "container-fluid";
    container.id = "button-container";

    // read in our data file
    fetch("https://gist.githubusercontent.com/JumperTheHero/fb7d53e0f0bfbd8138d36f23e694ebc6/raw/")
        .then(response => response.text())
        .then(data => {
            // create an array from the data
            data = data.slice(data.indexOf('\n') + 1)
                    .split('\n')
                    .map(v => v.split(','));

            // for each row in the data, create a button
            data.forEach(row => {
                var button = document.createElement("a");
                button.className = "btn btn-primary";
                button.href = "displayImage.html?image=" + row[1];
                button.innerHTML = row[0];
                container.appendChild(button);
            });
        });

    // place our new container of buttons into the page
    document.getElementById('main-container').appendChild(container);
}

function search() {
    // clear out the container of buttons
    document.getElementById('main-container').innerHTML = "Searching...";

    // create container element
    var container = document.createElement("div");
    container.className = "container-fluid";
    container.id = "button-container";

    // read in our data file
    // TODO: UPDATE TO JUMPER'S GIST.
    fetch("https://gist.githubusercontent.com/JumperTheHero/fb7d53e0f0bfbd8138d36f23e694ebc6/raw/")
        .then(response => response.text())
        .then(data => {
            var searchValue = document.getElementById("input").value;

            if (searchValue == "") {
                createfn();
                return;
            }

            // create the buttons from the data
            data = data.slice(data.indexOf('\n') + 1)
                    .split('\n')
                    .map(v => v.split(','));

            // initialise our arrays
            names = [];
            recipes = [];

            data.forEach(row => {
                // get the names of each recipe
                names.push(row[0]);
            });

            // search for the recipes
            searchResults = fuzzysort.go(searchValue, names);

            // for each result, match the recipe image
            searchResults.forEach(result => {
                data.forEach(row => {
                    if(row[0] == result.target) {
                        recipes.push([row[0], row[1]]);
                    }
                });
            });

            // for each found recipe, create a button
            recipes.forEach(row => {
                var button = document.createElement("a");
                button.className = "btn btn-primary";
                button.href = "displayImage.html?image=" + row[1];
                button.innerHTML = row[0];
                container.appendChild(button);
            });

            // clear the body of the page
            document.getElementById('main-container').innerHTML = "";

            // if no results, show error
            if(recipes.length == 0) {
                document.getElementById('main-container').className = "container-fluid";
                document.getElementById('main-container').innerHTML = "No results found 😰";
            } else {
                // place our new container of buttons into the page
                document.getElementById('main-container').appendChild(container);
            }
        });
}

// when the window loads, execute the creation of the buttons
createfn();