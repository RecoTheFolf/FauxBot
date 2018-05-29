module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run(message) {

    if(message.author.bot) return;

   const settings = message.guild ? await this.bot.settings.get(message.guild.id).getField('settings').run() :  this.bot.sets
const msg = message
    if (!message.content.startsWith(settings.prefix)) return;

    //let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = this.bot.commands.get(cmd.slice(settings.prefix.length));

    if(!commandfile) return;
    if (commandfile.conf.guildOnly && message.channel.type === 'dm') return message.channel.send("This command cannot be used in DM's")
    
    const status = await commandfile.run(message,args);
    if (status && status.constructor.name === 'Array') {
    message.channel.send(`${message.author.toString()} ${status[0] ? `${this.bot.emojis.get(`450167691240669186`).toString()} `: `:x:`} ${status[1]}`)
    }
}

}

