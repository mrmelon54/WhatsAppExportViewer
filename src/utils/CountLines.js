import {createReadStream} from "fs";
import {createInterface} from "readline";

export function countLines(filename, func) {
  const lineReader = createInterface({
    input: createReadStream(filename),
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
