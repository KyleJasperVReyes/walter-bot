//dependencies
const { Client, GuildMember, GatewayIntentBits } = require("discord.js");
const { Player, QueryType } = require("discord-player");
const config = require("./config.json");

//client log in process with token
const client = new Client({
    intents: [
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds
    ],
});
client.login(config.token);

//listeners
client.once('ready', () => {
 console.log('Ready!');
});

client.on("error", console.error);
client.on("warn", console.warn);

//player
const player = new Player(client);

//error handler
player.on("error",(queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
});
player.on("connectionError", (queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
})

//command handler
player.on("trackStart",(queue, track) => {
    queue.metadata.send(`Started playing this dogshit song: **${track.title}** in **${queue.connection.channel.name}**!`);
});

player.on("trackStart",(queue, track) => {
    queue.metadata.send(`This dogshit song: **${track.title}** is queued!`);
});

player.on("botDisconnect",(queue) => {
    queue.metadata.send("I was disconnected from the fucking server wtf.");
});

player.on("channelEmpty",(queue) => {
    queue.metadata.send("Nobody in here, Im out this bitch.");
});

player.on("queueEnd",(queue) => {
    queue.metadata.send("Songs ran out.");
});