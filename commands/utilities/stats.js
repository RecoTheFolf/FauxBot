const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js');
const moment = require("moment");
const os = require("os");
require("moment-duration-format");

class Stats extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'stats',
          description: "Stats about the bot",
          guildOnly:true,
          perms:['EMBED_LINKS']          
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
    .setDescription("<:GreenTick:450167691240669186> **Bot is up for: **" +  `${duration}` + ".")
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
    .addField("» Total Commands", "22", true)
    //.addField("» Links", "<:Discord:450171955384025088> [Support Server]() | [Bot Invite]()")
    .addField("» Command Executions", "Coming Soon!")
    .addField("» Bot Developers", "Reconal#0001 (119799610670579714) \nPawky#3299 (245419467843174401)")
    .addField("» Bot Start Time", `${moment.utc(this.bot.readyAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
    .addField("» Shard", `${this.bot.shard ? this.bot.shard.count : 1}`)
    .setTimestamp()
    .setFooter("FauxBot Statistics");

    return message.channel.send(sembed);


}
}
module.exports = Stats;