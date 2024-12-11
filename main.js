const readlinePromis = require("node:readline/promises");
const { Message, Command } = require("./enum.js");

const rl = readlinePromis.createInterface({ input: process.stdin, output: process.stdout });

/**
 * Create a prompt for the user to input a command
 */
function getUserPrompt() {
    return rl.question("db > ");
}

/**
 * This is logic handle the command
 */
function handleCommand(input) {
    
    switch(input) {
        case Command.EXIT:
            console.log(Message.EXIT_SUCCESS);
            process.exit(0);
        case Command.HELP:
            console.log(Message.HELP);
            break;
        default:
            console.log(Message.UNRECOGNIZED_COMMAND);
            break;
    }

}

/**
 * This is the main function
 */
function main() {
    //Welcome message:
    console.log(Message.WELCOME);

    function excecute() {
        getUserPrompt().then(input => {
            //Unrecognized command:
            if(!input.startsWith('.')) {
                console.log(Message.INVALID_COMMAND);
                console.log(Message.HELP);
            }
            else { // handle the command:
                handleCommand(input);
            }

            excecute();
        }).catch(error => { // Exception handling:
            console.log(error);
            rl.close();
        });
    }

    excecute();

}

main();