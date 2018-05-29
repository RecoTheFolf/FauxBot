const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js')
const { get } = require("snekfetch");

class Dog extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'dog',
          description: "Get a cute dog image :3",
          guildOnly:true,
      })
  }



async run(message, args) {

    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    try {
        get('https://dog.ceo/api/breeds/image/random').then(res => {
            const embed = new Discord.MessageEmbed()
            .setTitle("Random Dog :3")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setColor(`RANDOM`)
            .setImage(res.body.message)
            
            return message.channel.send({embed});
        });
    } catch(err) {
        return message.channel.send("An error occurred.  This is a problem with the API or post method.  This is not bot-related");
    }
}
}
module.exports = Dog;