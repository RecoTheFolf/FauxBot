const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Categories")
    .setAuthor("Commands", bot.user.displayAvatarURL)
    .setColor("#e86045")
    .setDescription("[p] is whatever the current prefix set for the server is.")
    .addField("Moderation", "`[p]mod`", true)
    .addField("Core Commands", "`[p]core`", true)
    .addField("Utils", "`[p]utils`", true)
    .addField("Fun", "`[p]fun`", true)
    .addField("Statistics", "`[p]stats`", true)
    .addField("Developer", "`[p]dev`", true)
    message.channel.send(embed);
}
module.exports.help = {
    name: "help"
}