const fs = require("fs");
const { translate } = require("./parser");

// Add support for `.is` files in Node.js
require.extensions[".is"] = function (module, filename) {
  const content = fs.readFileSync(filename, "utf8");
  const jsCode = translate(content);
  return module._compile(jsCode, filename);
};
