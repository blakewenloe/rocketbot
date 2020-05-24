const request = require("request");

function getPigLatin(text, message) {
  request.get(
    `https://api.funtranslations.com/translate/piglatin.json?text=${text}`,
    function(error, res, body) {
      if (error) {
        console.log(error);
        return;
      }
      let data = JSON.parse(body);
      let translation = data.contents.translated;
      if (translation.length > 0) {
        message.channel.send(translation);
      }
      console.log(
        `${message.member.user.tag} requested pig latin: ${data.contents.text}`
      );
      return;
    }
  );
}

module.exports = getPigLatin;
