require("./loader"); // enable .is support

function runFile(filePath) {
  require(filePath); // Load and run Igbo code
}

module.exports = { runFile };
