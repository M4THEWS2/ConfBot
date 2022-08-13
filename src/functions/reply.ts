import { Message } from "discord.js";

const func_name = "reply";
const func = async (message: Message, args: string[], func: any) => {
  message.reply(func.message);
};

export { func_name, func };
