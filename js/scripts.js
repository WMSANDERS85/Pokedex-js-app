let pokemonRepository = (function () {
    let pokemonList = [];

    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    let modalContainer = document.querySelector("#modal-container");

    const loadingMessage = document.getElementById("loading-message");

    function showLoadingMessage() {
        loadingMessage.style.display = "block";
    }

    function hideLoadingMessage() {
        loadingMessage.style.display = "none";
    }

    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokedex = document.querySelector(".pokemon-list");

        let listitem = document.createElement("li");

        listitem.classList.add('list-group-item');

        let button = document.createElement("button");

        button.innerText = pokemon.name;

        button.classList.add("button-class");

        listitem.appendChild(button);

        pokedex.appendChild(listitem);

        // add an event listner to created buttons. Calls the showDetails function.
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                    console.log(pokemon);
                });
                setTimeout(function () {
                    hideLoadingMessage();
                }, 1000); // Delay in milliseconds (e.g., 1000ms = 1s)
            })
            .catch(function (e) {
                hideLoadingMessage();
                console.error(e);
            });
    }
    function loadDetails(pokemon) {
        showLoadingMessage();
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                // Now we add the details to the item
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                
                // create a forEach loop to iterate through the API object types and display to the user.
                let arrayOfTypes = [];
                details.types.forEach(function (pokemon) {
                    arrayOfTypes.push(pokemon.type.name);
                });
                
                //define a space in between array items
                pokemon.types = arrayOfTypes.join(', ')


                hideLoadingMessage();
            })
            .catch(function (e) {
                hideLoadingMessage();
                console.error(e);
            });
    }

    // create function that prints details to console when called.
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            modalContainer.innerHTML = "";

            let pokemonModal = document.createElement("div");
            pokemonModal.classList.add("modal");

            //adds close button to modal
            let closeButtonElement = document.createElement("button");
            //styles button based on the css modal-close class
            closeButtonElement.classList.add("modal-close");
            //displays button as an X
            closeButtonElement.innerText = "X";
            // listens for button click and executes the hideDetails function if button is clicked.
            closeButtonElement.addEventListener("click", hideDetails);

            //Creates h2 heading
            let titleElement = document.createElement("h2");
            // displays the name of selected pokemon as h2 heading
            titleElement.innerText = pokemon.name;

            // creates paragraph in modal for details to be displayed
            let contentElement = document.createElement("p");
            //details to be displayed in paragraph
            contentElement.innerText = "Height: " + pokemon.height + " Type(s): " + pokemon.types;
            // creates img
            let imageElement = document.createElement("img");
            //defines img source
            imageElement.src = pokemon.imageUrl;

            pokemonModal.appendChild(closeButtonElement);
            pokemonModal.appendChild(titleElement);
            pokemonModal.appendChild(contentElement);
            pokemonModal.appendChild(imageElement);
            modalContainer.appendChild(pokemonModal);

            modalContainer.classList.add("is-visible");
        });
    }

    // create a function that will hide the modal
    function hideDetails() {
        modalContainer.classList.remove("is-visible");
    }

    // Allows modal to be closed when the ESC key is pressed.
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
            hideDetails();
        }
    });
    // Listens for when area outside of the modal is clicked. If area outside modal is clicked the hideDetails function will run.
    modalContainer.addEventListener("click", (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideDetails();
        }
    });

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        hideDetails: hideDetails,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
