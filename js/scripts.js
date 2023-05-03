let pokemonList = [
    { name: "Pikachu", type: ["Electric"], height: 1.04 },
    { name: "Charizard", type: ["Fire", "Flying"], height: 5.07 },
    { name: "Bulbasur", type: ["Grass", "Poison"], height: 2.04 },
    { name: "Ivysaur", type: ["Grass", "Poison"], height: 3.03 },
    { name: "Squritle", type: ["Water"], height: 1.08 },

]

for (let i = 0; i < pokemonList.length; i++) {
    //Sahil, I commented the line below out because I was not sure if it needed to be there. It was giving me double input.
    // console.log(pokemonList[i].name + pokemonList[i].height);{
    if (pokemonList[i].height < 2) {
        document.write(pokemonList[i].name + " (Height) " + pokemonList[i].height + " This is a small Pokemon" + "<br>");
    } else if (pokemonList[i].height < 5 && pokemonList[i].height > 2) {
        document.write(pokemonList[i].name + " (Height) " + pokemonList[i].height + " This is an average Pokemon" + "<br>");
    } else {
        document.write(pokemonList[i].name + " (Height) " + pokemonList[i].height + " Wow! That\'s big!" + "<br>");
    }
}
// }