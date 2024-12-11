const fs = require("node:fs/promises");

async function checkFileExists() {
  const fileExists = async (path) => !!(await fs.stat(path).catch(() => false));

  if (await fileExists("./data.json")) {
    console.log("File exists");
  } else {
    console.log("File not found");
     
    await fs.appendFile("./data.json", "", function (err) {
      if (err) throw err;
      console.log("File created");
    });
  }

}

module.exports = { checkFileExists };
