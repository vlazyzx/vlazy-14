const fs = require("fs");

// Fungsi ini menangani pendaftaran dan pemrosesan event pada client Discord.
// Dengan menggunakan file sistem (fs), kita membaca folder "events" di dalam direktori "./src".
// Setiap event yang terdaftar dalam folder tersebut akan didaftarkan pada client Discord.
module.exports = (client) => {
  client.handleEvents = async () => {
    // Membaca semua folder di dalam direktori "./src/events".
    const eventFolders = fs.readdirSync("./src/events");
    for (const folder of eventFolders) {
      // Filter file yang berakhir dengan ".js" untuk setiap folder event.
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));

      // Memproses event berdasarkan folder tempat event tersebut berada.
      switch (folder) {
        case "client":
          // Jika event berada dalam folder "client", mendaftarkannya sebagai event "once" atau "on" pada client.
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once)
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            else
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
          }
          break;

        default:
          break;
      }
    }
  };
};
