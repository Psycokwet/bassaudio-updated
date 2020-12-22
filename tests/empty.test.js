var bass = require("../");
var basslib = new bass();

/////////////////////////PRETEST//////////////////////////////////

basslib.EnableTags(true);
basslib.EnableEncoder(true);
basslib.EnableMixer(true);

test("test basic linking", () => {
  var libNames = basslib.WRAP_DEBUG_getAllLibNameActivated();
  var linked = 0;
  var awaited = 0;
  for (let i in libNames) {
    var { ffiFunDeclaration } = basslib.WRAP_DEBUG_getDebugData(libNames[i]);
    awaited += Object.keys(ffiFunDeclaration).length;
  }

  for (let i in libNames) {
    var { ffiFunDeclaration } = basslib.WRAP_DEBUG_getDebugData(libNames[i]);
    for (let fun in ffiFunDeclaration) {
      // console.log(fun + " return " + basslib[fun]());
      basslib[fun]();
      linked++;
    }
  }
  expect(awaited).toBe(linked);
});
