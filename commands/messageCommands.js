const cron = require("cron");

const sendHydrateMsg = require('./hydrationMessage');
const sendScheduledMsg = require('./scheduledMessage');

let stopper = () => {};

// command functions
function ping(message)
{
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
}

function hydrate(message)
{
    sendHydrateMsg(message);
}

function start(message)
{
    message.channel.send('Got it!');
    const { stopCrons } = sendScheduledMsg(message);
    stopper = stopCrons;
}

function stop(message)
{
    stopper();
    stopper = () => {};
    message.channel.send('Stopped all scheduled notifications.');
    console.log("Stopped.")
}

function daily(message)
{
    message.channel.send('Daily notifications, got it!');
    sendScheduledMsg(message);
    let dailyNotif = new cron.CronJob('* * 12 * * *', () =>
    {
        sendScheduledMsg(message);
    }); 
    dailyNotif.start();
}

function help(message)
{
    message.channel.send(
        `hb!ping - gets your ping.\n`
        + `hb!hydrate - hydrate ping.\n`
        + `hb!start - hydrate ping for today | Only Ron can use this.\n`
        + `hb!daily - hydrate ping daily | Only Ron can use this.`
    );
}

exports.ping = ping;
exports.hydrate = hydrate;
exports.start = start;
exports.stop = stop;
exports.daily = daily;
exports.help = help;
