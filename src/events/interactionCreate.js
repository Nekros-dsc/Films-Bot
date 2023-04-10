/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable no-useless-escape */
import { Evenement } from '../structures/evenements.js'
import Discord, { EmbedBuilder } from 'discord.js'
import rechercherSerie from '../utils/rechercherFilm.js'

export default new Evenement({
  eventName: { interactionCreate: 0 },

  /**
     * @param { Discord.Interaction } interaction
     * @param {{ commands: Discord.Collection, events: Discord.Collection } & Discord.Client} client
     */

  async callback (client, interaction) {
    if (interaction.isCommand() && client.commands.get(interaction.commandName)) {
      if (client.commands.get(interaction.commandName).userPermissions && client.commands.get(interaction.commandName).userPermssions !== 'EVERYONE' && !interaction.member.permissions.has(client.commands.get(interaction.commandName).userPermissions)) {
        interaction.reply({ ephemeral: true, embeds: [{ title: 'Permission requise', description: `Vous n\'avez pas la permission requise pour utiliser cette commande\nPermission requise : \`${client.commands.get(interaction.commandName).userPermissions}\``, color: '#2F3136' }] })
      } else {
        client.commands.get(interaction.commandName).callback(client, interaction)
      }
    } else if (interaction.isModalSubmit()) {
      if (interaction.customId === 'recherche_menu' || interaction.customId === 'recherche_menu_panel') {
        const finalname = interaction.customId === 'recherche_menu_panel' ? interaction.fields.getTextInputValue('film_name_panel') : interaction.fields.getTextInputValue('film_name')
        const erreurEmbed = new EmbedBuilder()
          .setTitle('🍿・Erreur de recherche')
          .setDescription(`\`Erreur\`, aucun film trouvé pour **\`${finalname}\`**\n__Veuillez réessayer de rechercher votre film souhaitée.__`)
          .setColor('Blurple')
        const films = await client.db.get(`films_${interaction.guild.id}`)
        if (!films) return interaction.reply({ ephemeral: true, embeds: [{ title: 'Erreur', description: 'Il n\'y a pas de films dans la base de données', color: '#2F3136' }] })
        const resultat = await rechercherSerie(finalname, films)
        if (!resultat) return interaction.reply({ ephemeral: true, embeds: [erreurEmbed] })
        const episodes = resultat.contenu.map(function (film) { return `[Episode **${film.episode}**](${film.lien})` }).join('\n')
        const filmFoundEmbed = new EmbedBuilder()
          .setTitle('🍿・Correspondance trouvée')
          .setDescription(`Correspondance trouvée pour **\`${finalname}\`**`)
          .addFields(
            {
              name: '🥥・Nom',
              value: resultat.nom,
              inline: false
            },
            {
              name: '🎙️・Genre',
              value: resultat.genre,
              inline: false
            },
            {
              name: '🧸・Description',
              value: resultat.description,
              inline: false
            },
            {
              name: '⚖️・Episodes',
              value: episodes,
              inline: false
            }
          )
          .setImage(resultat.image)
          .setColor('Blurple')
        return interaction.reply({ embeds: [filmFoundEmbed], ephemeral: true })
      } else if (interaction.customId === 'suggest_panel') {
        const suggestChannel = await client.db.get(`logs.suggestions_${interaction.guild.id}`)
        const embed = new EmbedBuilder()
          .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL({ dynamic: true }) })
          .setTitle('💡 Nouvelle suggestion !')
          .setColor('Blurple')
          .setDescription(`🍿・Titre : **${interaction.fields.getTextInputValue('suggest_name')}**\n✏️・Genre : **${interaction.fields.getTextInputValue('suggest_genre')}**\n📅・Date : **${interaction.fields.getTextInputValue('suggest_date')}**`)
        interaction.reply({ content: `Votre suggestion a bien été envoyé dans <#${suggestChannel}>`, ephemeral: true })
        await client.channels.cache.get(suggestChannel).send({ embeds: [embed] })
      }
    } else if (interaction.isButton()) {
      if (interaction.customId === 'panel-search') {
        const row = new Discord.ModalBuilder()
          .setTitle('Menu de recherche')
          .setCustomId('recherche_menu_panel')

        const recherche = new Discord.TextInputBuilder()
          .setLabel('🍿・Titre de votre film')
          .setCustomId('film_name_panel')
          .setStyle(Discord.TextInputStyle.Short)

        const rechercheRow = new Discord.ActionRowBuilder().addComponents(recherche)
        row.addComponents(rechercheRow)

        await interaction.showModal(row)
      }
      if (interaction.customId === 'panel-suggest') {
        const row = new Discord.ModalBuilder()
          .setTitle('Menu de Suggestion')
          .setCustomId('suggest_panel')

        const titre = new Discord.TextInputBuilder()
          .setLabel('🍿・Titre de votre film/série')
          .setCustomId('suggest_name')
          .setStyle(Discord.TextInputStyle.Short)

        const genre = new Discord.TextInputBuilder()
          .setLabel('✏️・Genre de votre film/série')
          .setCustomId('suggest_genre')
          .setStyle(Discord.TextInputStyle.Short)

        const date = new Discord.TextInputBuilder()
          .setLabel('📅・Date de votre film/série')
          .setCustomId('suggest_date')
          .setStyle(Discord.TextInputStyle.Short)

        const titreRow = new Discord.ActionRowBuilder().addComponents(titre)
        const genreRow = new Discord.ActionRowBuilder().addComponents(genre)
        const dateRow = new Discord.ActionRowBuilder().addComponents(date)
        row.addComponents(titreRow, genreRow, dateRow)
        await interaction.showModal(row)
      }
    }
  }
})
