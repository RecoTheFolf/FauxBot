const Discord = require("discord.js");
const config = require("../settings.js");
const Command = require('../base/Cmds.js');

class Eval extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'eval',
          description: "Latency of the bot",
      })
  }

  async run(message,args) {
    let embed = new Discord.RichEmbed()
    .setTitle("Evaluation")
    .setDescription("Sorry, the `eval` command can only be executed by the Bot Owner.")
    .setColor("#cdf785");
    if(!config.developers.includes(message.author.id)) return message.channel.send(embed);
    
    function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }try {
        const code = args.join(" ");
        let evaled = eval(code);
        let rawEvaled = evaled;
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled,{depth:0});
          
    let embed = new Discord.RichEmbed()
        .setTitle(`Evaluated in ${Math.round(this.bot.ping)}ms`)
        .addField(":inbox_tray: Input", `\`\`\`js\n${code}\n\`\`\``)
        .addField(":outbox_tray: Output", `\`\`\`js\n${clean(evaled).replace(this.bot.token, "No, bad! :newspaper2:")}\n\`\`\``)
        .addField('Type', `\`\`\`xl\n${(typeof rawEvaled).substr(0, 1).toUpperCase() + (typeof rawEvaled).substr(1)}\n\`\`\``)
        .setColor('GREEN');
        message.channel.send({embed});
      } catch (err) {
        
        message.channel.send(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``);
      }
}

}




module.exports = Eval;