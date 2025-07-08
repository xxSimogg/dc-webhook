const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

app.use(express.json());

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const token = process.env.DISCORD_TOKEN;
const guildId = '1318118466313519134';
const roleId = '1390991178652188723';

client.login(token);

app.post('/webhook', async (req, res) => {
  const discordId = req.body.nutzername;

  if (!discordId) {
    return res.status(400).send('Discord-ID fehlt');
  }

  try {
    const guild = await client.guilds.fetch(guildId);
    const member = await guild.members.fetch(discordId);
    await member.roles.add(roleId);

    res.status(200).send('Rolle vergeben!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Fehler beim Vergeben der Rolle');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server läuft');
});
