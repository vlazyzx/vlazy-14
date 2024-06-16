module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // Event "ready" akan dipanggil sekali saat bot berhasil login ke Discord.
    // Pada event ini, kita mencetak pesan ke konsol yang menunjukkan bot sudah siap digunakan.
    console.log(`ready!!! ${client.user.tag} is logged in and online.`);
  },
};
