let pokemonRepository = (function () {
    let pokemonList = [];
  
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('#modal-container')

  const loadingMessage = document.getElementById('loading-message');

  function showLoadingMessage(){
    loadingMessage.style.display = 'block';
  }

  function hideLoadingMessage(){
    loadingMessage.style.display = 'none'
  }

    
  
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      'name' in pokemon
      
     
    ) {
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
    function loadDetails(pokemon) {
      showLoadingMessage();
      let url = pokemon.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types[0];
        hideLoadingMessage();
      }).catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
    }
    

    

 // create function that prints details to console when called.
    function showDetails(pokemon){
      loadDetails(pokemon).then(function() {


        modalContainer.innerHTML ='';
        

        let pokemonModal = document.createElement('div');
        pokemonModal.classList.add('modal');
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        let titleElement= document.createElement('h2');
        titleElement.innerText = pokemon.name;
        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + pokemon.height + ' Type(s): ' + pokemon.types;
        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;

        pokemonModal.appendChild(closeButtonElement);
        pokemonModal.appendChild(titleElement);
        pokemonModal.appendChild(contentElement);
        pokemonModal.appendChild(imageElement);
        modalContainer.appendChild(pokemonModal);

        modalContainer.classList.add('is-visible');
        
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

  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
  })