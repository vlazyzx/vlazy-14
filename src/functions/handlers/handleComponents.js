const { readdirSync } = require("fs");

// Fungsi untuk meng-handle komponen-komponen (buttons dan select menus) dari folder yang ditentukan
module.exports = (client) => {
  client.handleComponents = async () => {
    // Membaca semua folder di dalam direktori ./src/components
    const componentFolders = readdirSync(`./src/components`);

    // Iterasi setiap folder komponen
    for (const folder of componentFolders) {
      // Membaca semua file di dalam folder komponen yang memiliki ekstensi .js
      const componentFiles = readdirSync(`./src/components/${folder}`).filter(
        (file) => file.endsWith(".js")
      );

      // Destructuring objects buttons dan selectMenus dari client
      const { buttons, selectMenus } = client;

      // Memproses komponen berdasarkan jenisnya (buttons atau selectMenus)
      switch (folder) {
        case "buttons":
          // Iterasi setiap file button di dalam folder buttons
          for (const file of componentFiles) {
            // Memuat file button sebagai modul
            const button = require(`../../components/${folder}/${file}`);
            // Menyimpan button ke dalam collection buttons dengan menggunakan nama uniknya
            buttons.set(button.data.name, button);
          }
          break;

        case "selectMenus":
          // Iterasi setiap file select menu di dalam folder selectMenus
          for (const file of componentFiles) {
            // Memuat file select menu sebagai modul
            const menu = require(`../../components/${folder}/${file}`);
            // Menyimpan select menu ke dalam collection selectMenus dengan menggunakan nama uniknya
            selectMenus.set(menu.data.name, menu);
          }
          break;
          
        default:
          break;
      }
    }
  };
};

