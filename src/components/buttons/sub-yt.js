/**
 * Slash command configuration and execution.
 *
 * This module exports an object with 'data' and 'execute' properties:
 * - 'data' specifies the slash command name as 'sub-yt'.
 * - 'execute' is an async function handling the interaction and client.
 *   - Upon interaction, it replies with a message containing 'https://youtube.com/'.
 */

module.exports = {
  // Slash command configuration
  data: {
    name: `sub-yt`,
  },

  // Execution of the slash command
  async execute(interaction, client) {
    // Reply to the interaction with a message containing the YouTube link
    await interaction.reply({
      content: `https://youtube.com/`,
    });
  },
};
