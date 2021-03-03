const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
    disableEveryone: true,
  });
const config = require("./botconfig.json");
const fetch = require('node-fetch');
const port = config.PORT;
const replnamet = config.REPLNAME;
const replname = replnamet.toUpperCase();
const usernamet = config.USERNAME;
const username = usernamet.toLowerCase();
const domaint = config.DOMAIN;
const domain = domaint.toLowerCase();
const addresst = config.ADDRESS;
const address = addresst.toLowerCase();
// const token = config.token;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
client.prefix = config.prefix;


["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
  });
 
  client.on('guildMemberAdd', async member => {
    require("./events/guild/memberAdd")(member)
  })
  
  client.on('guildMemberRemove', async (message) => {
    require("./events/guild/memberRemove")(message)
  })
  
  setInterval(async () => {
     await fetch(`${address}://${replname}.${username}.${domain}/`)
  }, 240000);

  client.login(process.env.TOKEN);
