/**
 * Created by scarboni on 21.12.2020
 */

const ffi = require("ffi-napi");

function enableLibInt(bass, libFile, pathOrDl, ffiFunDeclaration) {
  libFile.enable(ffi.Library(pathOrDl, ffiFunDeclaration));

  for (let fun in ffiFunDeclaration) {
    bass[fun] = (...args) => libFile.tryFunc(fun, ...args);
  }
  libFile.setDebugData({
    ffiFunDeclaration: ffiFunDeclaration,
  });
}

exports = module.exports = enableLibInt;
