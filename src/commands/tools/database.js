const Guild = require("../../schemas/guild");
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  // Definisikan data untuk command slash 'ping'
  data: new SlashCommandBuilder()
    .setName("database") // Nama command 'ping'
    .setDescription("Returns information from a database"), // Deskripsi command 'ping'

  // Fungsi execute untuk menangani interaksi 'ping'
  async execute(interaction, client) {
    let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
    if (!guildProfile) {
      guildProfile = new Guild({
        _id: new mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcon: interaction.guild.iconURL()
          ? interaction.guild.iconURL()
          : "None.",
      });

      await guildProfile.save().catch(console.error);
      await interaction.reply({
        content: `Server Name: ${guildProfile.guildName}`,
      });
      console.log(guildProfile);
    } else {
      await interaction.reply({
        content: `Server ID: ${guildProfile.guildId}`,
      });
      console.log(guildProfile);
    }
  },
};
