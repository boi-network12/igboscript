const fs = require("fs");
const { translate } = require("./parser");

require.extensions[".is"] = function (module, filename) {
  const content = fs.readFileSync(filename, "utf8");
  const jsCode = translate(content);
  return module._compile(jsCode, filename);
};
