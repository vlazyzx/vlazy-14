const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    PermissionsBitField,
  } = require("discord.js");
  
  module.exports = {
    // Definisikan data untuk command slash 'ping'
    data: new SlashCommandBuilder()
      .setName("permission") // Nama command 'ping'
      .setDescription("This command requires permission")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Deskripsi command 'ping'
  
    // Fungsi execute untuk menangani interaksi 'ping'
    async execute(interaction, client) {
      const { roles } = interaction.member;
      const role = await interaction.guild.roles
        .fetch("1251911301903548569")
        .catch(console.error);
  
      const testRole = await interaction.guild.roles
        .create({
          name: `Test`,
          permissions: [PermissionsBitField.Flags.KickMembers],
        })
        .catch(console.error);
  
      // Has role
      if (roles.cache.has("1251911301903548569")) {
        await interaction.deferReply({
          fecthReply: true,
        });
  
        await roles.remove(role).catch(console.error);
        await interaction.editReply({
          content: `Removed: ${role.name} role from you.`,
        });
      } else {
        await interaction.reply({
          content: `You do not have the ${role.name} role.`,
        });
      }
  
      await roles.add(testRole).catch(console.error);
  
      await testRole
        .setPermissions([PermissionsBitField.Flags.BanMembers])
        .catch(console.error)
  
      const channel = await interaction.guild.channels.create({
        name: `test`,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel]
          },
          {
            id: testRole.id,
            allow: [PermissionsBitField.Flags.ViewChannel]
          }
        ],
      });
  
      await channel.permissionOverwrites
      .edit(testRole.id, { SendMessages: false })
      .catch(console.error);
    },
  };