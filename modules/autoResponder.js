const Discord = require("discord.js");
const { Client, Attachment } = require("discord.js");
const wowOkay = new Attachment(
  "https://media.discordapp.net/attachments/287060020850327563/586661563558002790/ezgif.com-video-to-gif.gif"
);
const thonk = new Attachment(
  "https://media.discordapp.net/attachments/287060020850327563/586661550325235713/ezgif.com-video-to-gif_1.gif"
);
const matrixDodge = new Attachment(
  "https://i.giphy.com/media/dXy0o1dfj4ueQ/giphy.gif"
);
const deadPoolGasp = new Attachment(
  "https://i.giphy.com/media/57ZvMMkuBIVMlU88Yh/giphy.gif"
);
const nbaEyeroll = new Attachment(
  "https://i.giphy.com/media/3oAt2dA6LxMkRrGc0g/giphy.gif"
);
const didLeaveStoveOn = new Attachment(
  "https://i.giphy.com/media/zxf6g67Kq8zgQ/giphy.gif"
);
const hatersGonnaGate = new Attachment(
  "https://i.giphy.com/media/SwMMo3AMDwqru/giphy.gif"
);
const dracarys = new Attachment(
  "https://media.giphy.com/media/VJMltDnBPr5b0TgbMy/giphy.gif"
);

const goodReplies = [
  "One love",
  "Ain't no thang",
  "Good hang",
  "<:ConceitedReaction:497265887934414848>"
];
const badReplies = [
  "<:pikatroll:278578088529494017>",
  "Bad person",
  deadPoolGasp,
  "I mean...You didn't have to get all personal about it..",
  "I'm working on me.",
  wowOkay,
  nbaEyeroll,
  didLeaveStoveOn,
  "Who hurt you",
  thonk,
  "I'm only like 2 months old"
];

function autoResponder(message, text) {
  console.log(`${message.member.user.tag}: ${message.content}`)
  if (text.includes("bye")) {
    message.channel.send("Bye, Bye Butterfree!");
    return;
  }
  if (text.includes("good bot")) {
    let thankYouMessage =
      goodReplies[Math.floor(Math.random() * goodReplies.length)];
    message.channel.send(thankYouMessage);
    return;
  }
  if (text.includes("bad bot")) {
    let noThankYouMessage =
      badReplies[Math.floor(Math.random() * badReplies.length)];
    message.channel.send(noThankYouMessage);
    return;
  }
  if (text.includes("dracarys")) {
    message.channel.send(dracarys);
    console.log(`${message.member.user.tag} requested flames`);
    return;
  }
  if (text.includes("prepare for trouble")) {
    message.channel.send("And make it double!");
    return;
  }
  if (text.includes("to protect the world from devastation")) {
    message.channel.send("To unite all peoples within our nation!");
    return;
  }
  if (text.includes("to denounce the evils of truth and love")) {
    message.channel.send("To extend our reach to the stars above!");
    return;
  }
  if (text.includes("jessie")) {
    message.channel.send("James!");
    return;
  }
  if (text.includes("team rocket blasts off at the speed of light")) {
    message.channel.send("Surrender now, or prepare to fight!");
    message.channel.send("Meowth! That's right!");
    return;
  }
  if (text.includes("blake")) {
    console.log(`${message.member.user.tag}`, text);
    return;
  }
  return;
}
module.exports = autoResponder;
