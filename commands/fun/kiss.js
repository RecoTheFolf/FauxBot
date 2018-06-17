const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js')
const { get } = require("snekfetch");

class Kiss extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'Kiss',
          description: "Kiss a random person~",
          guildOnly:true,
          usage: "",
          perms:['EMBED_LINKS','ATTACH_FILES']
      })
  }



async run(message, args) {

    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    try {
        get('https://e926.net/post/index.json?limit=1&tags=cute%20order:random%20kiss%20-equine%20fur').then(res => {
            const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag} just kissed ${member.user.tag}!`)
            .setColor(`RANDOM`)
            .setImage(res.body[0].file_url)
            .setFooter("Kisses~")
            
            return message.channel.send({embed});
        });
    } catch(err) {
        return message.channel.send("An error occurred.  This is a problem with the API or post method.  This is not bot-related");
    }
}
}
module.exports = Kiss;