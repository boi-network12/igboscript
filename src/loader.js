// src/loader.js
const fs = require("fs");
const { translate } = require("./parser");
const chalk = require("chalk");

require.extensions[".is", ".js"] = function (module, filename) {
  try {
    const content = fs.readFileSync(filename, "utf8");
    
    // Skip if it's pure JS (no Igbo keywords) to avoid unnecessary processing
    const hasIgboKeywords = content.match(/[\u0200-\u02FF\u1E00-\u1EFF]/) || 
                           content.includes("pụta") || 
                           content.includes("ọrụ") ||
                           content.includes("ka");
    
    if (!hasIgboKeywords && filename.endsWith('.js')) {
      // Pure JS file - compile normally
      return module._compile(content, filename);
    }
    
    const jsCode = translate(content);
    console.log(chalk.cyan(`Loading ${filename.endsWith('.is') ? 'Igboscript' : 'Igbo-enhanced JS'} file: ${filename}`));
    return module._compile(jsCode, filename);
  } catch (error) {
    console.error(chalk.red(`Error loading ${filename}: ${error.message}`));
    process.exit(1);
  }
};

// Auto-detect and load for common frameworks
function autoSetup() {
  const packageJson = require('../package.json');
  console.log(chalk.green('🇳🇬 Igboscript Loader Active - Code in Igbo!'));
}

// Export for manual setup
module.exports = { autoSetup };