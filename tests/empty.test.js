var getBass = require("../tools/getBass");
var basslib = getBass({
  silent: true,
});

basslib.EnableTags(true);
basslib.EnableEncoder(true);
basslib.EnableMixer(true);
basslib.EnableEncmp3(true);

var libNames = basslib.WRAP_DEBUG_getAllLibNameActivated();
var linked = 0;
var awaited = 0;
for (let i in libNames) {
  var { ffiFunDeclaration } = basslib.WRAP_DEBUG_getDebugData(libNames[i]);
  if (!ffiFunDeclaration) continue;
  awaited += Object.keys(ffiFunDeclaration).length;
}

for (let i in libNames) {
  var { ffiFunDeclaration } = basslib.WRAP_DEBUG_getDebugData(libNames[i]);
  for (let fun in ffiFunDeclaration) {
    // console.log(fun + " return " + basslib[fun]());

    test("Empty test for " + fun, () => {
      expect(() => {
        basslib[fun]();
        linked++;
      }).not.toThrowError();
    });
  }
}

test("test all tests have passed", () => {
  expect(awaited).toBe(linked);
});
