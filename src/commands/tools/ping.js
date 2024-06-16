const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  // Definisikan data untuk command slash 'ping'
  data: new SlashCommandBuilder()
    .setName("ping") // Nama command 'ping'
    .setDescription('replies with "Pong!'), // Deskripsi command 'ping'

  // Fungsi execute untuk menangani interaksi 'ping'
  async execute(interaction, client) {
    // Menunda balasan untuk mengambil respon
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    // Hitung latensi API dan ping klien
    const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${
      message.CreateTimestamp - interaction.CreateTimestamp
    }`;

    // Edit balasan dengan hasil perhitungan
    await interaction.editReply({
      content: newMessage,
    });
  },
};
