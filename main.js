const readlinePromis = require("node:readline/promises");
const fs = require("node:fs/promises");
const { Message, Command, ErrorMessage } = require("./enum.js");
const { Row } = require("./struct.js");
const { checkFileExists } = require("./helper.js");

//Gloal variable:
const rl = readlinePromis.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const listComand = Object.keys(Command);

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
  const functionHandler = input.split(" ");

  switch (functionHandler[0]) {
    case Command.EXIT:
      console.log(Message.EXIT_SUCCESS);
      process.exit(0);

    case Command.HELP:
      console.log(Message.HELP);
      break;

    case Command.INSERT:
      //Hiện tại đang fix cứng với 3 attribute: id: number, name: string, email: string.
      console.log("Insert command");

      if (functionHandler.length < 4) {
        console.log(ErrorMessage.INSERT_INVALID_SYNTAX);
        break;
      }
      //Convert dữ liệu người dùng nhập vào với cấu trúc đã được định nghĩa.
      try {
        //So sánh dữu liệu người dùng nhập vào với cấu trúc đã được định nghĩa.
        const listType = Object.values(Row);
        const listVariable = Object.keys(Row);

        let rowData = {};

        for (let i = 0; i < listType.length; i++) {
          if (typeof listType[i] === "number") {
            if (isNaN(functionHandler[i + 1])) {
              throw new Error("Invalid data type number");
            }
          } else {
            if (typeof listType[i] === "boolean") {
              if (
                typeof functionHandler[i + 1].toLocaleLowerCase() !== "true" ||
                typeof functionHandler[i + 1].toLocaleLowerCase() !== "false"
              ) {
                throw new Error("Invalid data type boolean");
              }
            } else {
              rowData[listVariable[i]] = functionHandler[i + 1];

              //Ghi dữ liệu vào file.
            }
          }
        }
        fs.appendFile("./data.json", JSON.stringify(rowData));
      } catch (error) {
        console.log(error);
      }

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
  checkFileExists();
  console.log(Message.WELCOME);

  function excecute() {
    getUserPrompt()
      .then((input) => {
        input = input.trim().toLocaleLowerCase();

        //Unrecognized command:
        if (!input.startsWith(".")) {
          console.log(Message.INVALID_COMMAND);
          console.log(Message.HELP);
        } else {
          // handle the command:
          handleCommand(input);
        }

        excecute();
      })
      .catch((error) => {
        // Exception handling:
        console.log(error);
        rl.close();
      });
  }

  excecute();
}

main();
