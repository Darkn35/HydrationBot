const Discord = require("discord.js");
require('dotenv').config();

const { ping, hydrate, start, stop, daily, help } = require('./commands/messageCommands');

const client = new Discord.Client();

// bot prefix is "hb!"
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

    // recieves user commands
    let action = message => message.channel.send('Command does not exist.');
    try
    {
        action = commands[command];
    }
    catch(TypeError) {}
    if(action)
        action(message);
    else
        message.channel.send('Command does not exist.');
});
client.login(process.env.BOT_TOKEN);
