module.exports = {
  data: {
    name: `sub-menu`, // Nama dari command slash
  },
  async execute(interaction) {
    try {
      // Merespons interaksi dengan bot
      await interaction.reply({
        content: `Anda memilih: ${interaction.values[0]}`, // Merespons dengan opsi yang dipilih
        ephemeral: true, // Opsional: membuat respon hanya terlihat oleh pengguna yang memicu interaksi
      });
    } catch (error) {
      console.error("Error handling interaction:", error); // Menampilkan pesan kesalahan jika terjadi masalah dalam penanganan interaksi
    }
  },
};
