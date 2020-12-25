var getBass = require("../tools/getBass");
var basslib = getBass({
  silent: true,
});

const ffiFunDeclaration = {
  BASS_GetVersion: ["int", []],
};
var basslib = new Bass({ ffiFunDeclaration: { bass: ffiFunDeclaration } });
