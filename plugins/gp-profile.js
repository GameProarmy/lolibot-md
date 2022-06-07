import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command}) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png')
let { name, exp, limit, lastclaim, registered, regTime, age, level, role } = global.db.data.users[who]
let username = conn.getName(who)
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let str = `\t\t\t\t*‧ 🐣 Perfil Info 🐣 ‧*

 *◦ Nombre:* ${username}
 *◦ Tag:* @${who.replace(/@.+/, '')}
 *◦ Numero:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
 *◦ Link:* wa.me/${who.split`@`[0]}
 *◦ Limites:* ${limit}
 *◦ Nivel:* ${level}
 *◦ Rango:* ${role}
 *◦ Premium:* ${prem ? 'Si' : 'No'}

 *◦ Registrado:* ${registered ? 'Si': 'No'}
 *◦ Fecha:* ${registered ? `${formatDate(regTime)}` : '×'}
 *◦ Hora:* ${registered ? `${formatHour(regTime)}` : '×'}
 *◦ Nombre:* ${registered ? `${name}` : '×'}
 *◦ Edad:* ${registered ? `${age} años` : '×'}
`
  let mentionedJid = [who]
  conn.sendFile(m.chat, pp, 'Error.jpg', str, m, false, { contextInfo: { mentionedJid }})
}

handler.help = ['perfil']
handler.tags = ['group']
handler.command = /^(perfil|profile)$/i

export default handler
