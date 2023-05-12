let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: "Pikachu",
            type: ["Electric"],
            height: 1.04,
        },
        {
            name: "Charizard",
            type: ["Fire", "Flying"],
            height: 5.07,
        },
        {
            name: "Bulbasur",
            type: ["Grass", "Poison"],
            height: 2.04,
        },
        {
            name: "Ivysaur",
            type: ["Grass", "Poison"],
            height: 3.03,
        },
        {
            name: "Squritle",
            type: ["Water"],
            height: 1.08,
        },
    ];

    // Function returns a list of pokemon
    function getAll() {
        return pokemonList;
    }
    // function adds pokemon and validates its an object
    function add(pokemon) {
        // Validates whether pokemon was entered as an object
        if (typeof pokemon === "object") {
            // Validates wheter all fields have been entered
            if (Object.keys(pokemonList[0]).every((key) => key in pokemon)) {
                // Alerts user that the Pokemon was added successfully
                alert(`Hooray! a new Pokémon! "${pokemon.name}" has been added to the Pokédex.`);

                console.log(Object.keys(pokemonList[0]).every((key) => key in pokemon));
                // adds pokemon to the end of the array
                pokemonList.push(pokemon);
            } else {
                // displays message if all fields are not completed
                alert(`The data for the new Pokémon you are trying to add is not complete.
              Please verify that no fields are missing.`);

                console.log(Object.keys(pokemonList[0]).every((key) => key in pokemon));
            }
        } else {
            // Alert if data is not entered as an object
            alert(`"${pokemon}" is not a valid Pokémon! Please check that the data type typed in is an object.`);
        }
    }
    
    // create function that prints details to console when called.
    function showDetails(pokemon) {
        console.log("Name: " + pokemon.name + " Heigth: " + pokemon.height + " Type: " + pokemon.type);
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

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
    };
})();

// forEach loop calling pokemonList inside the IIFE
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
