const Discord = require("discord.js");
const botconfig = require('../settings.js');
const Command = require('../base/Cmds.js');
const moment = require("moment");
const os = require("os");
require("moment-duration-format");

class Stats extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'stats',
          description: "Stats about the bot",
          guildOnly:true
      })
  }

async run(message, args) {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    const duration = moment.duration(this.bot.uptime).format(" D [days], H [hours], m [minutes], s [seconds]");
    let sembed = new Discord.MessageEmbed()
    .setTitle("FauxBot's Information")
    .setAuthor(this.bot.user.tag, this.bot.user.displayAvatarURL())
    .setColor(`RANDOM`)
    .setThumbnail("https://i.imgur.com/UmW0gpm.png", true)
    .setDescription("✅ **Bot is up for: **" +  `${duration}` + ".")
    .addField("» Ping ", `${Date.now() - message.createdTimestamp}` + "ms", true)
    .addField("» Total Users", `${this.bot.users.size.toLocaleString()}`, true)
    .addField("» OS", `${os.platform()}`, true)
    .addField("» Total Servers", `${this.bot.guilds.size.toLocaleString()}`, true)
    .addField("» Total Channels", `${this.bot.channels.size.toLocaleString()}`, true)
    .addField("» Prefix", "--", true)
    .addField("» Library", `Discord.js (${Discord.version})`, true)
    .addField("» NodeJS Version", `${process.version}`, true)
    .addField("» CPU Cores", `${os.cpus().length}`, true)
    .addField("» Ram Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("» Total Commands", "10", true)
    .addField("» Links", "Coming Soon!")
    .addField("» Command Executions", "Coming Soon!")
    .addField("» Bot Owner", "Reconal#0001 (119799610670579714)")
    .addField("» Bot Start Time", `${moment.utc(this.bot.readyAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
    .setTimestamp()
    .setFooter("FauxBot Statistics");

    return message.channel.send(sembed);


}
}
module.exports = Stats;