import { Channel, Client, ContextMenuInteraction, GuildMember, Interaction, Message, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageSelectOptionData, SelectMenuInteraction, VoiceChannel } from "discord.js";
import { MessageButtonStyles } from "discord.js/typings/enums";
import { ICommand } from "wokcommands";

let VcMenu = false
let VcMenuwhitelist = false
let VcMenuMemberList = new Array()
let MenuVC: any
let addingMembers = false
let removingMembers = false
let menuMessage: any
/*var Menu = {
    VcMenu,
    VcMenuwhitelist,
    VcMenuMemberList,
    addingMembers,
    removingMembers,
    menuMessage,
    MenuVC,
}*/

export default {
    category: 'voice channel stuff',
    description: 'opens menu for voice channel',

    slash: true,
    ownerOnly: true,
    guildOnly: true,

    init: async (client: Client) => {
        /*client.on('ready', async () => {
            const VcData = await vcmenudata

        })*/
        client.on('interactionCreate', async Interaction => {
            if (Interaction.isButton()) {
                const { customId, member, message, channel, guild} = Interaction

                if (menuMessage === message) {
                    if (member instanceof GuildMember && member.id == '424279456031703041') {
                        const targetMessage = await channel?.messages.fetch(message.id, {
                            cache: true,
                            force: true
                        })

                        if (customId === 'off') {
                    
                            if (member.voice.channel) {
    
                                
                                
                                VcMenu = true
    
                                
    
                                if (member.voice.channel) {MenuVC = member.voice.channel}
    
                        
                                if(!targetMessage) {return}
                                await targetMessage.edit({
                                    components: [Update_message_row()],
                                    embeds: [Update_message_embed()]
                                })
    
    
                                Interaction.deferUpdate()
                            } else {
                                Interaction.reply({
                                    content: 'you are not in a vc',
                                    ephemeral: true,
                                })
                            }
                        } else if (customId === 'on') {
         
                            VcMenu = false
                            
                            MenuVC = null
                            VcMenuwhitelist = false
                            VcMenuMemberList = new Array()
                            addingMembers = false
                            removingMembers = false
                    
                            if(!targetMessage) {return}
                            await targetMessage.edit({
                                components: [Update_message_row()],
                                embeds: [Update_message_embed()]
                            })
                            Interaction.deferUpdate()
                                
                        } else if (customId === 'whitelist_blacklist') {
                                
                            VcMenuwhitelist = !VcMenuwhitelist
    
                    
                            if(!targetMessage) {return}
                            await targetMessage.edit({
                                components: [Update_message_row()],
                                embeds: [Update_message_embed()]
                            })
            
                            Interaction.deferUpdate()

                            update_vcmembers()
                        }  else if (customId === "add") {
                            if (removingMembers === true) {
                                Interaction.reply({
                                    content: "can't remove and add members at the same time",
                                    ephemeral: true

                                })
                            } else {
                                addingMembers = true
                                if(!targetMessage) {return}
                                await targetMessage.edit({
                                    components: [Update_message_row()],
                                    embeds: [Update_message_embed()]
                                })

                                Interaction.deferUpdate()

                            }
                            

                        } else if (customId === "remove") {
                            if (addingMembers === true) {
                                Interaction.reply({
                                    content: "can't remove and add members at the same time",
                                    ephemeral: true

                                })
                            } else {
                                removingMembers = true
                                if(!targetMessage) {return}
                                await targetMessage.edit({
                                    components: [Update_message_row()],
                                    embeds: [Update_message_embed()]
                                })

                                Interaction.deferUpdate()

                            }
                            

                        } else if (customId === "cadd") {
                            addingMembers = false

                            if(!targetMessage) {return}
                            await targetMessage.edit({
                                components: [Update_message_row()],
                                embeds: [Update_message_embed()]
                            })

                            Interaction.deferUpdate()

                        } else if (customId === "cremove") {
                            removingMembers = false


                            if(!targetMessage) {return}
                            await targetMessage.edit({
                                components: [Update_message_row()],
                                embeds: [Update_message_embed()]
                            })

                            Interaction.deferUpdate()
                            
                        } else if (customId === 'update') {
                            if (member.voice.channel) {
    
                                
    
                                if (member.voice.channel) {MenuVC = member.voice.channel}
    
                        
                                if(!targetMessage) {return}
                                await targetMessage.edit({
                                    components: [Update_message_row()],
                                    embeds: [Update_message_embed()]
                                })

                                update_vcmembers()

                                Interaction.deferUpdate()
                            } else {
                                Interaction.reply({
                                    content: 'you are not in a vc',
                                    ephemeral: true,
                                })
                            }
                        }
                    } else {
                        Interaction.reply({
                            content: 'idiu nahhui cyka blyat',
                            ephemeral: true
                            

                        }) 
                    } 
                } else {
                    Interaction.reply({
                        content: 'old vcmenu panel',
                        ephemeral: true
                    })
                }         
            }           
        })
        client.on('messageCreate', async msg => {
            const { channel, guild, member, mentions} = msg
            if (menuMessage) {
            if ( channel === menuMessage.channel && guild! === menuMessage.guild && member!.id === "424279456031703041") {
                if (addingMembers === true) {
                    
                    msg.mentions.members!.forEach(mentions => {
                        if (!VcMenuMemberList.includes(mentions) && mentions.id !== "424279456031703041") { VcMenuMemberList[VcMenuMemberList.length] = mentions }
                        
                    });
                    menuMessage.edit({
                        components: [Update_message_row()],
                        embeds: [Update_message_embed()]
                    })
                    
                    update_vcmembers()

                } else if (removingMembers === true) {
                    msg.mentions.members!.forEach(mentions => {
                        VcMenuMemberList = VcMenuMemberList.filter(function(value, index, arr){ 
                            return value !== mentions;
                        });
                        
                    });
                    menuMessage.edit({
                        components: [Update_message_row()],
                        embeds: [Update_message_embed()]
                    })
                    update_vcmembers()

                }

            }}
        })
        client.on('voiceStateUpdate', (oldState, newState) => {
            
            const member = newState.member
            if (newState.channel === MenuVC) {
                if ( VcMenu === true ) {
                    if (VcMenuwhitelist === true) {
                        if (VcMenuMemberList.includes(member)) {
                            return
                        } else if (member!.id !== "424279456031703041"){
                            member?.voice.disconnect()
    
                        }
    
                    } else if (VcMenuwhitelist === false) {
                        if (VcMenuMemberList.includes(member) && member!.id !== "424279456031703041") {
                            member?.voice.disconnect()
                        } else {
                            return
                        
                        }
    
    
                    }
                    

                }
            }
        })
    },

    callback: async ({channel, interaction }) => {

        interaction.reply({
            content: 'done',
            ephemeral: true,
        })
        if(menuMessage instanceof Message) {await menuMessage.delete()}
        
        
        await channel.send({
            components: [Update_message_row()],
            embeds: [Update_message_embed()]
         }).then( msg => {
            menuMessage = msg
         })


        
    },
} as ICommand

function Update_message_embed() {
    const embed = new MessageEmbed()
        embed.title = 'VcMenu'
        if ( VcMenu === true ) {
            if (VcMenuwhitelist === true) {
                if (VcMenuMemberList.length > 0) {
                                embed.addFields(
                                    { name: 'Allowed members', value: VcMenuMemberList.join('\n'), inline:true},
                                    { name: 'Enabled Vc', value: `:loud_sound: ${MenuVC}`, inline:true}
                                )
                            } else {
                                embed.addFields(
                                    { name: 'Allowed members', value: 'none', inline:true},
                                    { name: 'Enabled Vc', value: `:loud_sound: ${MenuVC}`, inline:true}
                                )
                            }
            } else if (VcMenuwhitelist === false) {
                if (VcMenuMemberList.length > 0) {
                    embed.addFields(
                        { name: 'Blocked members', value: VcMenuMemberList.join('\n'), inline:true},
                        { name: 'Enabled Vc', value: `:loud_sound: ${MenuVC}`, inline:true}
                        )
                    } else {
                        embed.addFields(
                            { name: 'Bloked members', value: 'none', inline:true},
                            { name: 'Enabled Vc', value: `:loud_sound: ${MenuVC}`, inline:true}
                        )
                }
            }
        }
        else {
            embed.addFields(
                { name: 'Disabled', value: 'Disabled', inline:true},
                )
        }
    return embed
  }

function Update_message_row() {
    const row = new MessageActionRow()


    if(VcMenu === false) {
        row.addComponents(
    
            new MessageButton()
            .setCustomId('off')
            .setLabel('OFF')
            .setStyle(MessageButtonStyles.DANGER)
        )
    } else {
        row.addComponents(
        
            new MessageButton()
            .setCustomId('on')
            .setLabel('ON')
            .setStyle(MessageButtonStyles.SUCCESS)
        )
        

        if(VcMenuwhitelist === true) {
            row.addComponents(
        
                new MessageButton()
                .setCustomId('whitelist_blacklist')
                .setLabel('WHITELIST')
                .setStyle(MessageButtonStyles.PRIMARY)
            )
        } else {
            row.addComponents(
            
                new MessageButton()
                .setCustomId('whitelist_blacklist')
                .setLabel('BLACKLIST')
                .setStyle(MessageButtonStyles.DANGER)
            )
        }
        
        if (addingMembers === true) {
            row.addComponents(
        
                new MessageButton()
                .setCustomId('cadd')
                .setLabel('CANCEL')
                .setStyle(MessageButtonStyles.DANGER)
            )

        } else {
            row.addComponents(
        
                new MessageButton()
                .setCustomId('add')
                .setLabel('ADD')
                .setStyle(MessageButtonStyles.SECONDARY)
            )

        }
        if (removingMembers === true) {
            row.addComponents(
        
                new MessageButton()
                .setCustomId('cremove')
                .setLabel('CANCEL')
                .setStyle(MessageButtonStyles.DANGER)
            )

        } else {
            row.addComponents(
        
                new MessageButton()
                .setCustomId('remove')
                .setLabel('REMOVE')
                .setStyle(MessageButtonStyles.SECONDARY)
            )

        }
        row.addComponents(
        
            new MessageButton()
            .setCustomId('update')
            .setLabel('UPDATE')
            .setStyle(MessageButtonStyles.SECONDARY)
        )
    }


  return row
}

function update_vcmembers() {
    if (MenuVC instanceof VoiceChannel ) {
        const members = MenuVC.members
        if (VcMenuwhitelist === true) {
            members.forEach(member => {
                if (VcMenuMemberList.includes(member)) {
                    return
                } else if (member!.id !== "424279456031703041"){
                    member?.voice.disconnect()

                }

            })

        } else if (VcMenuwhitelist === false) {
            members.forEach(member => {
                if (VcMenuMemberList.includes(member) && member!.id !== "424279456031703041") {
                    member?.voice.disconnect()
                } else {
                    return
                
                }

            })

        }

        
        

        

    } else {return}

}


