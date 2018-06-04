const Command = require('../../base/Cmds.js');

class Set extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'set',
          description: "Set various guild settings",
          guildOnly:true,
          usage: "<setting> <value>",
          level:"Server Admin"
      })
  }


  async run (message,[set,...value]) {
    const val = value.join(' ')
    if (!set) return [0,"Specify a setting to update"]
    if (value.length === 0) return [0,"Specify a value to set"]
    if (!this.bot.config.defaultSettings[set]) return [0,"Invalid setting"]
    const status = await this.bot.config.defaultSettings[set.toLowerCase()].set(val,message.guild)
    if (!status) return [0,`Invalid option for setting.  Do \`${this.bot.sets.prefix}help ${set.toLowerCase()}\` for more help`]
    message.guild.settings[set.toLowerCase()] = status
    await this.bot.settings.get(message.guild.id).update({settings:message.guild.settings}).run()
    return[1,`Successfully set the ${set.toLowerCase()} setting`]
}

}

module.exports = Set;