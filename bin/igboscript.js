#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { runFile } = require("../src/runner");
const chalk = require("chalk");
const chokidar = require("chokidar");
const pkg = require("../package.json");

const args = process.argv.slice(2);

if (args.includes("--version") || args.includes("-v")) {
  console.log(chalk.blue(`Igboscript v${pkg.version}`));
  process.exit(0);
}

if (args.includes("--help") || args.includes("-h")) {
  console.log(chalk.blue(`
Igboscript CLI
Usage: igboscript <file.is> [options]

Options:
  -v, --version   Show version number
  -h, --help      Show this help message
  --watch         Watch file for changes and rerun
`));
  process.exit(0);
}

const file = args.find(arg => !arg.startsWith("--"));
if (!file) {
  console.error(chalk.red("Biko, nye faịlụ .is (Please provide a .is file)"));
  process.exit(1);
}

const filePath = path.resolve(process.cwd(), file);

if (args.includes("--watch")) {
  console.log(chalk.yellow(`Watching ${file} for changes...`));
  chokidar.watch(filePath).on("change", () => {
    console.log(chalk.yellow(`File changed, rerunning ${file}...`));
    runFile(filePath);
  });
} else {
  runFile(filePath);
}