#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { runFile, detectFramework } = require("../src/runner");
const chalk = require("chalk");
const chokidar = require("chokidar");
const pkg = require("../package.json");
const glob = require("glob");

const args = process.argv.slice(2);

if (args.includes("--version") || args.includes("-v")) {
  console.log(chalk.blue(`Igboscript v${pkg.version}`));
  process.exit(0);
}

if (args.includes("--help") || args.includes("-h")) {
      console.log(chalk.blue(`
    ${chalk.bold('🇳🇬 Igboscript CLI - Koodu n\'asụsụ Igbo!')}

    ${chalk.bold('Usage:')} igboscript <file.is | directory> [options]

    ${chalk.bold('Options:')}
      -v, --version           Show version number
      -h, --help              Show this help message
      --watch                 Watch file(s) for changes and rerun
      --debug                 Output translated JavaScript code
      --build                 Compile .is/.js files to .js in output directory
      --framework <name>      Force framework detection (express|react|nextjs|vanilla)
      --out-dir <dir>         Specify output directory (default: ./dist)
      --list-keywords         Show all available Igbo keywords

    ${chalk.bold('Supported Frameworks:')} Express • React • Next.js • Vanilla Node.js

    ${chalk.bold('Example:')}
      igboscript app.is                    # Run single file
      igboscript src/ --watch --debug      # Watch directory with debug
      igboscript --build --out-dir=dist/   # Build project
      igboscript --framework=express api/  # Force Express context
    `));
      process.exit(0);
  }

  // New command: list keywords
if (args.includes("--list-keywords")) {
  const { translations } = require("../constant/TranslationConstant");
  console.log(chalk.green('\n🇳🇬 Igboscript Keywords:\n'));
  
  const sortedKeywords = Object.entries(translations)
    .sort(([a], [b]) => a.localeCompare(b))
    .filter(([igbo]) => !igbo.includes('tagi')); // Skip JSX tags for cleaner output
  
  console.table(sortedKeywords.map(([igbo, js]) => ({ 
    'Igbo': igbo, 
    'JavaScript': js.replace(/Array\./, '').replace(/String\./, '').replace(/Object\./, '').replace(/Math\./, '') 
  })));
  process.exit(0);
}

const fileOrDir = args.find(arg => !arg.startsWith("--"));
const debug = args.includes("--debug");
const watch = args.includes("--watch");
const build = args.includes("--build");
const framework = args.find(arg => arg.startsWith('--framework='))?.replace('--framework=', '') || 
                 (args.includes('--framework') ? args[args.indexOf('--framework') + 1] : null);
const outDir = args.find((arg, i) => (arg === "--out-dir" && args[i + 1]) || arg.startsWith("--out-dir="))
  ?.replace("--out-dir=", "") || args[args.indexOf("--out-dir") + 1] || "./dist";

if (!fileOrDir) {
  console.error(chalk.red("Biko, nye faịlụ .is maọbụ folda (Please provide a .is or .js file/directory)"));
  process.exit(1);
}

const filePath = path.resolve(process.cwd(), fileOrDir);

function compileFile(file, forcedFramework = null) {
  try {
    if (build) {
      const content = fs.readFileSync(file, "utf8");
      const detectedFramework = forcedFramework || detectFramework(file, content);
      const jsCode = require("../src/parser").translate(content);
      
      const outFile = path.join(outDir, path.relative(process.cwd(), file).replace(/\.(is|js)$/, ".js"));
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, jsCode);
      console.log(chalk.green(`✅ Compiled ${path.basename(file)} → ${path.basename(outFile)} (${detectedFramework})`));
    } else {
      runFile(file, { debug, framework: forcedFramework });
    }
  } catch (error) {
    console.error(chalk.red(`❌ Nsogbu na ${path.basename(file)}: ${error.message}`));
  }
}

function processFiles(pattern) {
  const files = glob.sync(pattern, { cwd: process.cwd(), absolute: true });
  if (files.length === 0) {
    console.error(chalk.red(`Ọnweghị faịlụ .is/.js hụrụ na ${fileOrDir} (No .is/.js files found)`));
    process.exit(1);
  }
  
  console.log(chalk.cyan(`📁 Processing ${files.length} file(s)...`));
  files.forEach(file => compileFile(file, framework));
}


if (watch) {
  console.log(chalk.yellow(`👀 Na-ele ${fileOrDir} maka mgbanwe... (Watching for changes...)`));
  chokidar.watch(fileOrDir, { 
    ignored: /(^|[\/\\])\..|node_modules|dist/ 
  }).on("change", (file) => {
    if (['.is', '.js'].includes(path.extname(file))) {
      console.log(chalk.yellow(`🔄 ${path.basename(file)} gbanwere, na-agba ọsọ ọzọ...`));
      compileFile(file, framework);
    }
  });
} else if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
  processFiles(path.join(filePath, "**/*.{is,js}"));
} else if (fs.existsSync(filePath) && ['.is', '.js'].includes(path.extname(filePath))) {
  compileFile(filePath, framework);
} else {
  console.error(chalk.red(`❌ Faịlụ maọbụ folda adịghị: ${fileOrDir}`));
  process.exit(1);
}