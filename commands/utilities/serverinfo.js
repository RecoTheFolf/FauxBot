const Discord = require('discord.js'); 
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js');
class Serverinfo extends Command {
    constructor(bot) {
        super(bot,{ 
            name:'serverinfo',
            description: "Get information on the server",
            guildOnly:true,
            usage: "serverinfo"
        })
    }
  
    async run(message,args) {
const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
  let guild = message.guild;
  let icon = message.guild.iconURL();

  let createdAtRaw = guild.createdAt.toDateString();
  let createdAt = createdAtRaw.split(" ");

  let bots = message.guild.members.filter(m => m.user.bot).size;
  let humans = message.guild.members.filter(m => !m.user.bot).size;
  let channels = message.guild.channels.size;
  let textChannels = message.guild.channels.filter(m => m.type == "text").size;
  let voiceChannels = message.guild.channels.filter(i => i.type == "voice").size;
  let emojis = [];
  guild.emojis.forEach(emoji => {
  emojis.push(`\`${emoji.name}\``);
  });
  emojis.length === 0 ? emojis = "None" : emojis = emojis.join(", ");

  let roles = [];
  guild.roles.forEach(role => {
    roles.push(`\`${role.name}\``);
  });
  roles = roles.join(", ");

  let embed = new Discord.MessageEmbed()
  .setTitle(`Server Information`)
  .setColor("RANDOM")
  .setThumbnail(icon)
  .addField('**Guild Name**', guild.name, true)
  .addField('**Guild ID**', guild.id, true)
  .addField('**Guild Owner**', guild.owner, true)
  .addField('**Created At**', `${createdAt[0]} ${createdAt[2]} ${createdAt[1]} ${createdAt[3]}`, true)
  .addField('**Region**', guild.region.toUpperCase(), true)
  .addField('**Total Members:**', guild.memberCount, true)
  .addField('**Bots:**', bots, true)
  .addField('**Users:**', humans, true)
  .addField('**Verification Level**', guild.verificationLevel, true)
  .addField('**Text Channels**', textChannels, true)
  .addField('**Voice Channels**', voiceChannels, true)
  .addField('**Roles**', `${guild.roles.size}`, true)
  .addField('**Emojis**', `${guild.emojis.size}`, true)
  .setFooter("FauxBot Server Information")
  .setTimestamp();

  return message.channel.send(embed);
}
}

module.exports = Serverinfo;