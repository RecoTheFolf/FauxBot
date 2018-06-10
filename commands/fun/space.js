const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js')
const { get } = require("snekfetch");

class Space extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'space',
          description: "Get an random image of space",
          guildOnly:true,
          usage: "",
          perms:['EMBED_LINKS','ATTACH_FILES']
      })
  }



async run(message, args) {

    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    try {
        get('https://api.cheweybot.ga/space').then(res => {
            const embed = new Discord.MessageEmbed()
            .setTitle("Space!")
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
module.exports = Space;