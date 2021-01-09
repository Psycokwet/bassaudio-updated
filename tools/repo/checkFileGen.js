const { exec } = require("child_process");

var i;
var count = 0;

const script = process.argv[2];
const file = process.argv[3];
var cmd_line = "node " + script + " > " + file;
if (process.argv[4] === "false") {
  cmd_line = "node " + script;
}

console.log("alive" + script + ":" + file);
exec(cmd_line, () => {
  require("fs")
    .createReadStream(file)
    .on("data", function (chunk) {
      for (i = 0; i < chunk.length; ++i) if (chunk[i] == 10) count++;
    })
    .on("end", function () {
      if (count == 0) throw new Error("File not gen !");
      console.log(count);
    });
});
