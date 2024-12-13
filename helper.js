const fs = require("node:fs/promises");

async function checkFileExists(path) {
  const fileExists = async (path) => !!(await fs.stat(path).catch(() => false));

  if (await fileExists(path)) {
    console.log(`${path} already exists`);
  } else {
    console.log(`${path} File not found`);
     
    await fs.appendFile(path, "", function (err) {
      if (err) throw err;
      console.log(`${path}File created`);
    });
  }

}

module.exports = { checkFileExists };
