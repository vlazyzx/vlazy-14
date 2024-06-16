const { SlashCommandBuilder, Collection } = require("discord.js");
const { fetch } = require("undici");

module.exports = {
  // Definisikan data untuk command slash 'ping'
  data: new SlashCommandBuilder()
    .setName("reactor") // Nama command 'ping'
    .setDescription("replies reactions."), // Deskripsi command 'ping'

  // Fungsi execute untuk menangani interaksi 'ping'
  async execute(interaction, client) {
    const message = await interaction.reply({
      content: `React Hare!`,
      fetchReply: true,
    });

    const filter = (reaction, user) => {
        return user.id == interaction.user.id
      };

    message
      .awaitReactions({ filter, max: 4, time: 10000, errors: ["time"] })
      .then((collected) => console.log(collected.size))
      .catch((collected) => {
        console.log(`After a ten seconds, only ${collected.size} out of 4 reacted`);
      });
  },
};
