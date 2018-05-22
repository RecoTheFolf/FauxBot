module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run(message) {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

   const settings = message.guild ? await this.bot.settings.get(message.guild.id).getField('settings').run() :  this.bot.defaultSettings

console.log(settings)

    if (!message.content.startsWith(settings.prefix.value)) return;
console.log(1)

    //let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = this.bot.commands.get(cmd.slice(settings.prefix.value.length));
    console.log(commandfile)
    if(commandfile) commandfile.run(message,args);
}

}

