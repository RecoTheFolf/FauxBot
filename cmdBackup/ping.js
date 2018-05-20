const Discord = require("discord.js");
const config = require("../settings.json");

module.exports.run = async (bot, message, args) => {
  let icon = message.guild.iconURL;
        let pEmbed = new Discord.RichEmbed()
        .setColor(config.limegreen)
        .setTitle('Pong!')
        .setThumbnail(icon)
        .addField('Latency', (new Date().getTime() - message.createdTimestamp) + ' ms', true);
         message.channel.send(pEmbed);
}


module.exports.help = {
  name: "ping"
}