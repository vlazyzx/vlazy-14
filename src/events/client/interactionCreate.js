// Ini adalah event handler untuk semua interaksi yang terjadi di Discord, seperti command slash, tombol, dan menu pilihan.
// Ketika ada interaksi berupa chat input command (slash command):
// - Ambil command dari objek client berdasarkan nama command yang dipicu.
// - Eksekusi command tersebut dengan menyediakan interaction dan client sebagai parameter.
// - Tangani error jika terjadi kesalahan saat eksekusi command dan kirimkan pesan error kepada pengguna.
// Ketika ada interaksi berupa tombol (button):
// - Ambil button dari objek client berdasarkan customId tombol yang dipicu.
// - Eksekusi button tersebut dengan menyediakan interaction dan client sebagai parameter.
// - Tangani error jika terjadi kesalahan saat eksekusi button dan log pesan error.
// Ketika ada interaksi berupa menu pilihan (select menu):
// - Ambil menu pilihan dari objek client berdasarkan customId menu yang dipicu.
// - Eksekusi command yang sesuai dengan menu tersebut dengan menyediakan interaction dan client sebagai parameter.
// - Tangani error jika terjadi kesalahan saat eksekusi command menu dan log pesan error.
const { InteractionType } = require('discord.js');
const { execute } = require("../../commands/tools/menu");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "Terjadi kesalahan saat menjalankan command ini...",
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("Tidak ada kode untuk tombol ini.");

      try {
        await button.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    } else if (interaction.isStringSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const menuCommand = selectMenus.get(customId);
      if (!menuCommand)
        return new Error("Tidak ada kode untuk menu pilihan ini.");

      try {
        await menuCommand.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const  modal = modals.get(customId);
      if (!modal) return new Error("There is no code for this modals.");

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
