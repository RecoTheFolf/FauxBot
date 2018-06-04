const Command = require('../../base/Cmds.js');

class Mylevel extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'mylevel',
          description: "Shows what permission level you have on the bot.",
          usage: ""
      })
  }

async run (message,args) {
const perms = this.bot.config.perms
const local  = perms.filter(p => p.check(message) && p.level < this.bot.config.staffThreshold).pop()
const global = perms.filter(p => p.check(message) && p.level > this.bot.config.staffThreshold - 1).pop()

message.channel.send(`Your permission level is level ${local.level} (${local.name})${global ? ` | ${global.level} (${global.name})`:``}`)

}
}

module.exports = Mylevel
