//Create a enum message
const Message = {
    EXIT_SUCCESS: "Exiting...",
    UNRECOGNIZED_COMMAND: "Unrecognized command",
    WELCOME: "Welcome to the database shell. Type '.exit' to exit.",
    HELP: "Help: Type '.help' to get help.",
    INVALID_COMMAND: "Invalid command",
}

//Create a enum eror mesage:
const ErrorMessage = {
    INSERT_INVALID_SYNTAX: "Err, Missing args required." //Thông báo cho bảng tạm thời.
}

//Create a enum command
const Command = {
    EXIT: ".exit",
    HELP: ".help",
    CLEAR: ".clear",
    SHOW: ".show",
    CREATE: ".create",
    INSERT: ".insert",
    SELECT: ".select",
    DELETE: ".delete",
    UPDATE: ".update"
}

module.exports = { Message, Command, ErrorMessage };