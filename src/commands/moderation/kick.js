const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  // Definisikan data untuk command slash 'ping'
  data: new SlashCommandBuilder()
    .setName("kick") // Nama command 'ping'
    .setDescription("Kicks the member provided.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you'd to kick")
        .setRequired(true)
    ) // Deskripsi command 'ping'

    // Fungsi execute untuk menangani interaksi 'ping'
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for kicking the member provided.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString('reason');
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error());

      if (!reason) reason = "No reason provided.";

    await member.kick(reason).catch(console.error);

    await interaction.reply({
        content: `Kicked ${user.tag} successfully!`,
    });
  },
};
