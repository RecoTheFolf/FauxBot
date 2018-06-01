const randomstring = require("randomstring");

module.exports = (bot) => {
    bot.clean = async (bot, text) => {
        if (text && text.constructor.name == "Promise")
          text = await text;
        if (typeof evaled !== "string")
          text = require("util").inspect(text, {depth: 0});
    
        text = text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203))
          .replace(bot.token, randomstring.generate(24)+"."+randomstring.generate(6)+"."+randomstring.generate(23));
    
        return text;
    }

    bot.awaitReply = async (msg, question, limit = 15000) => {
      const filter = m=>m.author.id === msg.author.id;
      await msg.channel.send(question);
      try {
        const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        return collected.first().content;
      } catch (e) {
        return false;
      }
    };

    bot.play = async () => {
      
    }

}