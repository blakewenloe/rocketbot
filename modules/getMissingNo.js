const Discord = require("discord.js");

let missingNoColors = [
  "#9CB81F",
  "#000000",
  "#7037F8",
  "#F8D030",
  "#F09AD9",
  "#C02F27",
  "#F08030",
  "#9096F0",
  "#705897",
  "#3DC02A",
  "#E0B669",
  "#98D8D8",
  "#ffffff",
  "#A040A0",
  "#F55887",
  "#E0B669",
  "#6D8F9C",
  "#6890F0"
];
let glitchString = `
      1F$#20$#32$34$
      38$3D$3E#$
      3F$43$44$#45$
      4F$#50$#51#$
      56$#57$5E$5F$
7#3$79$7A#$
7F$8#6$87$#89$
#8#C$92$9#C$
9F$#A0$A1#$A2$
AC$A#E$AF#$
B5$B#6$B7$B8
`;

const missingNoImages = [
  "https://cdn.bulbagarden.net/upload/9/98/Missingno_RB.png",
  "https://cdn.bulbagarden.net/upload/a/aa/Spr_1b_141_f.png",
  "https://cdn.bulbagarden.net/upload/b/bb/Spr_1b_142_f.png",
  "https://cdn.bulbagarden.net/upload/9/9e/Ghost_I.png"
];

function getMissingNo(message) {
  let randomGlitch = glitchString
    .split("")
    .sort(function() {
      return 0.5 - Math.random();
    })
    .join("");
  let stats = `HP:	33\nAttack:	136\nDefense:	0\nSpecial:	6\nSpeed:	29`;
  let glitchOptions = [stats, randomGlitch];
  let messageSprite = missingNoImages[Math.floor(Math.random() * 4)];
  let embedsColor = missingNoColors[Math.floor(Math.random() * 18)];
  let glitchChoice = glitchOptions[Math.floor(Math.random() * 2)];
  const embed = new Discord.RichEmbed()
    .setTitle("MISSINGNO.")
    .setColor(embedsColor)
    .setThumbnail(messageSprite)
    .setImage(messageSprite)
    .addField("Stats", glitchChoice, true)
    .addField("Info", `??? Pokemon`)
    .setFooter("##:##:##:##");
  message.channel.send({ embed });
  console.log(`${message.member.user.tag} requested missingno`);
  return;
}

module.exports = getMissingNo;
