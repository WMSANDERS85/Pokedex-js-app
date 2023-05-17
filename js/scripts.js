let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                // Now we add the details to the item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types[0];
                hideLoadingMessage();
            })
            .catch(function (e) {
                hideLoadingMessage();
                console.error(e);
            });
    }

    // create function that prints details to console when called.
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
