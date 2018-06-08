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

    request.get('http://thecatapi.com/api/images/get?format=src&type=png', {
      
    }, function(error, response, body) {
        if(!error && response.statusCode == 200) {
          const embed = new Discord.MessageEmbed()
          .setTitle("Random Cat :3")
          .setAuthor(member.user.tag, member.user.displayAvatarURL())
          .setColor(`RANDOM`)
          .setImage(response.request.uri.href)
          return message.channel.send({embed});
        } else {
          message.channel.send(`<:RedX:451263237434900491> An error occurred.  This is a problem with the API or post method.  This is not bot-related.`) + console.log(err);
        }
    })
  }
}

module.exports = Cat;