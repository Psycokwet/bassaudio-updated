const setStructs = require("../../package/setters/setStructs");

var structs = {};
setStructs(structs);
for (let prop in structs) {
  console.log(
    "- [" +
      prop +
      "](http://www.un4seen.com/doc/#" +
      structs[prop].libid +
      "/" +
      prop +
      ".html)\n"
  );
}

console.log(
  "If there is no link to the documentation, it may be available only when downloading the addon from un4seen, in the given archive."
);
