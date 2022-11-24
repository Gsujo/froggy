const { Player } = require("discord-player");
const { EmbedBuilder } = require("discord.js");
const config = require("../config");

module.exports = {
    name: "stop",
    description: "Stop a server's queue.",
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: `There is no queue to stop!` });
        queue.playing = false;
        queue.connection.disconnect();
        const response = config.messages.queueEnd || `Queue ended, thanks for using MusicBot!`;
        const stopEmbed = new EmbedBuilder()
        .setColor(`Aqua`)
        .setDescription(`${response}`)
        .setFooter({ text: `Froggy 🐸` })
        .setTimestamp();
        return interaction.followUp({ embeds: [stopEmbed] });
    }
};