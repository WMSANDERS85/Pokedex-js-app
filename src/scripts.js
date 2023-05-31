let pokemonRepository = (function () {
    let pokemonList = [];

    function filterPokemons(query) {
        return pokemonList.filter(function (pokemon) {
          let pokemonLowerCase = pokemon.name.toLowerCase();
          let queryLowerCase = query.toLowerCase();
          return pokemonLowerCase.startsWith(queryLowerCase);
        });
      }

    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    let modalContainer = document.querySelector("#exampleModal");

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
        let pokedex = document.querySelector('.pokemon-list');

        let listitem = document.createElement('li');

        listitem.classList.add('col');

        let button = document.createElement('button');

        button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);;

        button.classList.add('button-class');

        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');

        let pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.imageUrlFront;
        button.appendChild(pokemonImage);

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
                let promises = json.results.map(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                    // Call loadDetails here for each pokemon
                    return loadDetails(pokemon);
                });
                // Wait for all the Pokemon details to load before hiding the loading message
                return Promise.all(promises);
            })
            .then(function () {
                // Hide the loading message after all the Pokemon details have loaded
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
                pokemon.imageUrlFront = details.sprites.front_default;
                pokemon.imageUrlBack = details.sprites.back_default;
                pokemon.height = details.height;
                pokemon.weight = details.weight;
                
                
                // create a forEach loop to iterate through the API object types and display to the user.
                let arrayOfTypes = [];
                details.types.forEach(function (pokemon) {
                    arrayOfTypes.push(pokemon.type.name);
                });
                
                //define a space in between array items
                pokemon.types = arrayOfTypes.join(', ')

                let arrayOfAbilities = [];
                details.abilities.forEach(function (ability) {
                    arrayOfAbilities.push(ability.ability.name);
                });

                pokemon.abilities = arrayOfAbilities.join(', ')


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
            

            let modalBody = $('.modal-body');
            let modalTitle = $('.modal-title');
            let modalHeader = $('.modal-header');

            modalTitle.empty();
            modalBody.empty();

            let nameElement = $('<h1>' + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + '</h1>');

            let imageElementFront = $('<img class="modal-img" style="width: 50%">');
            imageElementFront.attr("src", pokemon.imageUrlFront);

            let imageElementBack = $('<img class="modal-img" style="width:50%>');
            imageElementBack.attr("src", pokemon.imageUrlBack);

            let heightElement = $("<p>" + "Height : " + pokemon.height + "</p>");

            let weightElement = $("<p>" + "Weight : " + pokemon.weight + "</p>");

            let typesElement = $("<p>" + "Types : " + pokemon.types + "</p>");

            let abilitiesElement = $("<p>" + "abilities : " + pokemon.abilities + "</p>");

            modalTitle.append(nameElement);
            modalBody.append(imageElementFront);
            modalBody.append(imageElementBack);
            modalBody.append(heightElement);
            modalBody.append(weightElement);
            modalBody.append(typesElement);
            modalBody.append(abilitiesElement);
            
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        filterPokemons: filterPokemons,
    };
})();


let inputField = document.querySelector('input[type="search"]');

function removeList() {
  let pokedex = document.querySelector('.pokemon-list');
  pokedex.innerHTML = '';
}

function showErrorMessage(message) {
  let pokedex = document.querySelector('.pokemon-list');
  pokedex.innerHTML = `<li>${message}</li>`;
}

function addListPokemon(pokemon) {
  pokemonRepository.addListItem(pokemon);
}

inputField.addEventListener('input', function () {
  let query = inputField.value;
  let filteredList = pokemonRepository.filterPokemons(query);
  removeList();
  if (filteredList.length === 0) {
    showErrorMessage('Sorry. There are no Pokémon matching your search criteria.');
  } else {
    filteredList.forEach(addListPokemon);
  }
});

pokemonRepository.loadList().then(function () {
  // Load the initial list
  pokemonRepository.getAll().forEach(addListPokemon);
});