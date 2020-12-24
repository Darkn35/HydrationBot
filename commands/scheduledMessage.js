const cron = require("cron");

const SCHEDULE_AMOUNT = 8;

const sendHydrateMsg = require('./hydrationMessage');

// function to sort numbers in ascending order
function compareNumbers(a, b) {
    return a - b;
}

function scheduledMessage(message) {

    let myRole = message.guild.roles.cache.find(role => role.name === "Hydrate Ping");

    let rngHour = [];
    let rngMin = [];
    let rngSec = [];

    let minHour = Math.ceil(0);
    let maxHour = Math.floor(23);
    let minMin = Math.ceil(0);
    let maxMin = Math.floor(59);
    let minSec = Math.ceil(0);
    let maxSec = Math.floor(59);

    // randomize the hours, minutes and seconds    
    for (let i = 0; i < SCHEDULE_AMOUNT; i++)
    {
        let hour = Math.floor(Math.random() * (maxHour - minHour) + minHour);
        rngHour.push(hour);

        let min = Math.floor(Math.random() * (maxMin - minMin) + minMin);
        rngMin.push(min);

        let sec = Math.floor(Math.random() * (maxSec - minSec) + minSec);
        rngSec.push(sec);
    }

    // sort rngHour in ascending order
    rngHour.sort(compareNumbers);

    // prints the schedule of each ping in console
    for (let j = 0; j < SCHEDULE_AMOUNT; j++)
    {
        arrNumber = j + 1;

        console.log("\n" + arrNumber + ". Hours:" + rngHour[j]);
        console.log(arrNumber + ". Minutes:" + rngMin[j]);
        console.log(arrNumber + ". Seconds:" + rngSec[j] );
    }

    const runScheduledNotif = () => {
        sendHydrateMsg(message);
    }

    const crons = Array(SCHEDULE_AMOUNT).fill().map((item, index) => {
        const notifCron = new cron.CronJob(`${rngSec[index]} ${rngMin[index]} ${rngHour[index]} * * *`, () => {
            runScheduledNotif();
            notifCron.stop();
        });
        notifCron.start();
        return notifCron;
    });

    // for debugging purposes
    const stopCrons = () => {
        for(const cron of crons)
        {
            console.log(`Running ${cron.running} Next Date: ${cron.nextDate}`);
            cron.stop();
            console.log(`Running ${cron.running} Next Date: ${cron.nextDate}`);
        }
    }

    return {
        stopCrons
    };
}

module.exports = scheduledMessage;