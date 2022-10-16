const fs = require("fs");
const readline = require("readline");

function countLines(filename, func) {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(filename),
  });

  let lineNumber = 0;
  let done = false;

  lineReader.on("line", function () {
    lineNumber++;
  });

  lineReader.on("close", function () {
    if (!done) {
      done = true;
      func(lineNumber);
    }
  });
}

module.exports = countLines;
