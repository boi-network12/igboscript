const chalk = require("chalk");
const { translations } = require("../constant/TranslationConstant");

function translate(code) {
  try {
    let jsCode = code.normalize("NFC"); // Normalize Unicode

    // Protect string literals
    const stringPlaceholder = "__STRING__";
    const strings = [];
    jsCode = jsCode.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, p1) => {
      strings.push(p1);
      return `"${stringPlaceholder}${strings.length - 1}"`;
    });

    // Handle require statements
    jsCode = jsCode.replace(
      /\bnwetakwa\s*\*\s*site\s*(\w+)\s*na\s*"([^"]+)"/g,
      'const $1 = require("$2")'
    );

    // Replace keywords
    const sortedKeys = Object.keys(translations).sort((a, b) => b.length - a.length);
    for (const igbo of sortedKeys) {
      const escapedIgbo = igbo.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      const regex = new RegExp(`(^|[^\\p{L}])(${escapedIgbo})(?![\\p{L}])`, "gu");
      jsCode = jsCode.replace(regex, `$1${translations[igbo]}`);
    }

    // Restore string literals
    jsCode = jsCode.replace(new RegExp(`"${stringPlaceholder}(\\d+)"`, "g"), (match, index) => {
      return `"${strings[index]}"`;
    });

    // Add semicolons
    jsCode = jsCode.split("\n").map(line => {
      line = line.trim();
      if (
        line &&
        !line.endsWith(";") &&
        !line.endsWith("{") &&
        !line.endsWith("}") &&
        !line.endsWith(",") &&
        !line.match(/^(const|let|function|if|else|for|while|switch)\b/) &&
        !line.includes("=>")
      ) {
        return line + ";";
      }
      return line;
    }).join("\n");

    return jsCode;
  } catch (error) {
    throw new Error(chalk.red(`Translation Error: ${error.message}`));
  }
}

module.exports = { translate };