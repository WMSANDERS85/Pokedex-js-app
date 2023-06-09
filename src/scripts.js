/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-concat */
/* eslint-disable no-console */
const pokemonRepository = (function () {
  const pokemonList = [];

  function filterPokemons(query) {
    return pokemonList.filter((pokemon) => {
      const pokemonLowerCase = pokemon.name.toLowerCase();
      const queryLowerCase = query.toLowerCase();
      return pokemonLowerCase.startsWith(queryLowerCase);
    });
  }

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  const loadingMessage = document.getElementById('loading-message');

  function showLoadingMessage() {
    loadingMessage.style.display = 'block';
  }

  function hideLoadingMessage() {
    loadingMessage.style.display = 'none';
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    const pokedex = document.querySelector('.pokemon-list');

    const listitem = document.createElement('li');

    listitem.classList.add('col');

    const button = document.createElement('button');

    button.innerText =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    button.classList.add('button-class');

    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');

    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imageUrlFront;
    button.appendChild(pokemonImage);

    listitem.appendChild(button);

    pokedex.appendChild(listitem);

    // add an event listner to created buttons. Calls the showDetails function.
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        const promises = json.results.map((item) => {
          const pokemon = {
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
      .then(() => {
        // Hide the loading message after all the Pokemon details have loaded
        setTimeout(() => {
          hideLoadingMessage();
        }, 1000); // Delay in milliseconds (e.g., 1000ms = 1s)
      })
      .catch((e) => {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    showLoadingMessage();
    const url = pokemon.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        // Now we add the details to the item
        pokemon.imageUrlFront = details.sprites.front_default;
        pokemon.imageUrlBack = details.sprites.back_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;

        // create a forEach loop to iterate through the API object types and display to the user.
        const arrayOfTypes = [];
        // eslint-disable-next-line no-shadow
        details.types.forEach((pokemon) => {
          arrayOfTypes.push(pokemon.type.name);
        });

        // define a space in between array items
        pokemon.types = arrayOfTypes.join(', ');

        const arrayOfAbilities = [];
        details.abilities.forEach((ability) => {
          arrayOfAbilities.push(ability.ability.name);
        });

        pokemon.abilities = arrayOfAbilities.join(', ');

        hideLoadingMessage();
      })
      .catch((e) => {
        hideLoadingMessage();
        console.error(e);
      });
  }

  // create function that prints details to console when called.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      const modalBody = $('.modal-body');
      const modalTitle = $('.modal-title');

      modalTitle.empty();
      modalBody.empty();

      const nameElement = $(
        `<h1>${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(
          1
        )}</h1>`
      );

      const imageElementFront = $('<img class="modal-img" style="width: 50%">');
      imageElementFront.attr('src', pokemon.imageUrlFront);

      const imageElementBack = $('<img class="modal-img" style="width:50%>');
      imageElementBack.attr('src', pokemon.imageUrlBack);

      const heightElement = $('<p>' + `Height : ${pokemon.height}</p>`);

      const weightElement = $('<p>' + `Weight : ${pokemon.weight}</p>`);

      const typesElement = $('<p>' + `Types : ${pokemon.types}</p>`);

      const abilitiesElement = $(
        '<p>' + `abilities : ${pokemon.abilities}</p>`
      );

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
    getAll,
    add,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
    filterPokemons,
  };
})();

const inputField = document.querySelector('input[type="search"]');

function removeList() {
  const pokedex = document.querySelector('.pokemon-list');
  pokedex.innerHTML = '';
}

function showErrorMessage(message) {
  const pokedex = document.querySelector('.pokemon-list');
  pokedex.innerHTML = `<li>${message}</li>`;
}

function addListPokemon(pokemon) {
  pokemonRepository.addListItem(pokemon);
}

inputField.addEventListener('input', () => {
  const query = inputField.value;
  const filteredList = pokemonRepository.filterPokemons(query);
  removeList();
  if (filteredList.length === 0) {
    showErrorMessage(
      'Sorry. There are no Pokémon matching your search criteria.'
    );
  } else {
    filteredList.forEach(addListPokemon);
  }
});

pokemonRepository.loadList().then(() => {
  // Load the initial list
  pokemonRepository.getAll().forEach(addListPokemon);
});
