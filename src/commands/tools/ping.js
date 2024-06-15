const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
     .setName('ping')
     .setDescription('replies with "Pong!'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.CreateTimestamp - interaction.CreateTimestamp}`
        await interaction.editReply({
            content: newMessage
        });
    }
}