const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout the member provided.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you'd like to timeout")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("The amount of minutes to timeout a member for.")
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for timing out the member.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    let time = interaction.options.getInteger('time');
    let member;

    if (!reason) reason = "No reason provided.";
    if (!time) time = null;
    if (time < 0) {
      return interaction.reply({
        content: "The time must be a positive integer.",
        ephemeral: true,
      });
    }

    await interaction.deferReply({ ephemeral: true });

    try {
      member = await interaction.guild.members.fetch(user.id);
    } catch (error) {
      console.error(error);
      return interaction.editReply({
        content: "Failed to fetch the member.",
        ephemeral: true,
      });
    }

    try {
      await member.timeout(time == null ? null : time * 60 * 1000, reason);
    } catch (error) {
      console.error(error);
      return interaction.editReply({
        content: "Failed to timeout the member.",
        ephemeral: true,
      });
    }

    await interaction.editReply({
      content: `Timed out ${user.tag} for ${time == null ? 'an unspecified duration' : `${time} minute(s)`} successfully!`,
    });
  },
};
