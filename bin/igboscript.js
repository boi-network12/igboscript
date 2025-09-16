#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { runFile } = require("../src/runner");
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
Igboscript CLI
Usage: igboscript <file.is | directory> [options]

Options:
  -v, --version     Show version number
  -h, --help        Show this help message
  --watch           Watch file(s) for changes and rerun
  --debug           Output translated JavaScript code
  --build           Compile .is files to .js in output directory
  --out-dir <dir>   Specify output directory for compiled files (default: ./dist)
`));
  process.exit(0);
}

const fileOrDir = args.find(arg => !arg.startsWith("--"));
const debug = args.includes("--debug");
const watch = args.includes("--watch");
const build = args.includes("--build");
const outDir = args.find((arg, i) => (arg === "--out-dir" && args[i + 1]) || arg.startsWith("--out-dir="))
  ?.replace("--out-dir=", "") || args[args.indexOf("--out-dir") + 1] || "./dist";

if (!fileOrDir) {
  console.error(chalk.red("Biko, nye faịlụ .is maọbụ folda (Please provide a .is file or directory)"));
  process.exit(1);
}

const filePath = path.resolve(process.cwd(), fileOrDir);

function compileFile(file) {
  try {
    if (build) {
      const jsCode = require("../src/parser").translate(fs.readFileSync(file, "utf8"));
      const outFile = path.join(outDir, path.relative(process.cwd(), file).replace(/\.is$/, ".js"));
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, jsCode);
      console.log(chalk.green(`Compiled ${file} to ${outFile}`));
    } else {
      runFile(file, { debug });
    }
  } catch (error) {
    console.error(chalk.red(`Nsogbu na ${file}: ${error.message} (Error in ${file})`));
  }
}

function processFiles(pattern) {
  const files = glob.sync(pattern, { cwd: process.cwd(), absolute: true });
  if (files.length === 0) {
    console.error(chalk.red(`Ọnweghị faịlụ .is hụrụ na ${fileOrDir} (No .is files found in ${fileOrDir})`));
    process.exit(1);
  }
  files.forEach(file => compileFile(file));
}

if (watch) {
  console.log(chalk.yellow(`Na-ele ${fileOrDir} maka mgbanwe... (Watching ${fileOrDir} for changes...)`));
  chokidar.watch(fileOrDir, { ignored: /(^|[\/\\])\..|node_modules|dist/ }).on("change", (file) => {
    if (path.extname(file) === ".is") {
      console.log(chalk.yellow(`Faịlụ ${file} gbanwere, na-agba ọsọ ọzọ... (File ${file} changed, rerunning...)`));
      compileFile(file);
    }
  });
} else if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
  processFiles(path.join(filePath, "**/*.is"));
} else if (fs.existsSync(filePath) && path.extname(filePath) === ".is") {
  compileFile(filePath);
} else {
  console.error(chalk.red(`Faịlụ maọbụ folda adịghị: ${fileOrDir} (File or directory not found: ${fileOrDir})`));
  process.exit(1);
}