function sarcasticMessage(str, message) {
  if(!str) return null;
  var stringeroo = [...str];
  var sarcasticMessage = stringeroo.map((char, i) => char[`to${i % 2 === 0 ? 'Upper' : 'Lower'}Case`]())
  .join('')
  message.channel.send(sarcasticMessage);
console.log(`${message.member.user.tag} requested derrr ${str}`);
  return false;
  }

module.exports = sarcasticMessage;
