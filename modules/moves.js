const pokemon = require("../json/pokemon.json");
const request = require("request");

function titleCase(title) {
  if (title.length > 0) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }
  return;
}
function getMoves(pokemonId, message) {
  let pokedexNumber = pokemon.pokemonList.indexOf(titleCase(pokemonId)) + 1;
  if (!pokemon.pokemonList.includes(titleCase(pokemonId))) {
    message.channel.send(
      "I'm sorry, I can't find that Pokemon. Please try again."
    );
    return;
  }
  request.get(
    `https://db.pokemongohub.net/api/moves/with-pokemon/${pokedexNumber}`,
    function(error, res, body) {
      if (error) {
        console.log(error);
        return;
      }
      let data = JSON.parse(body);
      let pokemonMoves = [];
      for (var i = 0; i < data.length; i++) {
        pokemonMoves.push(
          `**${data[i].name}** (${data[i].type})\nDPS: ${fixedNumber(
            data[i].dps
          )}\nEnergy: ${fixedNumber(data[i].energy)}`
        );
      }
      function fixedNumber(number) {
        return number.toFixed(2);
      }

      function isChargeMove() {
        if (data.isQuickMove === 0) {
          return `Charged move, ${data.energyBars}-bar`;
        }
        return "Quick Move";
      }
      message.channel.send(pokemonMoves);
    }
  );
  return;
}

module.exports = getMoves;
