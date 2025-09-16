const fs = require("fs");
const { translate } = require("./parser");
const chalk = require("chalk");

require.extensions[".is"] = function (module, filename) {
  try {
    const content = fs.readFileSync(filename, "utf8");
    const jsCode = translate(content);
    console.log(chalk.cyan(`Loading Igboscript file: ${filename}`));
    return module._compile(jsCode, filename);
  } catch (error) {
    console.error(chalk.red(`Error loading ${filename}: ${error.message}`));
    process.exit(1);
  }
};