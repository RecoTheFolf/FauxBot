const Discord = require("discord.js");
const moment = require("moment");
const config = require("../settings.js")
require("moment-duration-format");
const ms = require('ms');

const Command = require('../base/Cmds.js');

class Userinfo extends Command {
    constructor(bot) {
        super(bot,{ 
            name:'userinfo',
            description: "Get information on a user",
        })
    }
  

    async run(message,args) {

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
    .addField("**Nickname**", member.nickname ? member.nickname : "None", true)
    .addField("**Discriminator**", member.user.discriminator, true)
    .addField("**ID**", member.id, true)
    .addField("**Status**",`${member.user.presence.status}`,true)
    .addField("**Playing**", `${member.presence.game ? `${member.presence.game.name}` : "Not playing anything."}`,true)
    .addField("**Roles**", `${member.roles.filter(r => r.name != `@everyone`).map(r => `${r}`).join(' | ')}`, false)
    .addField("**Joined At**", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
    .addField("**Account Created At**", `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
    .setFooter(member.id)
    .setTimestamp();

    return message.channel.send(userembed);
}
}

module.exports = Userinfo;