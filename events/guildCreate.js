module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run(guild) {
  const Discord = require('discord.js');

await this.bot.settings.insert({id:guild.id,settings:this.bot.sets}).run(); //Add default settings to server DB
guild.settings = await this.bot.settings.get(guild.id).getField('settings').run();
console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
let gcembed = new Discord.MessageEmbed()
    .setAuthor(this.bot.user.tag, this.bot.user.displayAvatarURL())
    .setColor("PURPLE")
    .setThumbnail("https://i.imgur.com/UmW0gpm.png", true)
    .setDescription("New Guild!")
    .addField("New guild joined:", `${guild.name}`)
    .addField("ID: ", `${guild.id}`)
    .addField("Members: ", `${guild.memberCount}`)
    .addField("Channels: ", `${guild.channels.size}`)
    .addField("Roles: ", `${guild.roles.size}`)
    .setTimestamp()
    .setFooter("Joined Guild!");
    this.bot.channels.get('450174829832830976').send(gcembed);
    this.bot.user.setActivity("--help" + `\n\n| in ${this.bot.guilds.size} server(s)!`);
}

}
