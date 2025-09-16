
const chalk = require("chalk");
const { translations } = require("../constant/TranslationConstant");

function translate(code) {
  try {
    let jsCode = code.normalize("NFC");

    // Protect string literals, template literals, and JSX
    const stringPlaceholder = "__STRING__";
    const templatePlaceholder = "__TEMPLATE__";
    const jsxPlaceholder = "__JSX__";
    const strings = [];
    const templates = [];
    const jsxFragments = [];

    // Protect template literals
    jsCode = jsCode.replace(/`([^`\\]*(?:\\.[^`\\]*)*)`/g, (match, p1) => {
      templates.push(p1);
      return `\`${templatePlaceholder}${templates.length - 1}\``;
    });

    // Protect JSX fragments
    jsCode = jsCode.replace(/(tagi[^tagiMechie]*tagiMechie|mechieOnwe)/g, (match) => {
      jsxFragments.push(match.replace("tagi", "<").replace("tagiMechie", ">").replace("mechieOnwe", "/>"));
      return `${jsxPlaceholder}${jsxFragments.length - 1}`;
    });

    // Protect string literals
    jsCode = jsCode.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, p1) => {
      strings.push(p1);
      return `"${stringPlaceholder}${strings.length - 1}"`;
    });

    // Handle import/export statements
    jsCode = jsCode.replace(
      /\bnwetakwa\s*\*\s*site\s*(\w+)\s*na\s*"([^"]+)"/g,
      'const $1 = require("$2")'
    );
    jsCode = jsCode.replace(
      /\bnwetakwa\s*(\w+)\s*na\s*"([^"]+)"/g,
      'import $1 from "$2"'
    );
    jsCode = jsCode.replace(
      /\bnwapụtaNke\s+(\w+)/g,
      'export default $1'
    );
    jsCode = jsCode.replace(
      /\bnwapụtaNwere\s+(\w+)/g,
      'export const $1'
    );

    // Special case for na-agba
    jsCode = jsCode.replace(/(^|[^a-zA-Z0-9])(na-agba)(?![a-zA-Z0-9])/g, `$1render`);

    // Handle array method calls (e.g., tinye, wepụ, nyefee, etc.)
    const arrayMethods = [
      { igbo: "tinye", js: "push" },
      { igbo: "wepụ", js: "pop" },
      { igbo: "nyefee", js: "shift" },
      { igbo: "tinyeN'ihu", js: "unshift" },
      { igbo: "haziUdi", js: "map" },
      { igbo: "nyo", js: "filter" },
      { igbo: "belata", js: "reduce" },
      { igbo: "chọọ", js: "find" },
      { igbo: "haziNdepụta", js: "join" }
    ];

    for (const { igbo, js } of arrayMethods) {
      const escapedIgbo = igbo.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
      // Handle method calls with arguments (e.g., myArray.tinye("item4"))
      jsCode = jsCode.replace(
        new RegExp(`(\\w+)\\.${escapedIgbo}\\(([^)]*)\\)`, "g"),
        `$1.${js}($2)`
      );
      // Handle method calls without arguments (e.g., myArray.wepụ())
      jsCode = jsCode.replace(
        new RegExp(`(\\w+)\\.${escapedIgbo}\\(\\)`, "g"),
        `$1.${js}()`
      );
    }

    // Replace other keywords
    const sortedKeys = Object.keys(translations).sort((a, b) => b.length - a.length);
    for (const igbo of sortedKeys) {
      if (igbo === "na-agba" || arrayMethods.some(method => method.igbo === igbo)) continue; // Skip na-agba and array methods
      const escapedIgbo = igbo
        .replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&")
        .replace(/\s+/g, "\\s+");
      const regex = new RegExp(`(^|[^a-zA-Z0-9])${escapedIgbo}(?![a-zA-Z0-9])`, "g");
      jsCode = jsCode.replace(regex, `$1${translations[igbo]}`);
    }

    // Restore protected content
    jsCode = jsCode.replace(new RegExp(`"${stringPlaceholder}(\\d+)"`, "g"), (match, index) => {
      return `"${strings[index]}"`;
    });
    jsCode = jsCode.replace(new RegExp(`\\\`${templatePlaceholder}(\\d+)\\\``, "g"), (match, index) => {
      return `\`${templates[index]}\``;
    });
    jsCode = jsCode.replace(new RegExp(`${jsxPlaceholder}(\\d+)`, "g"), (match, index) => {
      return jsxFragments[index];
    });

    // Add semicolons (refined for React/Express)
    jsCode = jsCode.split("\n").map(line => {
      line = line.trim();
      if (
        line &&
        !line.endsWith(";") &&
        !line.endsWith("{") &&
        !line.endsWith("}") &&
        !line.endsWith(",") &&
        !line.match(/^(const|let|function|if|else|for|while|switch|return|export|import)\b/) &&
        !line.includes("=>") &&
        !line.match(/^[<\w].*\/?>$/) // Skip JSX lines
      ) {
        return line + ";";
      }
      return line;
    }).join("\n");

    return jsCode;
  } catch (error) {
    throw new Error(chalk.red(`Nsogbu na ntụgharị: ${error.message} (Translation Error)`));
  }
}

module.exports = { translate };