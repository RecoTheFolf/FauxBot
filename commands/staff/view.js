const Command = require('../../base/Cmds.js');

class View extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'view',
          description: "Set various guild settings",
          guildOnly:true,
          usage: "<setting>",
          level:"Server Admin"
      })
  }


  async run (message,[set]) {
    if (!set) return [0,"You need to specify a setting"]
    if (!this.bot.config.defaultSettings[set]) return [0,"Invalid setting"]
    const status = await this.bot.config.defaultSettings[set.toLowerCase()].view(message.guild.settings,message.guild)
    if (!status) return [0,`No data was returned.  This is a bot problem.`]
    message.channel.send(`The current value of ${set} is \`${status}\``)
}

}

module.exports = View;