/* eslint-disable no-unused-vars */
import {
  ActionRowBuilder,
  CommandInteraction,
  Client,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle
} from 'discord.js'
import {
  Command
} from '../structures/commands.js'

export default new Command({
  name: 'panel',
  description: "Permet d'afficher le panel de recherche de film/séries",
  options: [],
  userPermssions: 'EVERYONE',
  commandCategory: 'INFORMATIONS',

  /**
       * @param { { commands: Collection, events: Collection } & Client } client
       * @param { CommandInteraction } interaction
       */

  async callback (client, interaction) {
    const films = await client.db.get(`films_${interaction.guild.id}`)
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('🔎・Rechercher')
          .setCustomId('panel-search')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setLabel('💡・Suggérer')
          .setCustomId('panel-suggest')
          .setStyle(ButtonStyle.Secondary)
      )

    const recherche = new EmbedBuilder()
      .setTitle('🍿・Panel de recherche')
      .setDescription(`Les films/séries sont désormais disponibles grâce à ce super bot !\nVous pourrez trouver un total de **${films.length}** films/séries sur ce serveur à travers plusieurs catégories !\n`)
      .addFields({
        name: '🍿・Rechercher un film',
        value: 'Cliquez sur le bouton ci-dessous pour trouver le film de votre choix.',
        inline: false
      }, {
        name: '📝・Vous ne trouvez pas votre film ?',
        value: 'Cliquez sur le bouton ci-dessous pour suggérer le film de votre choix.',
        inline: false
      })
      .setImage('https://media.discordapp.net/attachments/1088472854040940605/1094988284377169920/cfe7ee7c.gif')
      .setColor('Blurple')

    await interaction.reply({ embeds: [recherche], components: [row] })
  }
})
