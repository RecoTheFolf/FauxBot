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

}