/**
 * Created by scarboni on 21.12.2020
 */

const ffi = require("ffi-napi");

function enableLibInt(bass, libname) {
  let ffiFunDeclaration = bass.FfiFunDeclarationIndex.get(libname);
  bass.libFiles[libname].enable(
    ffi.Library(
      new ffi.DynamicLibrary(
        bass.libFiles[libname].path,
        ffi.DynamicLibrary.FLAGS.RTLD_NOW | ffi.DynamicLibrary.FLAGS.RTLD_GLOBAL
      ),
      ffiFunDeclaration
    )
  );
  for (let fun in ffiFunDeclaration) {
    bass[fun] = (...args) => bass.libFiles[libname].tryFunc(fun, ...args);
  }
  bass.libFiles[libname].setDebugData({
    ffiFunDeclaration: ffiFunDeclaration,
  });
}

exports = module.exports = enableLibInt;
