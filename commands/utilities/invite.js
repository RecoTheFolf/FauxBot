const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js');
const perms = ['ADMINISTRATOR']

class Invite extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'invite',
          description: "Creates a bot invite so you can invite it to your server",
          level:"Server Member",
          usage: "invite"
      })
  }

async run (message,args) {
message.channel.send("Click on the link below to invite me to your server!")
message.channel.send(await this.bot.generateInvite(perms))
}
}

module.exports = Invite;
