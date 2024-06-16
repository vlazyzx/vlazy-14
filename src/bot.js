require("dotenv").config();
const { token, databaseToken} = process.env;
const { connect } = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: 32767 });
// Inisialisasi variabel untuk menyimpan koleksi select menus dan array command
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

// Membaca semua folder yang berisi fungsi-fungsi bot
const functionFolders = fs.readdirSync(`./src/functions`);

// Loop melalui setiap folder fungsi
for (const folder of functionFolders) {
  // Mendapatkan daftar file dalam folder fungsi yang berakhiran .js
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  // Memuat setiap file fungsi dan menjalankannya dengan menyediakan client sebagai argumen
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

// Menjalankan fungsi untuk menangani event-event Discord
client.handleEvents();
// Menjalankan fungsi untuk menangani command-command Discord
client.handleCommands();
// Menjalankan fungsi untuk menangani komponen-komponen Discord seperti button dan select menu
client.handleComponents();
// Menghubungkan bot ke Discord menggunakan token yang disediakan
client.login(token);
(async () => {
  await connect(databaseToken).catch(console.error);
})();


