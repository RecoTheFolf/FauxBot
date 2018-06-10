const settings = {
    "prefix": "--",
    "white": "#ffffff",
    "red": "#ff0000",
    "orange": "#ffa500",
    "yellow": "#ffff00",
    "green": "#00ff00",
    "blue": "#0000ff",
    "purple": "#551a8b",
    "limegreen": "#2dfc4c",
	"consoleLevel": "info",
    "fileLevel": "info",
    developers:["245419467843174401"],
    supportStaff:[],
    ownerID: ["119799610670579714"],
    staffThreshold:5,//This will define the break between bot staff and normal users.  5 means any level 5 and above are separate from the lower levels
    defaultSettings: {
     
         prefix: {
        name:'prefix',
         value:'--',
         description:'Set the prefix for the bot',
         set: async (value,guild) => value, //This function sets the value
         view: (settings) => settings.prefix //For viewing the setting
         },
//Role-based settings
         djrole: {
             name:'djrole',
             value:null,
             description:"Set the role that allows users to use music commands.",
             set: async (value,guild) => {
                 try {
                     if (value === "off" || value === "disable") return 0
                if (guild.roles.get(value)) return value;
                if (guild.roles.find(role => role.name.toLowerCase() === value.toLowerCase())) return guild.roles.find(role => role.name.toLowerCase() === value.toLowerCase()).id;
                 } catch(e) {
                     return null
                 }
             },
             view: (settings,guild) => {
                 if (guild.roles.get(settings.djrole)) return guild.roles.get(settings.djrole).name;
                 return
             } 
         },
         //Logs-based settings
         modlogs:{
            name:'modlogs',
            value:null,
            description:'Set the channel for where moderation logs should be stored',
            set: async (value, guild) => {
                try {
                if (value === "off" || value === "disable") return 0
                if (guild.channels.get(value)) return value
                if (guild.channels.find(c => c.name.toLowerCase() === value.toLowerCase())) return guild.channels.find(c => c.name.toLowerCase() === value.toLowerCase()).id;
                } catch(e) {
                    return null
                }
            },
            view: (settings,guild) => guild.channels.get(guild.settings.modlogs) ? guild.channels.get(guild.settings.modlogs).name : null
        }
    },
perms:[
    {
        name:"Server Member",
        level:0,
        inherits:[],
        check: (msg) => true
    },{
        name:"Server DJ",
        level:1,
        inherits:[0],
        check: (msg) => msg.guild ? msg.member.roles.has(msg.settings.djRole) : false
    },{
        name:"Server Moderator",
        level:2,
        inherits:[0,1],
        check: (msg) => msg.guild ? msg.member.permissions.has(['BAN_MEMBERS','KICK_MEMBERS']): false 
        //check: (msg) => msg.guild ? msg.member.roles.has(): false
    },
    {name:"Server Admin",
level:3,
inherits:[0,1,2],
check: (msg) => msg.guild ? msg.member.permissions.has(['MANAGE_SERVER']) : false
},
{
    name:"Server Owner",
    level:4,
    inherits:[0,1,2,3],
    check: (msg) => msg.guild ? msg.guild.owner.user.id === msg.author.id : false
},
{
    name:"Bot Support",
    level:5,
    inherits:[],
    check:(msg) => msg.bot.config.supportStaff.includes(msg.author.id)
},
{
    name:"Bot Developer",
    level:6,
    inherits:[3,2,1],
    check:(msg) => msg.bot.config.developers.includes(msg.author.id)
},
    {
        name:'Bot Owner',
        level:8,
        inherits:[6,3,2,1],
        check: (msg) => msg.bot.config.ownerID.includes(msg.author.id)
    }
    //etc
]

}

module.exports = settings;
