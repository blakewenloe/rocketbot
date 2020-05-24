const Discord = require("discord.js");
const { Client, Attachment } = require("discord.js");
const moveList = require("../json/moves.json");
const request = require("request");

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

function getMove(moveId, message) {
  if (!moveList.moves.includes(moveId)) {
    message.channel.send(
      "I'm sorry, I can't find that move. Please try again."
    );
    return;
  }
  request.get(`https://db.pokemongohub.net/api/moves/${moveId}`, function(
    error,
    res,
    body
  ) {
    if (error) {
      console.log(error);
      return;
    }
    let data = JSON.parse(body);

    function fixedNumber(number) {
      return number.toFixed(2);
    }
    if (data.weather[0] && data.weather[1]) {
      weatherBoosts = `${titleCase(data.weatherInfluences[0])}, ${titleCase(
        data.weatherInfluences[1]
      )}`;
    } else {
      weatherBoosts = `${titleCase(data.weather[0])}`;
    }
    function isChargeMove() {
      if (data.isQuickMove === 0) {
        return `Charged move, ${data.energyBars}-bar`;
      }
      return "Quick Move";
    }
    let moveType = titleCase(data.type);
    let moveInfo = `Power: ${fixedNumber(data.power)}\nEnergy: ${fixedNumber(
      data.energy
    )}\nDmg window: ${data.damageWindow}`;
    let movePvpInfo = `Power: ${fixedNumber(
      data.pvpPower
    )}\nEnergy: ${fixedNumber(data.pvpEnergy)}`;
    let moveBoostedInfo = `
  Stab: ${fixedNumber(data.boostedPower.stab)}\nWeather: ${fixedNumber(
      data.boostedPower.wab
    )}\nStab + Weather: ${fixedNumber(
      data.boostedPower.stab_wab
    )}\nWeather boost: ${weatherBoosts}
  `;
    const embed = new Discord.RichEmbed()
      .setTitle(`${titleCase(moveId)} (${isChargeMove()})`)
      .setColor(`${typeColors[data.type]}`)
      .setThumbnail(
        `https://db.pokemongohub.net/images/badges/thumb/Badge_Type_${moveType}_01.png`
      )
      .addField("Gyms/Raids", moveInfo, true)
      .addField("Bonuses", moveBoostedInfo, true)
      .addField("PvP", movePvpInfo, true)
      .setTimestamp();
    message.channel.send({ embed });
  });
  return;
}

module.exports = getMove;
