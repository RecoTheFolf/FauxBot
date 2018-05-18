const Discord = require("discord.js");
const moment = require("moment");
const config = require("../settings.json")
require("moment-duration-format");
const ms = require('ms');


module.exports.run = async (bot, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    let UReason = args.slice(1).join(" ");
    let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role.name);
    let perms = message.member.permissions;
    //let roles = member.roles.mention;
    if (roles.length < 1) roles = ['None'];
    let user = Discord.user;
    let userembed = new Discord.RichEmbed()
    .setDescription("**User Information**")
    .setColor(config.limegreen)
    .setThumbnail(member.user.displayAvatarURL)
    .addField("**Username**", member.user.username, true)
    .addField("**Nickname**", member.nickname, true)
    .addField("**Discriminator**", member.user.discriminator, true)
    .addField("**ID**", member.id, true)
    .addField("**Status**",`${member.user.presence.status}`)
    .addField("**Playing**", `${member.presence.game ? `${member.presence.game.name}` : "Not playing anything."}`)
    .addField("**Roles**", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
    .addField("**Joined At**", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
    .addField("**Account Created At**", `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
    .setFooter(member.id)
    .setTimestamp();

    return message.channel.send(userembed);
}

module.exports.help = {
    name: "userinfo"
}