const DiscordJS = require('discord.js');

const {
	Rcon
} = require('rcon-client');
const TextFormat = require('chalk');

const {
	Token
} = process.env;

const {
	Prefix
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

Client.on("ready", async() => {
	console.log(TextFormat.BLUE("Rcon Bot") + TextFormat.GREEN("Is Now Online!"));
});

Client.on("message", async msg => {
	const rcon = await Rcon.connect({
		host: Host,
		port: Port,
		password: Password
	});

	const args = msg.content.slice(Prefix.length).trim().split(/ +/g);

	if (msg.content.startsWith(Prefix)) {
		let responses = await Promise.all([
			rcon.send(args.join(""))
		]);
		msg.channel.send("The command has been sent to the Minecraft Server. Check out the console to see if it worked. If you got any RCON errors. Just reload/restart the Minecraft Server.");
		rcon.end();
	}
});
