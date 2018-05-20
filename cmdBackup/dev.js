const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
.setTitle("Utilities")
.setDescription("Development Commands")
.addField("`eval`", "Execute a JavaScript string.")
.addField("`restart`","Restart the bot")
.addField("`reload`","Reload all commands.");

return message.channel.send(embed);
}

module.exports.help = {
  name: "dev"
}