const Command = require('../../base/Cmds.js');
const Discord = require("discord.js");

class Help extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'help',
          description: "Return useful information on commands or settings",
      })
  }

async run (message,args) {

if (args.length === 0) {
    let hembed = new Discord.MessageEmbed()
    .setTitle("FauxBot Help")
    .setAuthor(this.bot.user.tag, this.bot.user.displayAvatarURL())
    .setColor(`RANDOM`)
    .addField("Command Categories", "Use ``--help (category)`` to find whatever commands you need!")
    .addField("Please specify help on a category", `\n\n${this.bot.categories.join('\n')}`)
    .setTimestamp()
    .setFooter("FauxBot Help Command");

    return message.channel.send(hembed);
}

if (this.bot.categories.includes(args[0])) {
    const cmds = this.bot.commands.filter(c => c.conf.category === args[0].toLowerCase())
    let hcembed = new Discord.MessageEmbed()
    .setTitle("FauxBot Help")
    .setAuthor(this.bot.user.tag, this.bot.user.displayAvatarURL())
    .setColor(`RANDOM`)
    .addField("Commands", cmds.map(c => `${c.help.name} ${c.help.description}`))
    .setTimestamp()
    .setFooter("FauxBot Help Command");

   return message.channel.send(hcembed);
}

const cmd = this.bot.commands.get(args[0])
if (cmd) {
    let hcmdembed = new Discord.MessageEmbed()
    .setTitle("FauxBot Help")
    .setAuthor(this.bot.user.tag, this.bot.user.displayAvatarURL())
    .setColor(`RANDOM`)
    .addField("Commands", `${cmd.help.name} | ${cmd.help.description}`)
    .setTimestamp()
    .setFooter("FauxBot Help Command");

    return message.channel.send(hcmdembed);

}

}
}

module.exports = Help;
