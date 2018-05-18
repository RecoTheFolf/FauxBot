const validStatuses = [
    {
        internal: 'online',
        display: 'online',
        emoji: ':zap:'
    },
    {
        internal: 'idle',
        display: 'idle',
        emoji: ':beach_umbrella:'
    },
    {
        internal: 'dnd',
        display: 'do-not-disturb',
        emoji: ':mute:'
    },
    {
        internal: 'invisible',
        display: 'invisible',
        emoji: ':ghost:'
    }
];

const Discord = require("discord.js");
const validStatusRegex = new RegExp(`^(${validStatuses.map(status => status.internal).join('|')})$`);
const validStatusString = validStatuses.map(status => `\`${status.internal}\``).join(', ');

module.exports.run = async (bot, msg, args) => {
    if (args.length < 1 || !validStatusRegex.test(args[0])) {
        throw `Please provide a status to set: ${validStatusString}`;
    }

    const status = validStatuses.find(status => status.internal === args[0].toLowerCase());

    let uEmbed = new Discord.RichEmbed()
    .setDescription("Status")
    .addField("Set the status to", `${status.display}`);

    return msg.channel.send(uEmbed);

    bot.user.setStatus(status.internal);
};

module.exports.help = {
    name: 'status',
    usage: `status <${validStatuses.map(status => status.internal).join('|')}>`,
    description: 'Sets the status'
};