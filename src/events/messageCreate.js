/* eslint-disable no-useless-escape */
import { Evenement } from '../structures/evenements.js'
import Discord from 'discord.js'

export default new Evenement({
  eventName: { messageCreate: 0 },

  /**
     * @param { Discord.Message } message
     * @param {{ commands: Discord.Collection, events: Discord.Collection } & Discord.Client} client
     */

  async callback (client, message) {
    if (!message.content.startsWith('!') || message.author.bot) return

    const args = message.content.slice(1).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()

    if (!client.commands.has(commandName)) return
    const command = client.commands.get(commandName)

    if (command.userPermssions !== 'EVERYONE' && !message.member.permissions.has(Discord.PermissionFlagsBits[command.userPermssions])) { return message.channel.send(`Vous n\'avez pas la permission requise pour utiliser cette commande\nPermission requise : \`${command.userPermssions}\``) } // Vérifie les permissions de l'utilisateur.

    try {
      command.callback(client, message, args)
    } catch (error) {
      console.error(error)
      message.reply("Une erreur est survenue lors de l'exécution de cette commande.")
    }
  }
})
