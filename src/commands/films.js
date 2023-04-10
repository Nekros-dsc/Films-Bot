/* eslint-disable no-unused-vars */
import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  CommandInteraction,
  Client
} from 'discord.js'
import {
  Command
} from '../structures/commands.js'

export default new Command({
  name: 'films',
  description: 'Permet de rechercher un film dans la base de données',
  options: [],
  userPermssions: 'EVERYONE',
  commandCategory: 'INFORMATIONS',

  /**
     * @param { { commands: Collection, events: Collection } & Client } client
     * @param { CommandInteraction } interaction
     */

  async callback (client, interaction) {
    const row = new ModalBuilder()
      .setTitle('Menu de recherche')
      .setCustomId('recherche_menu')

    const recherche = new TextInputBuilder()
      .setLabel('🍿・Titre de votre film')
      .setCustomId('film_name')
      .setStyle(TextInputStyle.Short)

    const rechercheRow = new ActionRowBuilder().addComponents(recherche)
    row.addComponents(rechercheRow)

    await interaction.showModal(row)
  }
})
