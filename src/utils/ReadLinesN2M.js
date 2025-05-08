import {createReadStream} from "fs";
import {createInterface} from "readline";

export function readLinesN2M(filename, n, m, func, onClose) {
  const lineReader = createInterface({
    input: createReadStream(filename),
  });

  let lineNumber = 0;
  let done = false;

  lineReader.on("line", function (line) {
    lineNumber++;
    if (lineNumber >= n && lineNumber < m) func(line, lineNumber);
    else if (lineNumber > m) lineReader.close();
  });

  lineReader.on("close", function () {
    if (!done) {
      done = true;
      onClose();
    }
  });
}
