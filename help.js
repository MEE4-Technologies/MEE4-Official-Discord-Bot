const { Client, Interaction, EmbedBuilder } = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    
    callback: async (client, interaction) => {
        const helpEmbed = new EmbedBuilder()
            .setTitle(`🤔 Help | ${client.user.username}`)
            .setDescription('Information about all available commands for this bot!')
            .addFields(
                { name: '__**Utility Commands**__', value: 'Some utility commands for the bot!'},
                { name: '</help:1208119415380512809>', value: 'Displays information about all available commands.', inline: true},
                { name: '</about:1208119413098815589>', value: 'Displays information about the bot.', inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: '__**Miscellanous Commands**__', value: 'Some fun commands to enjoy your Discord experience.'},
                { name: '</ping:1208119309151375361>', value: 'Displays your ping latency.', inline: true},
                { name: '</poll:1208119326239105104>', value: 'Creates a poll with given options.', inline: true},
                { name: '</rps:1208119327736336384>', value: 'Plays a game of Rock Paper Scissors with the bot!', inline: true},
                { name: '</snipe:1208119329074446346>', value: 'Displays recent deleted messages in a channel.', inline: true},
                { name: '\u200B', value: '\u200B' },
                { name: '__**Moderation Commands**__', value: 'Some helpful commands to help moderators.'},
                { name: '</ban:1208119330588463134>', value: 'Bans a member from a guild.', inline: true},
                { name: '</kick:1208119332316512319>', value: 'Kicks a member from a guild.', inline: true},
                { name: '</timeout:1208119411798450266>', value: "Mutes a member so they can't type.", inline: true},
                { name: '\u200B', value: '\u200B' },
                { name: '__**Economy Commands**__', value: 'A fun roleplay experience with your friends!'},
                { name: '</balance:1208119223520333897>', value: 'Checks your balance of how many gems you have.', inline: true},
                { name: '</daily:1208119227706380372>', value: "Gives you your daily reward!", inline: true},
                { name: '</weekly:1208151641161732136>', value: 'Claim your weekly gift!', inline: true},
                { name: '</level:1208119232039227402>', value: 'Checks your level and rank in the server.', inline: true},
                { name: '</work:1208119233242865824>', value: 'Work for some extra gems!', inline: true},
                { name: '</pay:1208122107314180126>', value: 'Transfer your currency to another user.', inline: true},
            )
            .setColor("#f542ec")
            .setFooter({ text: 'More Commands Coming Soon | Copyright © 2024 - All Rights Reserved.' })

        interaction.reply({ embeds: [helpEmbed]})
    },
    
    name: 'help',
    description: 'Displays information about the bot and its commands.',
}