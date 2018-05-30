const Discord = require("discord.js");
const urban = require("relevant-urban");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js')
const { get } = require("snekfetch");

class Urban extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'Urban',
          description: "Search up words via Urban Dictionary",
          guildOnly:true,
      })
  }

async run(message, args, tools) {
    if (!args[0]) return message.channel.send("***Please specifiy some text!***");

    let res = await urban(args.join(' ')).catch(e => {
        return message.channel.send("***That word was not found!***");
    });
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    const embed = new Discord.MessageEmbed()
    .setTitle("FauxBot Urban")
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setColor(`RANDOM`)
    .setURL(res.urbanURL)
    .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
    .addField('Author', res.author, true)
    .addField('Rating', `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`)

    if (res.tags.length > 0 && res.tags.join(', ').length < 1024) {
        embed.addField('Tags', res.tags.join(', '), true)
    }

    message.channel.send(embed);

    
}
}

module.exports = Urban;