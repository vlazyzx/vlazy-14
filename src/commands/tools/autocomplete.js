const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  // Definisikan data untuk command slash 'ping'
  data: new SlashCommandBuilder()
    .setName("autocomplete") // Nama command 'ping'
    .setDescription("return autocompletes")
    .addStringOption((option) =>
      option
        .setName("colour")
        .setDescription("A colour based on autocomplate.")
        .setAutocomplete(true)
        .setRequired(true)
    ), // Deskripsi command 'ping'

  // Fungsi execute untuk menangani interaksi 'ping'
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = ["red", "blue", "yellow", "green", "purple", "pink"];
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction, client) {
    const option = interaction.options.getString("colour");
    await interaction.reply({ content: `You told me, "${option}"` });
  },
};
