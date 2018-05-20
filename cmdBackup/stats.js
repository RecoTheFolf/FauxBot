const Discord = require("discord.js");
const botconfig = require('../settings.json');
var upSecs = 0;
var upMins = 0;
var upHours = 0;
var upDays = 0;
setInterval(function() {
    upSecs = upSecs + 1
    if (upSecs >= 60) {
        upSecs = 0
        upMins = upMins + 1
    }
    if (upMins >= 60) {
        upMins = 0
        upHours = upHours + 1
    }
    if (upHours >= 24) {
        upHours = 0
        upDays = upDays + 1
    }
}, 1000)
module.exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    let sembed = new Discord.RichEmbed()
    .setTitle("Bot Statistics")
    .setColor(botconfig.limegreen)
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("**Bot**", bot.user.tag, true)
    .addField("Bot Owner", "Reconal#0001", true)
    .addField("Memory Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("Uptime", `${upDays} Day(s), ${upHours} Hour(s), ${upMins} Minute(s) and ${upSecs} Second(s)`, true)
    .addField("Users", `${bot.users.size.toLocaleString()}`, true)
    .addField("Servers", `${bot.guilds.size.toLocaleString()}`, true)
    .addField("Channels", `${bot.channels.size.toLocaleString()}`, true)
    .addField("Discord.js Version", `v${Discord.version}`, true)
    .addField("NodeJS Version", `${process.version}`, true);

    return message.channel.send(sembed);


}
module.exports.help = {
    name: "stats"
}