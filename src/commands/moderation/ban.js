const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  // Definisikan data untuk command slash 'ping'
  data: new SlashCommandBuilder()
    .setName("ban") // Nama command 'ping'
    .setDescription("bans the member provided.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you'd like to ban")
        .setRequired(true)
    ) // Deskripsi command 'ping'

    // Fungsi execute untuk menangani interaksi 'ping'
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for banning the member provided.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error());

    if (!reason) reason = "No reason provided.";

    await member
      .ban({
        daleteMessageDays: 1,
        reason: reason,
      })
      .catch(console.error);

    await interaction.reply({
      content: `Banned ${user.tag} successfully!`,
    });
  },
};
