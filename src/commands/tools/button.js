const {
  SlashCommandBuilder, // Mengimport SlashCommandBuilder dari paket discord.js
  ActionRowBuilder, // Mengimport ActionRowBuilder dari paket discord.js
  ButtonBuilder, // Mengimport ButtonBuilder dari paket discord.js
  ButtonStyle, // Mengimport ButtonStyle dari paket discord.js
} = require("discord.js"); // Mengimpor modul discord.js untuk membangun interaksi Discord

module.exports = {
  data: new SlashCommandBuilder() // Mendefinisikan data untuk command slash baru
    .setName("button") // Menetapkan nama command "button"
    .setDescription("replies a button!"), // Menetapkan deskripsi command

  async execute(interaction, client) {
    // Fungsi eksekusi untuk menangani interaksi
    const button = new ButtonBuilder() // Membuat objek tombol baru
      .setCustomId("sub-yt") // Menetapkan ID kustom untuk tombol
      .setLabel("Click Me!") // Menetapkan label teks tombol
      .setStyle(ButtonStyle.Primary); // Menetapkan gaya tombol (warna primer)

    await interaction.reply({
      // Merespons interaksi dengan komponen (tombol) yang telah dibuat
      components: [new ActionRowBuilder().addComponents(button)], // Menambahkan tombol ke dalam baris tindakan
    });
  },
};
