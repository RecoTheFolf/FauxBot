const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js');
const perms = ['ADMINISTRATOR']

class Invite extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'ping',
          description: "Latency of the bot",
          level:"Server Member"
      })
  }

async run (message,args) {
message.channel.send(await this.bot.generateInvite(perms))
}
}

module.exports = Invite;
