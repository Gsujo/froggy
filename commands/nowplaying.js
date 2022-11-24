const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "nowplaying",
    description: "Get the current song playing.",
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: `There is no queue to stop!` });
        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();
        const nowPlayingEmbed = new EmbedBuilder()
        .setColor(`Aqua`)
        .setTitle(`Now Playing`)
        .setDescription(`**[${queue.current.title}](${queue.current.url})** (\`${perc.progress == 'Infinity' ? 'Live' : perc.progress + '%'}\`)`)
        .addFields(
            { name: `\u200b`, value: `${progress.replace(/ 0:00/g, ' Live')}`, inline: true }
        )
        .setFooter({ text: `Froggy 🐸` })
        .setTimestamp();
        return interaction.followUp({ embeds: [nowPlayingEmbed] });
    }
};