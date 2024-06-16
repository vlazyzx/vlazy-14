const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  // Definisikan data untuk command slash 'ping'
  data: new SlashCommandBuilder()
    .setName("modals") // Nama command 'ping'
    .setDescription("replies a modal!"), // Deskripsi command 'ping'

  // Fungsi execute untuk menangani interaksi 'ping'
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId(`fav-color`)
      .setTitle(`fav-color!`);

    const textInput = new TextInputBuilder()
      .setCustomId("favColorInput")
      .setLabel(`why is your favorite color?`)
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

      modal.addComponents(new ActionRowBuilder().addComponents(textInput));

      await interaction.showModal(modal);
  },
};
