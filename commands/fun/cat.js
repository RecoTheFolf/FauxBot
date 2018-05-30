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

  async run(message, args) { // eslint-disable-line no-unused-vars

    const snekfetch = require('snekfetch')
    try {
    await snekfetch.post('http://aws.random.cat/meow').then(request => {
  
  if (!message.guild || message.channel.permissionsFor(message.guild.me).has(['ATTACH_FILES'])) {
  
  message.channel.send('',{"files":[JSON.parse(request.text).file]}).catch(err => {message.channel.send("<:redTick:312314733816709120> | An error occurred making that request.  Don't worry, you always have me! :cat:")})
  } else {
  message.channel.send(JSON.parse(request.text).file)
  
  }
  
    })
  } catch(err) {
    message.channel.send(`<:redTick:312314733816709120> An error occurred.  This is a problem with the API or post method.  This is not bot-related`)
  }
}

}

module.exports = Cat;