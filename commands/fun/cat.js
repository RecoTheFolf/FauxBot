const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js')
const request = require('request');
const { get } = require("snekfetch");

class Cat extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'cat',
          description: "Get a cute cat image :3",
          guildOnly:true,
          usage: ""
      })
  }

  async run(message, args) { // eslint-disable-line no-unused-vars
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    try {
      get('https://api.cheweybot.ga/cat').then(res => {
          const embed = new Discord.MessageEmbed()
          .setTitle("Random Cat :3")
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

module.exports = Cat;