const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    // Mengambil daftar folder yang berisi command dari direktori "./src/commands"
    const commandFolders = fs.readdirSync("./src/commands");

    // Iterasi setiap folder untuk mengambil file command
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      // Mendapatkan objek commands dan commandArray dari client
      const { commands, commandArray } = client;

      // Iterasi setiap file command dalam folder
      for (const file of commandFiles) {
        // Mengimpor command dari file yang bersangkutan
        const command = require(`../../commands/${folder}/${file}`);

        // Menambahkan command ke dalam objek commands dengan key sesuai nama command
        commands.set(command.data.name, command);

        // Menambahkan command dalam bentuk JSON ke dalam commandArray
        commandArray.push(command.data.toJSON());
      }
    }

    // ID dari client dan guild Discord
    const clientId = "1251214703083130983";
    const guildId = "1251209159454625937";

    // Membuat instance REST untuk melakukan operasi dengan Discord API
    const rest = new REST({ version: "9" }).setToken(process.env.token);

    try {
      // Melakukan permintaan PUT untuk mengatur (/) commands aplikasi di guild
      console.log("Memulai refresh aplikasi (/) commands.");

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });

      // Menampilkan pesan berhasil jika permintaan berhasil
      console.log("Berhasil me-refresh aplikasi (/) commands.");
    } catch (error) {
      // Menampilkan pesan error jika terjadi kesalahan
      console.error(error);
    }
  };
};
