const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Returns a select menu."),

  async execute(interaction, client) {
    // Membuat StringSelectMenuBuilder untuk membuat menu dropdown
    const menu = new StringSelectMenuBuilder()
      .setCustomId(`sub-name`) // Menetapkan ID kustom untuk dropdown menu
      .setMinValues(1) // Menetapkan nilai minimal yang dapat dipilih (1)
      .setMaxValues(1) // Menetapkan nilai maksimal yang dapat dipilih (1)
      .addOptions(
        // Menambahkan opsi-opsi dropdown menu
        new StringSelectMenuOptionBuilder({
          label: "Option #1", // Label untuk opsi pertama
          value: "https://youtube.com/", // Nilai yang akan dikembalikan saat opsi dipilih
        }),
        new StringSelectMenuOptionBuilder({
          label: "Option #2", // Label untuk opsi kedua
          value: "https://linktree-vlazyzx.vercel.app/", // Nilai yang akan dikembalikan saat opsi dipilih
        })
      );

    // Merespon interaksi dengan dropdown menu yang telah dibuat
    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
