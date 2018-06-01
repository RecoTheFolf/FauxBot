const Command = require("../../base/Cmds.js");
const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const r = require("rethinkdbdash")({ db: "FauxBot" });
const youtube = require('simple-youtube-api')


class Eval extends Command {
  constructor(bot) {
    
    super(bot, {
      name: "eval",
      description: "Evaluates arbitrary Javascript.",
    });
    
  }

  async run(message, args, level) {

    const YouTube = new youtube(this.bot.tokens.ytKey)
    const client = this.bot
    const bot = this.bot
    //load these resources for easy grabbing

    const code = args.join(" ");
    const settings = message.settings
    const msg = message //for easier reference
    const guild = message.guild ? message.guild : null

    try {
      const evaled = eval(code);
      const clean = await this.bot.clean(this.bot, evaled);
      message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await this.bot.clean(this.bot, err)}\n\`\`\``);
    }
  }
}

module.exports = Eval;


/*

const Discord = require("discord.js");
const config = require("../../settings.js");
const youtube = require('simple-youtube-api');
const Command = require('../../base/Cmds.js');

class Eval extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'eval',
          description: "Evaluates arbitrary javascript code",
          usage: "eval Test",
      })
  }

  async run(message,args) {
    const YouTube = new youtube(this.bot.tokens.ytKey)
    const guild = message.guild ? message.guild : null
    const msg = message
    const settings = message.settings
    const client = this.client

    let embed = new Discord.MessageEmbed()
    .setTitle("Evaluation")
    .setDescription("Sorry, the `eval` command can only be executed by the Bot Developers.")
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
          
    let embed = new Discord.MessageEmbed()
        .setTitle(`Evaluated in ${Math.round(this.bot.ping)}ms`)
        .addField(":inbox_tray: Input", `\`\`\`js\n${code}\n\`\`\``)
        .addField(":outbox_tray: Output", `\`\`\`js\n${clean(evaled).replaceAll(this.bot.token, "No, bad!")}\n\`\`\``)
        .addField('Type', `\`\`\`xl\n${(typeof rawEvaled).substr(0, 1).toUpperCase() + (typeof rawEvaled).substr(1)}\n\`\`\``)
        .setColor('GREEN')
        .setFooter("FauxBot Evaluation Command")
        message.channel.send({embed});
      } catch (err) {
        
       return [0,`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``]
      }
}

}




module.exports = Eval;


*/