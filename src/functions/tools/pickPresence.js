const { ActivityType } = require('discord.js');

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Watching,
        text: "Over Vlazy Studio",
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: "for commands",
        status: "idle",
      },
      {
        type: ActivityType.Playing,
        text: "With Discord.js",
        status: "dnd",
      },
    ];
    const option = Math.floor(Math.random() * options.length);

    client.user
      .setPresence({
        activities: [
          {
            name: options[option].text,
            type: options[option].type,
          },
        ],
        status: options[option].status,
      });
  };
};
