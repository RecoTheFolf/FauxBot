const Command = require('../../base/Cmds.js');

class Help extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'help',
          description: "Return useful information on commands or settings",
      })
  }

async run (message,args) {

if (args.length === 0) {
    message.channel.send(`Please specify help on a category\n\n${this.bot.categories.join('\n')}`)
}

if (this.bot.categories.includes(args[0])) {
    const cmds = this.bot.commands.filter(c => c.conf.category === args[0].toLowerCase())
    message.channel.send(cmds.map(c => `${c.help.name} | ${c.help.description}`))
}

const cmd = this.bot.commands.get(args[0])
if (cmd) {
    message.channel.send(`${cmd.help.name} | ${cmd.help.description}`)
}

}
}

module.exports = Help;
