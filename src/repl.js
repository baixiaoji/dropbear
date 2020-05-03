const { prompt } = require('inquirer');
const chalk = require('chalk');

const { parseAndEvaluate } = require('./parse-and-evaluate');

const askQuestion = () => {
  const question = [
    {name: 'COMMAND', type: 'input', message: chalk.blue('>')}
  ]

  return prompt(question);
}
const repl = async () => {

  try {
    const answers = await askQuestion();
    const { COMMAND } = answers;

    if(COMMAND.trim()) {
      console.log(chalk.yellow(parseAndEvaluate(COMMAND)));
    }
  } catch (error) {
    console.log(error);
  }

  repl();
};

if (require.main === module) {
  console.log(
    chalk.red(
      `Welcome to the ${chalk.bgYellow('Dropbear')} Programming Language`,
    ),
  );
  repl();
}

module.exports = repl;
