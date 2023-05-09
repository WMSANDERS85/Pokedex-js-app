let pokemonList = [
  {
    name: "Pikachu",
    type: ["Electric"],
    height: 1.04
  },
  {
    name: "Charizard",
    type: ["Fire", "Flying"],
    height: 5.07
  },
  {
    name: "Bulbasur",
    type: ["Grass", "Poison"],
    height: 2.04
  },
  {
    name: "Ivysaur",
    type: ["Grass", "Poison"],
    height: 3.03
  },
  {
    name: "Squritle",
    type: ["Water"],
    height: 1.08
  },

]


pokemonList.forEach(function (pokemon) {
  console.log("Name: " + pokemon.name + " Type: " + pokemon.type + " Height " + pokemon.height);
});
