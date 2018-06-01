const Command = require("../../base/Cmds.js");
const Discord = require("discord.js");
const { promisify } = require("util");
const config = require("../../settings.js")
const readdir = promisify(require("fs").readdir);
const r = require("rethinkdbdash")({ db: "FauxBot" });
const youtube = require('simple-youtube-api')


class Neeval extends Command {
  constructor(bot) {
    
    super(bot, {
      name: "neeval",
      description: "Evaluates arbitrary Javascript without embeds.",
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
      message.channel.send(`\`\`\`js\n${clean(evaled).replaceAll(this.bot.token, "No, bad!")}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await this.bot.clean(this.bot, err)}\n\`\`\``);
    }
  }
}

module.exports = Neeval;
