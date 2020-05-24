const request = require("request");
const Discord = require("discord.js");
const { Client, Attachment } = require("discord.js");
const pokemon = require("../json/pokemon.json");
let spriteLink;

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

function getDexEntry(pokemonId, message) {
  let pokedexNumber = pokemon.pokemonList.indexOf(titleCase(pokemonId)) + 1;
  if (pokedexNumber < 722) {
    spriteLink = `https://img.pokemondb.net/sprites/x-y/normal/${pokemonId}.png`;
  } else {
    spriteLink = `https://img.pokemondb.net/sprites/sun-moon/normal/${pokemonId}.png`;
  }
  if (!pokemon.pokemonList.includes(titleCase(pokemonId))) {
    message.channel.send(
      "I'm sorry, I can't find that Pokemon. Please try again."
    );
    return;
  }

  request.get(`https://db.pokemongohub.net/api/pokemon/${pokemonId}`, function(
    error,
    res,
    body
  ) {
    if (error) {
      console.log(error);
      return;
    }
    let data = JSON.parse(body);
    const embed = new Discord.RichEmbed()
      .setTitle(`${titleCase(pokemonId)} #${data.id}`)
      .setColor(`${typeColors[data.type1]}`)
      .setThumbnail(spriteLink)
      .addField("Pokédex entry", `${data.description}`, true);
    message.channel.send({ embed });
    console.log(`${message.member.user.tag} requested ${pokemonId}`);
  });
  return;
}

module.exports = getDexEntry;
