import { Channel, Client, ContextMenuInteraction, GuildMember, Interaction, Message, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageSelectOptionData, SelectMenuInteraction } from "discord.js";
import { MessageButtonStyles } from "discord.js/typings/enums";
import { ICommand } from "wokcommands";
import { client } from "../index"
let VcMenu = false
let VcMenuwhitelist = true
let VcMenuMemberList = new Array('Quower#999', 'viiner')
let MenuVC: any
let menu = new MessageSelectMenu
// let MenuMessageChannel = new String
let VcMenuVc = new String('')

export default {
    category: 'voice channel stuff',
    description: 'opens menu for voice channel',

    slash: true,
    testOnly: true,
    ownerOnly: true,
    guildOnly: true,

    init: async (client: Client) => {
        client.on('interactionCreate', async Interaction => {
            if (Interaction.isButton()) {
                const { customId, member, message, channel, guild} = Interaction

                if (customId === 'enable_disable' && member instanceof GuildMember) {
                    if (member.id == '424279456031703041') {
                        if (member.voice.channel) {
                            
                            
                            VcMenu = !VcMenu

                            await guild!.members
                            .fetch()
                            .then((members) =>
                              members.forEach((member) => menu.addOptions({label: `${member.user.tag}`, value: member.id})/*console.log(`${member.user.username}#${member.user.tag}`)*/),
                            ) 
                            console.log(`daaaaaaaaaaaaaaaaaaaaaaaaaaaaaab${menu.options.length}`)
                            await menu
                            .setCustomId('select_menu')
                            .setMinValues(0)
                            .setMaxValues(menu.options.length)
                            .setPlaceholder('test')
                            

                            if (member.voice.channel) {MenuVC = member.voice.channel}

        
                            const targetMessage = await channel?.messages.fetch(message.id, {
                                cache: true,
                                force: true
                            })
                    
                            if(!targetMessage) {return}
                            targetMessage.edit({
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
                    }
                    
                    
                    else {
                        Interaction.reply({
                            content: 'idiu nahhui cyka blyat',
                            ephemeral: true
                            

                        }) 
                    }
                    
                    
                    
                } else if (customId === 'whitelist_blacklist' && member instanceof GuildMember) {
                    if (member.id == '424279456031703041') {
                        
                    
                        VcMenuwhitelist = !VcMenuwhitelist

        
                        const targetMessage = await channel?.messages.fetch(message.id, {
                            cache: true,
                            force: true
                        })
                
                        if(!targetMessage) {return}
                        targetMessage.edit({
                            components: [Update_message_row()],
                            embeds: [Update_message_embed()]
                        })
                    }
                    else {
                        Interaction.reply({
                            content: "A neapolitan cappuccino, more cappu than cino, make sure it's got no more than four ounces of milk the beans won't have the right texture!",
                            ephemeral: true
                            

                        })
                    }


                    Interaction.deferUpdate()
                }
            }     
        })
    },

    callback: ({channel, interaction}) => {

        interaction.reply({
            content: 'done',
            ephemeral: true,
        })
        
        
        channel.send({
            components: [Update_message_row()],
            embeds: [Update_message_embed()]
         })//.then( msg => {
        //     MenuMessage = msg.id
        //     MenuMessageChannel = msg.channelId
        // })


        //console.log(`${MenuMessage} + ${MenuMessageChannel}`)


        
    },
} as ICommand

function Update_message_embed() {
    const embed = new MessageEmbed()
        embed.title = 'VcMenu'
        if ( VcMenu === true && VcMenuwhitelist === true ) {
            embed.addFields(
            { name: 'Allowed members', value: VcMenuMemberList.join('\n'), inline:true},
            { name: 'Enabled Vc', value: `:loud_sound: ${MenuVC}`, inline:true}
            )
        } else if ( VcMenu === true && VcMenuwhitelist === false ) {
            //const channel = client.channels.get(VcMenuVc)
            
            embed.addFields(
                { name: 'Blocked members', value: VcMenuMemberList.join('\n'), inline:true},
                { name: 'Enabled Vc', value: `:loud_sound: ${MenuVC}`, inline:true}
                )
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


    /*if(VcMenu === false) {
        row.addComponents(
    
            new MessageButton()
            .setCustomId('enable_disable')
            .setLabel('OFF')
            .setStyle(MessageButtonStyles.DANGER)
        )
    } else {
        row.addComponents(
        
            new MessageButton()
            .setCustomId('enable_disable')
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
        }*/

        
        
        
        row.addComponents(   
            menu
        )
            
        

    //}


  return row
}

// function test1() {
//     let menu = new MessageSelectMenu
// const guild = client.guilds.resolve("966345190480687167");
//         guild!.members
//         .fetch()
//         .then((members) =>
//           members.forEach((member) => menu.addOptions({label: `${member.user.username}#${member.user.tag}`, value: member.id})/*console.log(`${member.user.username}#${member.user.tag}`)*/),
//         ) 
//         menu
//         .setCustomId('select_menu')
//         .setMinValues(0)
//         .setMaxValues(menu.options.length)
//         return menu
// }



