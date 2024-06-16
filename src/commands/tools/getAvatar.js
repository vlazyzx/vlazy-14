const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");

module.exports = {
  // Definisikan data untuk command slash 'ping'
  data: new ContextMenuCommandBuilder()
    .setName("getAvatar") // Nama command 'ping'
    .setType(ApplicationCommandType.User),

  // Fungsi execute untuk menangani interaksi 'ping'
  async execute(interaction, client) {
    await interaction.reply({
      content: `${interaction.targetUser.displayAvatarURL()}`,
    });
  },
};
