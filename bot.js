//Setup
process.title = 'FauxBot'
var Config
try {
    Config = require('./settings.js')
  } catch (e) {
    console.log('\nFauxBot encountered an error while trying to load the config file, please resolve this issue and restart the bot\n\n' + e.message)
    process.exit()
  }

//load constants
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir)
const bottoken = require("./token.json");
const Discord = require("discord.js");
const r = require('rethinkdbdash')({db:`FauxBot`})();

class FDBot extends Discord.Client {
    constructor(options) {
super({fetchAllMembers:true,disableEveryone:true}); //Cache users so that there's no errors when members are mentioned + Disable @everyone
        this.commands = new Discord.Collection();
        this.streamData = new Discord.Collection();
        this.botconfig = require("./settings.js");
        this.prefixes= require('./prefixes.js')
        this.events = new Discord.Collection();
        this.settings = r.table('settings')
        this.config = require('./settings.js')
    }//Close constructor
}//Close class

const bot = new FDBot(); //Boot

const fs = require("fs");
require("./functions.js")(bot);//Load useful functions into client/bot for easy grabbing

const init = async () => {
    await fs.readdir("./commands/", (err, files) => {
            if(err) console.info(err);
            let jsfiles = files.filter(f => f.split(".").pop() === "js");
            if(jsfiles.length <= 0) {
                console.info("Couldn't find commands.");
                return;
            }
        
            console.info(`Loading ${jsfiles.length} commands!`);
        
            jsfiles.forEach((f, i) => {
                const props = new (require(`./commands/${f}`))(bot);
                console.info(`${i + 1}: ${f} loaded!`);
                bot.commands.set(props.help.name, props);
            });
        });

    const eventFiles = await readdir('./events')
    console.log("Loading Events...")
    eventFiles.forEach(f => {
        const eventName = f.split('.')[0]
        console.log(`Loaded the ${eventName} event`)
        const event = new (require(`./events/${f}`))(bot);
        bot.on(eventName, (...args) => event.run(...args))
    })
    bot.login(bottoken.token)
}

init();