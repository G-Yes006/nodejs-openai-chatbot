import openaiApi from "./config/open-ai.js";
import readlineSync from "readline-sync";
import chalk from "chalk";

console.log(chalk.blue("Chatbot: Hello! Namaskara?"));

const bot = async () => {
  const chatHistory = [];
  while (true) {
    const userInput = readlineSync.question(chalk.green("User: "));
    if (userInput.toLowerCase() === "exit") {
      console.log(chalk.blue("Chatbot: Goodbye!"));
      break;
    }

    try {
      const response = await openaiApi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
      });

      const chatCompletion = response.choices[0].message.content;
      chatHistory.push({ role: "assistant", content: chatCompletion });
      console.log(chalk.blue("Chatbot: " + chatCompletion));
    } catch (error) {
      console.log(chalk.red("An error occurred:", error.message));
    }
  }

  console.log(chalk.blue.bold("Chat History:"));
  chatHistory.forEach((message) => {
    const roleColor =
      message.role === "user" ? chalk.green.bold : chalk.yellow.bold;
    console.log(roleColor(message.role + ": " + message.content));
  });
};

export default bot;
