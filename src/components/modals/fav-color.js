module.exports = {
    data: {
        name: `fav-color`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `You sait your favorite color is: ${interaction.fields.getTextInputValue("favColorInput")}`
        });
    }
}