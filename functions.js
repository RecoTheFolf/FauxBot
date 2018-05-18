const functions = {
    clean = async (client, text) => {
        if (text && text.constructor.name == "Promise")
          text = await text;
        if (typeof evaled !== "string")
          text = require("util").inspect(text, {depth: 0});
    
        text = text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203))
          .replace(client.token, randomstring.generate(24)+"."+randomstring.generate(6)+"."+randomstring.generate(23));
    
        return text;
    }

}

module.exports = functions;