// Inisialisasi variabel untuk menyimpan koleksi select menus dan array command
client.selectMenus = new Collection();
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
