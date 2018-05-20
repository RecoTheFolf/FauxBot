const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let fembed = new Discord.RichEmbed()
    .setTitle("Fun")
    .setTimestamp()
    .setDescription("There are currently 2 commands in this category.")
    .addField("`avatar`", "Get a member's avatar.")
    .addField("`bap`", "Bap a random user - **DMs them**")
    message.channel.send(fembed)
}
module.exports.help = {
    name: "fun"
}