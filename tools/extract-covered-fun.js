var bass = require("../");
var basslib = new bass();

/////////////////////////PRETEST//////////////////////////////////

basslib.EnableTags(true);
basslib.EnableEncoder(true);
basslib.EnableMixer(true);

var libNames = basslib.WRAP_DEBUG_getAllLibNameActivated();

for (let i in libNames) {
  var { ffiFunDeclaration } = basslib.WRAP_DEBUG_getDebugData(libNames[i]);
  console.log("From " + libNames[i] + " :");
  for (let fun in ffiFunDeclaration) {
    console.log("- " + fun + "\n");
  }
}
