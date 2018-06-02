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
          usage: "cat"
      })
  }

  async run(message, args) { // eslint-disable-line no-unused-vars

    const snekfetch = require('snekfetch')
    try {
    await snekfetch.post('https://aws.random.cat/meow').then(request => {
  
  if (!message.guild || message.channel.permissionsFor(message.guild.me).has(['ATTACH_FILES'])) {
  
  message.channel.send('',{"files":[JSON.parse(request.text).file]}).catch(err => {message.channel.send("<:RedX:451263237434900491> | An error occurred making that request.  Don't worry, you always have me! :cat:")})
  } else {
  message.channel.send(JSON.parse(request.text).file)
  
  }
  
    })
  } catch(err) {
    message.channel.send(`<:RedX:451263237434900491> An error occurred.  This is a problem with the API or post method.  This is not bot-related.`) + console.log(err)
  }
}

}

module.exports = Cat;