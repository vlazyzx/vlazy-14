require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter((file) => file.endsWith('.js'));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

client.once('ready', async () => {
    console.log('Bot is online!');

    const guild = await client.guilds.fetch('1251209159454625937');
    if (!guild) {
        console.error('Bot is not part of the specified guild.');
        return;
    }
    console.log('Bot is part of the guild.');

    client.handleEvents();
    client.handleCommands();
});

client.login(process.env.TOKEN)
    .then(() => console.log('Bot logged in successfully'))
    .catch(console.error);
