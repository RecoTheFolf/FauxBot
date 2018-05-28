const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js');
const moment = require("moment");
require("moment-duration-format");

class Botinfo extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'botinfo',
          description: "Information about the bot",
          guildOnly:true,
      })
  }

async run(message, args) {
    const duration = moment.duration(this.bot.uptime).format(" D [days], H [hours], m [minutes], s [seconds]");
    let sembed = new Discord.MessageEmbed()
    .setTitle("FauxBot Information")
    .setAuthor(this.bot.user.tag, this.bot.user.displayAvatarURL())
    .setColor(`RANDOM`)
    .addField("Heya! I'm FauxBot.", "A multifunctional bot for moderation, music(coming soon!), fun commands, and a lot more!")
    .addField("Website:", "Coming Soon!")
    .addField("Developed by:", "Reconal#0001 and Pawky#3299")
    .addField("Library", `Discord.js (${Discord.version})`, true)
    //.addField("Links", "<:Discord:450171955384025088> [Support Server](https://discord.gg/sFjKcd5) | [Bot Invite](https://discordapp.com/api/oauth2/authorize?client_id=447972712795865088&permissions=2146954487&scope=bot)")
    .addField("I've been up for" , `${duration}` + ".")
    .setTimestamp()
    .setFooter("FauxBot Information");

    return message.channel.send(sembed);

}
}

module.exports = Botinfo;