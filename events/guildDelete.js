module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run(guild) {
  const Discord = require('discord.js');
  const DBL = require("dblapi.js");
  const tokens = require("../token.js");
  const dbl = new DBL(tokens.dblKey, bot)

await this.bot.settings.get(guild.id).delete().run().catch(console.log); //Delete server from database
console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
//this.bot.channels.get('450174829832830976').send(`I have been removed from: ${guild.name} (id: ${guild.id})`);
let glembed = new Discord.MessageEmbed()
    .setAuthor(this.bot.user.tag, this.bot.user.displayAvatarURL())
    .setColor("RED")
    .setThumbnail("https://i.imgur.com/UmW0gpm.png", true)
    .setDescription("Left Guild!")
    .addField("Left Guild:", `${guild.name}`)
    .addField("ID: ", `${guild.id}`)
    .setTimestamp()
    .setFooter("Left Guild..");
    this.bot.channels.get('450174829832830976').send(glembed);
    this.bot.user.setActivity("--help" + `\nin ${this.bot.guilds.size} server(s)` + `\nwith ${this.bot.users.size} users!`);
    dbl.postStats(this.bot.guilds.size);

}

}
