const Command = require('../../base/Cmds.js');
const Discord = require("discord.js");

class Help extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'help',
          description: "Return useful information on commands or settings",
          usage: "help [command]",
          perms:['EMBED_LINKS']
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
    .addField("Commands", `${cmd.help.name} | ${cmd.help.description} \n\n**Usage**: \n${cmd.help.usage}`)
    .setTimestamp()
    .setFooter("FauxBot Help Command");

    return message.channel.send(hcmdembed);
}

const set = this.bot.config.defaultSettings[args[0].toLowerCase()]

if (set) {
    let hsetembed = new Discord.MessageEmbed()
    .setTitle("FauxBot Help")
    .setAuthor(this.bot.user.tag, this.bot.user.displayAvatarURL())
    .setColor(`RANDOM`)
    .addField("Command Usage", `${args[0].toLowerCase()} \n\nDescription: ${set.description}\nDefault: \`${set.value}\``)
    .setTimestamp()
    .setFooter("FauxBot Help Command");

    return message.channel.send(hsetembed);

}

}
}

module.exports = Help;
