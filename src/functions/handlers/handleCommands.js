const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
                console.log(`Command ${command.data.name} has been loaded.`);
            }
        }

        const clientId = '1251214703083130983';
        const guildId = '1251209159454625937';
        console.log(`Client ID: ${clientId}`);
        console.log(`Guild ID: ${guildId}`);

        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        try {
            console.log('Started refreshing application (/) commands.');

            const response = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: client.commandArray }
            );

            console.log('Successfully reloaded application (/) commands.');
            console.log('Response:', response);
        } catch (error) {
            console.error('Error while refreshing application (/) commands:', error);
        }
    };
};
