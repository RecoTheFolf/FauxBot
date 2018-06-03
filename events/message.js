const Discord = require('discord.js')

module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run(message) {

    if(message.author.bot) return;

   const settings = message.guild ? await this.bot.settings.get(message.guild.id).getField('settings').run() :  this.bot.sets
const msg = message
    if (!message.content.startsWith(settings.prefix)) return;

    message.settings = message.guild ? message.guild.settings : null //Easy access > less parameters needed
    message.bot = this.bot
    //let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = this.bot.commands.get(cmd.slice(settings.prefix.length));

    
    if(!commandfile) return;
    if (commandfile.conf.guildOnly && message.channel.type === 'dm') return message.channel.send("This command cannot be used in DM's")
    
    const level = this.bot.config.perms.filter(p => p.check(message)).pop()
    const local = this.bot.config.perms.filter(p => p.check(message) && p.level < this.bot.config.staffThreshold).pop()

    const needed = this.bot.config.perms.filter(p => p.name === commandfile.conf.level)[0]
    if (!level.inherits.includes(needed.level) && !local.inherits.includes(needed.level) && level.level != needed.level && local.level != needed.level) return message.channel.send(`You need to be a \`${this.bot.config.perms.filter(p => p.name === commandfile.conf.level)[0].name}\` to use this command.  You are a \`${this.bot.config.perms.filter(p => p.check(message) && p.level < this.bot.config.staffThreshold).pop().name}\``)
    
if (message.channel.type != 'dm') {
const permsNeeded = commandfile.conf.perms
let vneeds = []
let cneeds = []
const tperms = message.channel.permissionsFor(message.guild.me).serialize()
const vperms = message.member.voiceChannel ? message.member.voiceChannel.permissionsFor(message.guild.me).serialize() : null
const has = new Discord.Collection()

permsNeeded.forEach(p => {if (!tperms[p]) cneeds.push(p) })
console.log(cneeds)
if (cneeds.length > 0) return message.channel.send(`The bot requires I have the following permissions in the text channel: ${cneeds}`);

if (vperms) {
    permsNeeded.forEach(p => {if (!vperms[p]) vneeds.push(p) })
    if (vneeds.length > 0) return message.channel.send(`The bot requires I have the following permissions in the voice channel: \`${vneeds.join('`, `')}\``);
}
}

    const status = await commandfile.run(message,args);
    if (status && status.constructor.name === 'Array') {
    message.channel.send(`${message.author.toString()} ${status[0] ? `${this.bot.emojis.get(`450167691240669186`).toString()} `: `:x:`} ${status[1]}`)
    }
}

}

