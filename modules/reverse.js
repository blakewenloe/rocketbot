function reverseString(str, message) {
  let reversedMessage = str
    .split("")
    .reverse()
    .join("");
  message.channel.send(reversedMessage);
  console.log(`${message.member.user.tag} reversed ${str}`);
  return;
}

module.exports = reverseString;
