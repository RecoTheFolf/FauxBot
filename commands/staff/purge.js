const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js')

class Purge extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'purge',
          description: "Purge a certain amount of messages",
          guildOnly:true,
          usage: "purge <amount>"
      })
  }

  async run(message, args, tools) {
    if(!message.member.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "ADMINISTRATOR");
    if (isNaN(args[0])) return message.channel.send('**Please supply a valid amount of messages to purge**');

    if (args[0] > 100) return message.channel.send('**Please supply a number less than 100**');

    message.delete()
    message.channel.bulkDelete(args[0])
    .then( messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages**`).then( msg => msg.delete({timeout: 2500})))
    .catch( error => message.channel.send(`**Error:** ${error.message}`));

  }
}
module.exports = Purge;