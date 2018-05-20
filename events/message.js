module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run(message) {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefixes = this.bot.prefixes

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: this.bot.botconfig.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;
    if (!message.content.startsWith(prefix)) return;


    //let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = this.bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(message,args);
}

}

