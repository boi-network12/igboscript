const fs = require("fs");
const path = require("path");
const { translate } = require("./parser");
const chalk = require("chalk");
const acorn = require("acorn");
const { execSync } = require("child_process");

function runFile(filePath, options = { debug: false }) {
  try {
    const ext = path.extname(filePath);
    if (ext !== ".is") {
      console.error(chalk.red("Error: Only .is files are supported."));
      process.exit(1);
    }

    const content = fs.readFileSync(filePath, "utf8");
    const jsCode = translate(content);
    
    if (options.debug) {
      console.log(chalk.blue("Translated JavaScript code:\n"), jsCode);
    }

    // Validate syntax
    try {
      acorn.parse(jsCode, { ecmaVersion: "latest", sourceType: "module" });
    } catch (syntaxError) {
      console.error(chalk.red(`Syntax Error in generated code: ${syntaxError.message}`));
      process.exit(1);
    }

    // Save translated code to a temporary .js file
    const tempFilePath = path.join(path.dirname(filePath), `temp-${Date.now()}.js`);
    fs.writeFileSync(tempFilePath, jsCode);

    // Execute based on context
    try {
      if (filePath.includes("pages") || filePath.includes("api")) {
        // Next.js context: Simulate module export
        console.log(chalk.green("Running Igboscript in Next.js context..."));
        execSync(`node -e "require('${tempFilePath}')"`, { stdio: "inherit" });
      } else {
        // Express or standalone context
        console.log(chalk.green("Running Igboscript..."));
        execSync(`node ${tempFilePath}`, { stdio: "inherit" });
      }
    } finally {
      // Clean up
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