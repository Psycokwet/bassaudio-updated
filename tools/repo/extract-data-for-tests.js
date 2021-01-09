var getBass = require("../getBass");
var basslib = getBass({ silent: true });

basslib.EnableAllAvailable(true);

var libNames = basslib.WRAP_DEBUG_getAllLibNameActivated();

const libnameCorres = {
  bass: "bass",
  encoder: "bassenc",
  mixer: "bassmix",
  encMP3: "bassenc_mp3",
};

var fs = require("fs");
var path = require("path");

var content = "";
content += "const allFunAvailables = [";
for (let i in libNames) {
  var { ffiFunDeclaration } = basslib.WRAP_DEBUG_getDebugData(libNames[i]);
  for (let fun in ffiFunDeclaration) {
    if (libnameCorres[libNames[i]]) content += '"' + fun + '",';
  }
}

content += "]\nexports = module.exports = allFunAvailables;";

fs.writeFile(path.join(__dirname, "test-data.js"), content, (err) => {
  // In case of a error throw err.
  if (err) throw err;
});
