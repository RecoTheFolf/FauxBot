const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js')
const { get } = require("snekfetch");

class Cat extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'cat',
          description: "Get a cute cat image :3",
          guildOnly:true,
      })
  }

async run(message, args) {
    try {
        get('https://aws.random.cat/meow').then(res => {
            const embed = new Discord.MessageEmbed()
            .setTitle("Random Cat :3")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setColor(`RANDOM`)
            .setImage(res.body.file)
            return message.channel.send({embed});
        });
    } catch(err) {
        return message.channel.send("An error occurred.  This is a problem with the API or post method.  This is not bot-related");
    }
}
}
module.exports = Cat;