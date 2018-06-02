const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js')
const request = require("request");

class e621 extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'e621',
          description: "e621 (Currently broke, please do not test | Will post safe images though in channels)",
          guildOnly:true,
          usage: "currently broke"
      })
  }
  async run (msg, args) {
    var tagstosplit = args.split = ",";
    for (var i = 0; i < tagstosplit.length; i++) {
        tagstosplit[i] = tagstosplit[i].trim();
        tagstosplit[i] = tagstosplit[i].replace(/\s/g, "_");
        tagsto = tagstosplit.join("+"); 

        if (msg.channel.type === "dm" || msg.channel.name.indexOf("the_art_gallery") != -1 || msg.channel.name.indexOf("furry") != -1 || msg.channel.name.indexOf("2am") != -1 || msg.channel.name.indexOf("nsfw") != -1) {
            console.log("Safe to post NSFW content.");
        }
        else {
            tagsto += "+rating:safe";
            if ((tagsto.indexOf("rating:explicit") != -1) || (tagsto.indexOf("penis") != -1) || (tagsto.indexOf("pussy") != -1) || (tagsto.indexOf("anus") != -1) || (tagsto.indexOf("dick") != -1) || tagsto.indexOf("rating:questionable") != -1 || tagsto.indexOf("genitalia") != -1 || tagsto.indexOf("genitals") != -1 || tagsto.indexOf("genital") != -1 || tagsto.indexOf("vagina") != -1 || tagsto.indexOf("cunt") != -1 || tagsto.indexOf("vaginal") != -1 || tagsto.indexOf("vaginal_penetration") != -1 || tagsto.indexOf("sex") != -1 || tagsto.indexOf("fuck") != -1 || tagsto.indexOf("intercourse") != -1 || tagsto.indexOf("cock") != -1) {
                msg.channel.send("That content isn't apppropiate for this channel. Go be naughty elsewhere.");
                return;
            }
        }
        var estoHeader = {
            url: 'https://e621.net/post/index.json?tags=order:random+' + tagsto,
            headers: {
                'User-Agent': 'FauxBot/${process.version}'
            }
        }

        request(estoHeader,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var estoThing = JSON.parse(body);
                if (typeof (estoThing[0]) != "undefined") {
                    msg.channel.send(estoThing[0].file_url.toString());
                    msg.channel.send("https://e621.net/post/show/" + estoThing[0].id.toString());
                }
                else {
                    msg.channel.send("No images found. Try different tags.")
                }
            }
            else {
                console.log(error);
                msg.channel.send("The API isn't working and this is why I'm crashing.");
                msg.channel.send(error);
            }
        });
    }
}
}
module.exports = e621;