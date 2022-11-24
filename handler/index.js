const client = require("../index");
const { glob } = require("glob");
const { promisify } = require("util");
const logger = require("../util/logger");
const { ActivityType } = require('discord.js');



const globPromise = promisify(glob);

(async () => {
    const eventFiles = await globPromise(`./events/*.js`);
    eventFiles.map((file) => require(`.${file}`));

    const commandsArray = [];

    const commandFiles = await globPromise(`./commands/*.js`);
    commandFiles.map((file) => {
        const cmd = require(`.${file}`);
        if (!cmd?.name) return;
        client.commands.set(cmd.name, cmd);

        commandsArray.push(cmd);
    });

    client.on("ready", async () => {
        client.user.setActivity('Type /help | 🐸', { type: ActivityType.Watching });
        await client.application.commands.set(commandsArray)
        .then(() => logger.info(`Registered ${commandsArray.length} commands.`))
        .catch((error) => logger.error(`Unable to register commands: ${error}`));
    });
})();
