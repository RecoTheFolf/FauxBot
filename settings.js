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
    "developers":["119799610670579714","245419467843174401"],
    "ownerID": "119799610670579714",
	"consoleLevel": "info",
    "fileLevel": "info",
perms:{
    0: {
        name:"User",
        inherits:[],
        check: (msg) => true
    },

    1:{
        name:"DJ",
        inherits:[],
        check: (msg) => msg.guild ? msg.member.roles.has(`roleIDHere`) : false
    },
    2:{
        name:"Moderator",
        inherits:[],
        check: (msg) => msg.guild ? msg.member.permissions.has(['BAN_MEMBERS','KICK_MEMBERS']): false 
        //check: (msg) => msg.guild ? msg.member.roles.has(): false
    }
    //etc
}

}

module.exports = settings;