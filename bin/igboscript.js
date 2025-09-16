#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { runFile } = require("../src/runner");

const file = process.argv[2];
if (!file) {
  console.error("Biko, nye faịlụ .is");
  process.exit(1);
}

const filePath = path.resolve(process.cwd(), file);
runFile(filePath);
