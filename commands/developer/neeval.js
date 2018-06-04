const Command = require("../../base/Cmds.js");
const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const r = require("rethinkdbdash")({ db: "FauxBot" });
const youtube = require('simple-youtube-api')


class Eval extends Command {
  constructor(client) {
    
    super(client, {
      name: "neeval",
      description: "Evaluates arbitrary Javascript.",
      level:"Bot Developer",
      usage:"<code>"
    });
    
  }

  async run(message, args, level) {

    const YouTube = new youtube(this.bot.tokens.ytKey)
    const client = this.bot
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
