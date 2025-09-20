const fs = require("fs");
const path = require("path");
const { translate } = require("./parser");
const chalk = require("chalk");
const acorn = require("acorn");
const { execSync } = require("child_process");
const { getFrameworkPreset } = require("./framework");

// dectect framework from file content
function detectFramework(filePath, content) {
  const dir = path.dirname(filePath);
  const packageJsonPath = path.join(dir, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    try {
      const pkg = require(packageJsonPath);
      const dependencies = { ...pkg.dependencies, ...pkg.devDependencies };
      
      if (dependencies.express || dependencies['express']) return 'express';
      if (dependencies.react || dependencies['react']) return 'react';
      if (dependencies.next || dependencies['next']) return 'nextjs';
      if (content.includes('jiSteeti') || content.includes('useState')) return 'react';
      if (content.includes('ngwaExpress') || content.includes('express')) return 'express';
    } catch (e) {
      // Ignore package.json parsing errors
    }
  }
  
  // File path hints
  if (filePath.includes('pages') || filePath.includes('app')) return 'nextjs';
  if (filePath.includes('routes') || filePath.includes('api')) return 'express';
  
  return 'vanilla';
}

function runFile(filePath, options = { debug: false }) {
  try {
    const ext = path.extname(filePath);
    if (!['.is', '.js'].includes(ext)) {
      console.error(chalk.red("Error: Only .is and .js files are supported."));
      process.exit(1);
    }

    const content = fs.readFileSync(filePath, "utf8");
    const framework = detectFramework(filePath, content);
    console.log(chalk.cyan(`Detected framework: ${framework}`));
    
    // Enhanced translation with framework context
    const enhancedTranslate = (code) => {
      let translated = translate(code);
      const preset = getFrameworkPreset(framework);
      
      if (preset.additionalTranslations) {
        Object.entries(preset.additionalTranslations).forEach(([igbo, js]) => {
          const escapedIgbo = igbo.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
          const regex = new RegExp(`(^|[^a-zA-Z0-9])${escapedIgbo}(?![a-zA-Z0-9])`, "g");
          translated = translated.replace(regex, `$1${js}`);
        });
      }
      
      return translated;
    };

    const jsCode = enhancedTranslate(content);

    if (options.debug) {
      console.log(chalk.blue(`\n🇳🇬 Igbo → JS Translation (${framework}):\n`), jsCode, '\n');
    }

    // Validate syntax
    try {
      acorn.parse(jsCode, { ecmaVersion: "latest", sourceType: "module" });
    } catch (syntaxError) {
      console.error(chalk.red(`Syntax Error in generated code: ${syntaxError.message}`));
      process.exit(1);
    }

    // Save translated code to a temporary .js file
    const tempFilePath = path.join(path.dirname(filePath), `temp-${Date.now()}-${framework}.js`);
    fs.writeFileSync(tempFilePath, jsCode);

    // Execute based on context
    try {
      if (framework === 'nextjs' && (filePath.includes("pages") || filePath.includes("app"))) {
        console.log(chalk.green("🚀 Running Igboscript Next.js page..."));
        execSync(`node -e "require('${tempFilePath}')"`, { stdio: "inherit" });
      } else if (framework === 'express' && filePath.includes('routes')) {
        console.log(chalk.green("🌐 Running Igboscript Express route..."));
        // Simulate Express context
        execSync(`node -e "const express = require('express'); require('${tempFilePath}')(express())"`, { stdio: "inherit" });
      } else {
        console.log(chalk.green("⚡ Running Igboscript..."));
        execSync(`node ${tempFilePath}`, { stdio: "inherit" });
      }
    } finally {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }
  } catch (error) {
    console.error(chalk.red(`Execution Error: ${error.message}`));
    process.exit(1);
  }
}

module.exports = { runFile, detectFramework };