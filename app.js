// Load up the discord.js library
const Discord = require("discord.js");
const getMove = require("./modules/move.js");
const unownSpeller = require("./modules/unown.js");
const getModel = require("./modules/getModel.js");
const getShiny = require("./modules/getShiny.js");
const getMon = require("./modules/getMon.js");
const autoResponder = require("./modules/autoResponder.js");
const getDexEntry = require("./modules/getDexEntry.js");
const sarcasticMessage = require("./modules/sarcastic.js");
const { Client, Attachment } = require("discord.js");
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./json/config.json");

client.on("error", (e) => {
  console.error("error occurred");
  return;
});

client.on("ready", () => {
  // This generates a bot invite link in the console
  client.generateInvite(["ADMINISTRATOR"]).then((link) => {
    console.log(link);
  });
  // This event will run if the bot starts, and logs in, successfully.
  console.log(
    `RocketBot firing up with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );
  client.user.setActivity(`Pokermans`);
});

client.on("guildCreate", (guild) => {
  // This event triggers when the bot joins a guild.
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", (guild) => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  let text = message.content.toLowerCase();
  autoResponder(message, text);
});
client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift();
  // 3d Pokemon shiny model
  if (command === "shiny") {
    let monName = args.join("").toLowerCase();
    getShiny(message, monName);
  }
  // Pokemon info embed
  if (command === "mon") {
    let pokemonId = args.join("").toLowerCase();
    getMon(message, pokemonId);
  }
  // 3d Pokemon model
  if (command === "model") {
    let monName = args.join(" ").toLowerCase();
    getModel(message, monName);
  }
  // Spell message with Unown Alphabet
  if (command === "spell") {
    let words = args.join(" ").toLowerCase();
    unownSpeller(message, words);
  }
  // Get dex entry for requested pokemon
  if (command === "dex") {
    let pokemonId = args.join("").toLowerCase();
    getDexEntry(pokemonId, message);
  }
  // Get info on requested move
  if (command === "move") {
    let moveId = args.join(" ").toLowerCase();
    getMove(moveId, message);
  }
  // Do ThIs WiTh ReQuEsTeD mEsSaGe
  if (command === "derr") {
    let sarcasm = args.join(" ").toLowerCase();
    sarcasticMessage(sarcasm, message);
  }
});
client.login(config.token);
