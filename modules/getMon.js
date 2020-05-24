const Discord = require("discord.js");
const request = require("request");
const pokemon = require("../json/pokemon.json");
const getMissingNo = require("./getMissingNo.js");
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
  } else {
    return 'no title';
  }
}

function getMon(message, pokemonId) {
  let pokedexNumber = pokemon.pokemonList.indexOf(titleCase(pokemonId)) + 1;
  if (pokedexNumber < 722) {
    spriteLink = `https://img.pokemondb.net/sprites/x-y/normal/${pokemonId}.png`;
  } else {
    spriteLink = `https://img.pokemondb.net/sprites/sun-moon/normal/${pokemonId}.png`;
  }
  if (pokemonId === "marowak") {
    let marowakSpriteOptions = [
      "https://cdn.bulbagarden.net/upload/9/9e/Ghost_I.png",
      "https://img.pokemondb.net/sprites/x-y/normal/marowak.png"
    ];
    spriteLink = marowakSpriteOptions[Math.floor(Math.random() * 2)];
  }
  if (pokemonId === "rayquayquay") {
    message.channel.send(
      "https://www.youtube.com/watch?v=Cy-5Lk8IhYM&list=UU_tAq8S6QgTIJEJRd3NlBuw"
    );
    return;
  }
  if (pokemonId === "missingno") {
    getMissingNo(message);
    return;
  }
  if (pokemonId === "meltan") {
    spriteLink =
      "https://db.pokemongohub.net/images/ingame/normal/pokemon_icon_808_00.png";
  }
  if (pokemonId === "melmetal") {
    spriteLink =
      "https://db.pokemongohub.net/images/ingame/normal/pokemon_icon_809_00.png";
  }

  if (!pokemon.pokemonList.includes(titleCase(pokemonId))) {
    message.channel.send(
      "I'm sorry, I can't find that Pokemon. Please try again."
    );
  }
  if (pokemonId === "mewtwo-a") {
    spriteLink = "https://db.pokemongohub.net/images/official/full/150_f4.png";
    pokemonId = "150?form=Armored";
  }
  if (pokemonId === "mew") {
    message.channel.send("checking under truck...");
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
    function hasTypes() {
      if (data.type2 === null) {
        return "";
      }
      return `/${titleCase(data.type2)}`;
    }
    function canEvolve() {
      if (data.candyToEvolve === 0 || data.isLegendary === 1) {
        return "";
      }
      return `Candy to evolve: ${data.candyToEvolve}`;
    }
    function fixedNumber(number) {
      return number.toFixed(2);
    }
    if (data.weatherInfluences[0] && data.weatherInfluences[1]) {
      weatherBoosts = `${titleCase(data.weatherInfluences[0])}, ${titleCase(
        data.weatherInfluences[1]
      )}`;
    } else {
      weatherBoosts = `${titleCase(data.weatherInfluences[0])}`;
    }
    const embed = new Discord.RichEmbed()
      .setTitle(
        `${titleCase(pokemonId)} #${data.id} (${titleCase(
          data.type1
        )}${hasTypes()})`
      )
      .setColor(`${typeColors[data.type1]}`)
      .setThumbnail(spriteLink)
      .addField(
        "Stats",
        `Max CP: ${data.maxcp}\nAttack: ${data.atk}\nDefense: ${
          data.def
        }\nStamina: ${data.sta}`,
        true
      )
      .addField(
        "Info",
        `
          ${canEvolve()}\nBuddy distance: ${
          data.kmBuddyDistance
        }km\nBase capture rate: ${fixedNumber(
          data.baseCaptureRate
        )}%\nWeather Boosts: ${weatherBoosts}
          `
      );
    message.channel.send({ embed });
    return `${message.member.user.tag} requested ${pokemonId}`;
  });
return
}

module.exports = getMon;
