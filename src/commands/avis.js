/* eslint-disable no-unused-vars */
import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  CommandInteraction,
  Client,
  EmbedBuilder
} from 'discord.js'
import {
  Command
} from '../structures/commands.js'

export default new Command({
  name: 'avis',
  description: 'Permet de donner un avis sur un film.',
  options: [
    {
      name: 'film',
      description: 'Veuillez choisir le film',
      type: 3,
      required: true
    },
    {
      name: 'avis',
      description: 'Veuillez exprimer votre avis',
      type: 3,
      required: true
    },
    {
      name: 'note',
      description: 'Veuillez choisir la note',
      type: 3,
      required: true,
      choices: [{
        name: '1',
        value: '⭐'
      },
      {
        name: '2',
        value: '⭐⭐'
      },
      {
        name: '3',
        value: '⭐⭐⭐'
      },
      {
        name: '4',
        value: '⭐⭐⭐⭐'
      },
      {
        name: '5',
        value: '⭐⭐⭐⭐⭐'
      }
      ]
    }],
  userPermssions: 'EVERYONE',
  commandCategory: 'INFORMATIONS',

  /**
       * @param { { commands: Collection, events: Collection } & Client } client
       * @param { CommandInteraction } interaction
       */

  async callback (client, interaction) {
    const avisLogs = await client.db.get(`logs.avis_${interaction.guild.id}`)
    const embed = new EmbedBuilder()
      .setTitle('Nouvel avis !')
      .setDescription(`${interaction.user} a donné son avis sur le film **${interaction.options.get('film').value}**`)
      .addFields(
        {
          name: '✏️・Avis :',
          value: `${interaction.options.get('avis').value}`
        },
        {
          name: '🍿・Note :',
          value: `${interaction.options.get('note').value}/5`
        }
      )
      .setColor('Blurple')
    await interaction.reply({ content: 'Votre avis a bien été envoyé !', ephemeral: true })
    await client.channels.cache.get(avisLogs)?.send({ embeds: [embed] })
  }
})
