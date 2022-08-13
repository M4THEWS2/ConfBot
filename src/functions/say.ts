import { Message } from "discord.js";

const func_name = "say";
const func = async (message: Message, args: string[], func: any) => {
  message.channel.send(func.message);
};

export { func_name, func };
