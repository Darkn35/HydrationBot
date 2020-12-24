function hydrationMessage(message)
{
    let myRole = message.guild.roles.cache.find(role => role.name === "Hydrate Ping");

    minMsg = Math.ceil(0);
    maxMsg = Math.floor(10);

    // randomize message to use
    let messagePing = Math.floor(Math.random() * (maxMsg - minMsg) + minMsg);

    let messages = [
        () => ` it is time to drink water bois.`,
        () => ` :ocean:`,
        () => ` wake up samurai, we have water to gulp down.`,
        () => {
            let timeNow = new Date();
            const timeMessage = timeNow.toLocaleTimeString();
            return ` honey, it's **${timeMessage}**, time to drink your water`;
        },
        () => {
            const yesHoneyEmote = message.client.emojis.cache.find(emoji => emoji.name === "yeshoney");
            if (yesHoneyEmote == `undefined`)
            {
                return ` :pensive:`;
            }
            else
            {
                return ` ${yesHoneyEmote}`;
            }
        },
        () => ` **drink** up gamers.`,
        () => ` **tara suntukan, pero inom ka muna tubig.**`,
        () => ` stay hydrated.`,
        () => ` inom na ng tubig, mga hatdog.`,
        () => ` inom ng tubig kung ayaw niyong makakita ng galit na (ate) ryn.`,
        () => ` ~~drink water for pakistan~~`
    ];
    let messageContent = messages[messagePing]();

    return message
        .channel
        .send(`${myRole} ${messageContent}`)
        .then(message => {
            message.react("🌊")
        });
}

module.exports = hydrationMessage;
