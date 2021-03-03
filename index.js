const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
    disableEveryone: true,
  });
const config = require("./botconfig.json");
const http = require("http");
const port = config.PORT;
const replnamet = config.REPLNAME;
const replname = replnamet.toUpperCase();
const usernamet = config.USERNAME;
const username = usernamet.toLowerCase();
const domaint = config.DOMAIN;
const domain = domaint.toLowerCase();
const addresst = config.ADDRESS;
const address = addresst.toLowerCase();
const httptime = config.ONLINETIME;
// const token = config.token;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
client.prefix = config.prefix;
const mongoose = require('mongoose');

const reconDB = require("reconlx");

const mongourl = process.env.MONGOURL;

mongoose.connect(mongourl, {

  useNewUrlParser: true,

  useUnifiedTopology: true,

}).then(console.log(`  CONNECTED TO MONGO DB!
  LINK: ${mongourl}`))



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
  http.get(`${address}://${replname}.${username}.${domain}/`);
  }, httptime);

  client.login(process.env.TOKEN);
