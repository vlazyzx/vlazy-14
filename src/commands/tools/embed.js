const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Return an embed."),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("This is an embed") // Menetapkan judul untuk embed
      .setDescription("This is a very cool description!") // Menetapkan deskripsi untuk embed
      .setColor(0x18e1ee) // Menetapkan warna embed dengan menggunakan kode hex
      .setImage(client.user.displayAvatarURL()) // Menetapkan gambar besar di embed
      .setThumbnail(client.user.displayAvatarURL()) // Menetapkan thumbnail (gambar kecil) di embed
      .setTimestamp(Date.now()) // Menetapkan timestamp embed dengan waktu saat ini
      .setAuthor({
        // Menetapkan informasi pengarang embed
        name: interaction.user.tag, // Menetapkan nama pengguna yang memicu interaksi
        iconURL: interaction.user.displayAvatarURL(), // Menetapkan avatar pengguna yang memicu interaksi
        url: "https://linktree-vlazyzx.vercel.app/", // Menetapkan URL pengarang (opsional)
      })
      .setFooter({
        // Menetapkan footer embed
        text: client.user.tag, // Menetapkan teks footer dengan tag pengguna bot
        iconURL: client.user.displayAvatarURL(), // Menetapkan avatar pengguna bot sebagai ikon footer
      })
      .setURL("https://linktree-vlazyzx.vercel.app/") // Menetapkan URL embed (opsional)
      .addFields([
        // Menambahkan field atau bidang di embed
        {
          name: "Field 1", // Menetapkan nama field pertama
          value: "This is a field", // Menetapkan nilai atau isi field pertama
          inline: true, // Menetapkan field pertama sebagai inline (dalam satu baris dengan field lainnya)
        },
        {
          name: "Field 2", // Menetapkan nama field kedua
          value: "This is another field", // Menetapkan nilai atau isi field kedua
          inline: true, // Menetapkan field kedua sebagai inline
        },
      ]);

    await interaction.reply({
      embeds: [embed], // Merespon interaksi dengan embed yang telah dibuat
    });
  },
};
