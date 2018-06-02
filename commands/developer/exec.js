const exec = require('child_process').exec;
const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js');

class Exec extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'exec',
          description: "Executes any command",
          usage: "exec google.com",
          level:"Bot Developer"
      })
  }

async run(message, args, level) {
    let token = this.bot.token;
    let yttoken = this.bot.tokens.ytKey;
    let devtoken = this.bot.tokens.devToken;
    let settings = this.bot.config;
    exec(`${args.join(' ')}`, (error, stdout, stderr) => {
      stdout = stdout.replace(token, "No, bad!")
      stdout = stdout.replace(yttoken, "No, bad!")
      stdout = stdout.replace(devtoken, "No, bad!")
      stdout = stdout.replace(settings, "No, bad!")
      const response = (error || stdout);
      message.channel.send(`Ran: ${args.join(" ")}\n${response}`, {code: "asciidoc", split: "\n"}).catch(console.error);
    });
}
}

module.exports = Exec;