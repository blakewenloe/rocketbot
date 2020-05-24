const Discord = require("discord.js");
const request = require("request");
const pokemon = require("../json/pokemon.json");

let typeColors = {
  bug: "#9CB81F",
  dark: "#000000",
  dragon: "#7037F8",
  electric: "#F8D030",
  fairy: "#F09AD9",
  fighting: "#C02F27",
  fire: "#F08030",
  flying: "#9096F0",
  ghost: "#705897",
  grass: "#3DC02A",
  ground: "#E0B669",
  ice: "#98D8D8",
  normal: "#ffffff",
  poison: "#A040A0",
  psychic: "#F55887",
  rock: "#E0B669",
  steel: "#6D8F9C",
  water: "#6890F0"
};
function titleCase(title) {
  if (title.length > 0) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }
  return;
}

function getShiny(message, monName) {
  let spriteLink;
  let pokedexNumber = pokemon.pokemonList.indexOf(titleCase(monName));
  if (pokedexNumber < 722) {
    spriteLink = `https://img.pokemondb.net/sprites/x-y/shiny/${monName}.png`;
  } else {
    spriteLink = `https://img.pokemondb.net/sprites/sun-moon/shiny/${monName}.png`;
  }
  if (monName.includes("unown-")) {
    let embedTitle = monName.replace("-", " ").toLocaleUpperCase();
    const embed = new Discord.RichEmbed()
      .setTitle(`${embedTitle}`)
      .setColor(`${typeColors["psychic"]}`)
      .setImage(
        `https://img.pokemondb.net/sprites/black-white/anim/shiny/${monName}.gif`
      );
    message.channel.send({ embed });
    return;
  }
  if (!pokemon.pokemonList.includes(titleCase(monName))) {
    message.channel.send(
      "I'm sorry, I can't find that Pokemon. Please try again."
    );
    console.log(`${message.member.user.tag} requested ${monName}`);
    return;
  }
  request.get(
    `https://db.pokemongohub.net/api/pokemon/${pokedexNumber}`,
    function(error, res, body) {
      if (error) {
        console.log(error);
        return;
      }
      let data = JSON.parse(body);
      const embed = new Discord.RichEmbed()
        .setTitle(`${titleCase(monName)} #${data.id}`)
        .setColor(`${typeColors[data.type1]}`)
        .setImage(spriteLink);
      message.channel.send({ embed });
    }
  );
  console.log(`${message.member.user.tag} requested shiny ${monName}`);
  return;
}

module.exports = getShiny;
