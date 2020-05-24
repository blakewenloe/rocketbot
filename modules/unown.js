const Discord = require("discord.js");
const { Client, Attachment } = require("discord.js");

const alphabet = {
  a: "<:unowna:562791920946905089>",
  b: "<:unownb:562791921014276106>",
  c: "<:unownc:562791921039310851>",
  d: "<:unownd:562791921026859048>",
  e: "<:unowne:562791921022533669>",
  f: "<:unownf:562791921119002634>",
  g: "<:unowng:562791921026859018>",
  h: "<:unownh:562791921097900050>",
  i: "<:unowni:562791921034985472>",
  j: "<:unownj:562791921093705749>",
  k: "<:unownk:562795653126815745>",
  l: "<:unownl:562791921068802058>",
  m: "<:unownm:562791921219797002>",
  n: "<:unownn:562791920934453269>",
  o: "<:unowno:562791920779132932>",
  p: "<:unownp:562791921085448216>",
  q: "<:unownq:562791921089642551>",
  r: "<:unownr:562791921051762691>",
  s: "<:unowns:562791920737189904>",
  t: "<:unownt:562791921131454464>",
  u: "<:unownu:562791920779395084>",
  v: "<:unownv:562791920871669762>",
  w: "<:unownw:562791921202888704>",
  x: "<:unownx:562791921009950722>",
  y: "<:unowny:562791921165271049>",
  z: "<:unownz:562791921144299561>",
  "!": "<:unownexlaim:562791920674406431>",
  "?": "<:unownquestion:562791920774938635>"
};

function unownSpeller(message, words) {
  let letters = "";
  let wordCount = words.split(" ");
  for (var i = 0; i < words.length; i++) {
    if (alphabet[words[i]]) {
      letters += alphabet[words[i]];
    } else {
      letters += "  ";
    }
  }
  if (!letters.length >= 1) {
    message.channel.send(
      "Your message contained invalid characters. Please try again!"
    );
  } else {
    message.channel.send(letters);
    console.log(`${message.member.user.tag} spelled`, words);
  }
  return;
}

module.exports = unownSpeller;
