const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Info")
    .setColor("#4286f4")
    .setThumbnail(bicon)
    .setTimestamp()
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Ping (in MS)", bot.ping);

    return message.channel.send(botembed);

}

module.exports.help = {
    name: "botinfo"
}