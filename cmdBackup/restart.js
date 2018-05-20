const Discord = require('discord.js');
const config =  require('../settings.json');

module.exports.run = async(bot, message, args) =>{
  let embed = new Discord.RichEmbed()
  .setTitle("Restart")
  .setDescription("Sorry, the `restart` command can only be executed by the Bot Owner!")
  .setColor("#cdf785");
  if(message.author.id !== config.ownerID) return message.channel.send(embed);
  
message.channel.send(`Restarted in ${Math.floor(bot.ping)}ms`).then(() =>{
process.exit(1);
})
 

                                           }
module.exports.help = {
name: "restart"
}
             