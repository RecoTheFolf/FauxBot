const Discord = require("discord.js");
const botconfig = require('../settings.js');
const Command = require('../base/Cmds.js');
const moment = require("moment");
require("moment-duration-format");

class Stats extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'stats',
          description: "Stats about thh bot",
          guildOnly:true
      })
  }

async run(message, args) {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    const duration = moment.duration(this.bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    let sembed = new Discord.MessageEmbed()
    .setTitle("Bot Statistics")
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setColor(botconfig.limegreen)
    .setThumbnail(this.bot.user.displayAvatarURL())
    .addField("**Bot**", this.bot.user.tag, true)
    .addField("Bot Owner", "Reconal#0001", true)
    .addField("Memory Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("Uptime", `${duration}`, true)
    .addField("Users", `${this.bot.users.size.toLocaleString()}`, true)
    .addField("Servers", `${this.bot.guilds.size.toLocaleString()}`, true)
    .addField("Channels", `${this.bot.channels.size.toLocaleString()}`, true)
    .addField("Discord.js Version", `v${Discord.version}`, true)
    .addField("NodeJS Version", `${process.version}`, true)
    .setTimestamp()
    .setFooter("FauxBot Statistics");

    return message.channel.send(sembed);


}
}
module.exports = Stats;