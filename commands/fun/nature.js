const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js')
const { get } = require("snekfetch");

class Nature extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'nature',
          description: "Get an random image of nature",
          guildOnly:true,
          usage: "",
          perms:['EMBED_LINKS','ATTACH_FILES']
      })
  }



async run(message, args) {

    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    try {
        get('https://api.cheweybot.ga/nature').then(res => {
            const embed = new Discord.MessageEmbed()
            .setTitle("Nature!")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setColor(`RANDOM`)
            .setImage(res.body.data)
            .setFooter("API provided by api.cheweybot.ga")
            
            return message.channel.send({embed});
        });
    } catch(err) {
        return message.channel.send("An error occurred.  This is a problem with the API or post method.  This is not bot-related");
    }
}
}
module.exports = Nature;