const path = require("path");
const replace = require("replace-in-file");
const chalk = require("chalk");

//const FFI_LIB_FOLDER = path.dirname(require.resolve("ffi"));
const FFI_LIB_FOLDER = path.dirname(require.resolve("ffi-napi"));

var options = [{
  files: `${FFI_LIB_FOLDER}${path.sep}library.js`,
  from: /\s*(var\s*dl\s*=\s*new\s*DynamicLibrary)\((.*)\)/,
  to: "\nvar dl = new DynamicLibrary(libfile || null, RTLD_NOW | DynamicLibrary.FLAGS.RTLD_GLOBAL)",
}, {
  files: `${FFI_LIB_FOLDER}${path.sep}callback.js`,
  from: /\s+return callback/,
  to: "Object.defineProperty(func, '_func', {value:callback});return callback",
}];

module.exports = () => {
  options.forEach(o => {
    try {
      var changedFiles = replace.sync(o);

      if (changedFiles[0]) {
        console.log(chalk.red.bold("APPLYING SHIM"));
        console.log(chalk.blue.bold.underline(`Modified: ${o.files}`));
      }
    } catch(err) {
      throw new Error(`Error during shim | ${err}`);
    }
  });
}
