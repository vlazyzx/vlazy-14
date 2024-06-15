const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription('Return an embed.'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('This is an embed')
            .setDescription('This is a very cool description!')
            .setColor(0x18e1ee)
            .setImage(client.user.displayAvatarURL()) // Corrected this line
            .setThumbnail(client.user.displayAvatarURL()) // Corrected this line
            .setTimestamp(Date.now()) // Corrected this line
            .setAuthor({
                url: 'https://linktree-vlazyzx.vercel.app/',
                iconURL: interaction.user.displayAvatarURL(), // Corrected this line
                name: interaction.user.tag
            })
            .setFooter({
                iconURL: client.user.displayAvatarURL(), // Corrected this line
                text: client.user.tag // Corrected this line
            })
            .setURL('https://linktree-vlazyzx.vercel.app/')
            .addFields([
                {
                    name: 'Field 1',
                    value: 'This is a field',
                    inline: true
                },
                {
                    name: 'Field 2',
                    value: 'This is another field',
                    inline: true
                },
            ]);

        await interaction.reply({
            embeds: [embed]
        });
    },
};

