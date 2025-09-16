const fs = require("fs");
const path = require("path");
const { translate } = require("./parser");
const chalk = require("chalk");
const acorn = require("acorn");
const { execSync } = require("child_process");

function runFile(filePath) {
  try {
    const ext = path.extname(filePath);
    if (ext !== ".is") {
      console.error(chalk.red("Error: Only .is files are supported."));
      process.exit(1);
    }

    const content = fs.readFileSync(filePath, "utf8");
    const jsCode = translate(content);
    console.log(chalk.green("Running Igboscript..."));

    // Validate syntax
    try {
      acorn.parse(jsCode, { ecmaVersion: "latest", sourceType: "script" });
    } catch (syntaxError) {
      console.error(chalk.red(`Syntax Error in generated code: ${syntaxError.message}`));
      process.exit(1);
    }

    // Save translated code to a temporary .js file
    const tempFilePath = path.join(path.dirname(filePath), "temp.js");
    fs.writeFileSync(tempFilePath, jsCode);

    // Execute the .js file with Node.js
    try {
      execSync(`node ${tempFilePath}`, { stdio: "inherit" });
    } finally {
      // Clean up the temporary file
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }
  } catch (error) {
    console.error(chalk.red(`Execution Error: ${error.message}`));
    process.exit(1);
  }
}

module.exports = { runFile };