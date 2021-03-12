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

    let date = new Date();
    let hourNow = date.getHours();

    console.log("current hour" + hourNow);

    let numberOfHours = 4;
    let futureHour = 0;

    if (hourNow <= numberOfHours)
    {
        futureHour = hourNow - numberOfHours;
        timeWithinDay();
    }
    else
    {
        futureHour = numberOfHours + hourNow;
        if(futureHour > 23)
        {
            futureHour -= 23;
            timeWithinTomorrow();
        }
        timeWithinDay();
    }

    function timeWithinDay()
    {
        console.log("time is within the day")
        console.log("current hour" + hourNow);
        console.log(futureHour);
        let minHour = hourNow;
        let maxHour = futureHour;
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
    
    }

    function timeWithinTomorrow()
    {
        console.log("time is until tomorrow")
        console.log("current hour" + hourNow);
        console.log(futureHour);
        let minHour_A = hourNow;
        let maxHour_A = 23;
        let minHour_B = 0;
        let maxHour_B = futureHour;
        let minMin = Math.ceil(0);
        let maxMin = Math.floor(59);
        let minSec = Math.ceil(0);
        let maxSec = Math.floor(59);
    
        // randomize the hours, minutes and seconds    
        for (let i = 0; i < SCHEDULE_AMOUNT; i++)
        {
            let min = Math.floor(Math.random() * (maxMin - minMin) + minMin);
            rngMin.push(min);
    
            let sec = Math.floor(Math.random() * (maxSec - minSec) + minSec);
            rngSec.push(sec);
        }

        // randomize the two sets of hours
        for (let j = 0; j < SCHEDULE_AMOUNT/2; j++)
        {
            let hour_A = Math.floor(Math.random() * (maxHour_A - minHour_A) + minHour_A);
            rngHour.push(hour_A);

            let hour_B = Math.floor(Math.random() * (maxHour_B - minHour_B) + minHour_B);
            rngHour.push(hour_B);
        }
    }

    
    // sort rngHour , rngMin , rngSec in ascending order
    rngHour.sort(compareNumbers);
    rngMin.sort(compareNumbers);
    rngSec.sort(compareNumbers);

    // prints the schedule of each ping in console
    for (let j = 0; j < SCHEDULE_AMOUNT; j++)
    {
        arrNumber = j + 1;

        console.log("\n" + arrNumber + ". Hours:" + rngHour[j]);
        console.log(arrNumber + ". Minutes:" + rngMin[j]);
        console.log(arrNumber + ". Seconds:" + rngSec[j] );
    }

    const runScheduledNotif = (index) => {
        if (index === 7)
        {
            message.channel.send('Last Hydrate Ping for the meantime :ocean:');
        }
        sendHydrateMsg(message);
    }

    const crons = Array(SCHEDULE_AMOUNT).fill().map((item, index) => {
        const notifCron = new cron.CronJob(`${rngSec[index]} ${rngMin[index]} ${rngHour[index]} * * *`, () => {
            runScheduledNotif(index);
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