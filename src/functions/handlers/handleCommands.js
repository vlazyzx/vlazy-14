const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commmandFolders = fs.readdirSync("./src/commands");
        for (const folder of commmandFolders) {
            const commandsFiles = fs
                .readdirSync(`./src/comamands/${folder}`)
                .filter((file) => file.endsWith(".js"));

            const { commands, commandsArray } = client;
            for (const file of commandsFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, commands);
                commandsArray.push(command.data.toJSON());
                console.log(`Commands: ${command.data.name} has been passed through the handler`);
            }
        }
    };
};