const cron = require("cron");

const Discord = require("discord.js");
const config = require("./config.json");

const { ping, hydrate, start, stop, daily, help } = require('./commands/messageCommands');

const client = new Discord.Client();

const prefix = "hb!";

const commands = {
    ping,
    hydrate,
    start,
    stop,
    daily,
    help
};

client.on("ready", function()
{
    console.log("Ready");
})

client.on("message", function(message) 
{ 
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    let action;
    try
    {
        action = commands[command];
    }
    catch(SyntaxError)
    {
        action = message => message.channel.send('Command does not exist.');
    }
    action(message);
    // result.react("🌊");
});

client.login(process.env.BOT_TOKEN);
