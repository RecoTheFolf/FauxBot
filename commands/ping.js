const Discord = require("discord.js");
const config = require("../settings.js");
const Command = require('../base/Cmds.js');

class Ping extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'ping',
          description: "Latency of the bot",
      })
  }

async run (message,args) {
    let pingembed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor("RANDOM")
    .setDescription("Bot Latency")
    .addField("🏓 Ping ", `${Date.now() - message.createdTimestamp}` + "ms")
    .setFooter("FauxBot Ping Command")
    return message.channel.send(pingembed);
    
}
}

module.exports = Ping;
