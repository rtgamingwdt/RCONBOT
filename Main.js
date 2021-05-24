const DiscordJS = require('discord.js');

const {
  Rcon
} = require('rcon-client');

const TextFormat = require('chalk');

const {
  TOKEN
} = process.env;

const {
  PREFIX
} = process.env;

const Host = process.env.IP;

const {
  Port
} = process.env;

const {
  Password
} = process.env;

const Client = new DiscordJS.Client({
  disableEveryone: true
});

Client.on("ready", () => {
  console.log("Rcon Bot Is Now Online!");
});

Client.on("message", async msg => {
  const rcon = await Rcon.connect({
    host: Host,
    port: Port,
    password: Password
  });

  const args = msg.content.slice(PREFIX.length).trim().split(/ +/g);

  if (msg.content.startsWith(PREFIX)) {
    let responses = await Promise.all([
      rcon.send(args.join(""))
    ]);
    msg.channel.send("The command has been sent to the Minecraft Server. Check out the console to see if it worked. If you got any RCON errors. Just reload/restart the Minecraft Server.");
    rcon.end();
  }
});

Client.login(TOKEN);
