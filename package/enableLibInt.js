/**
 * Created by scarboni on 21.12.2020
 */

const ffi = require("ffi-napi");

function enableLibInt(bass, libFile, path, ffiFunDeclaration) {
  // libFile.enable(ffi.Library(pathOrDl, ffiFunDeclaration));

  libFile.enable(
    ffi.Library(
      new ffi.DynamicLibrary(
        path,
        ffi.DynamicLibrary.FLAGS.RTLD_NOW | ffi.DynamicLibrary.FLAGS.RTLD_GLOBAL
      ),
      ffiFunDeclaration
    )
  );
  for (let fun in ffiFunDeclaration) {
    bass[fun] = (...args) => libFile.tryFunc(fun, ...args);
  }
  libFile.setDebugData({
    ffiFunDeclaration: ffiFunDeclaration,
  });
}

exports = module.exports = enableLibInt;
