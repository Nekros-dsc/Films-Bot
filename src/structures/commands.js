/* eslint-disable no-undef */
import { EXTANDED_CLIENT } from '../../index.js'

export class Command {
  /**
   * @param {{
   *  userPermissions: import("discord.js").PermissionResolvable,
    *  callback: Function
    * }
    */
  constructor (commandOptions = { userPermissions, callback }) {
    EXTANDED_CLIENT.commands.set(commandOptions.name, commandOptions)
  }
}
