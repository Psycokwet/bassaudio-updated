/**
 * Created by serkan on 30.10.2016.
 * Updated by scarboni since 20.10.2020
 */

/**
 *  hsync : int
 *  dword : int
 *  HWND : int used 0 ?
 *  GUID : int used Null?
 *  int : int
 *  bool : bool
 *  float : float
 *  void : void
 */

const chalk = require("chalk");
const applyShim = require("../shim.js");

const EventEmitter = require("events").EventEmitter;

const util = require("util");
util.inherits(Bass, EventEmitter);

const path = require("path");
const ffi = require("ffi-napi");

const fs = require("fs");

const enableLibInt = require("./enableLibInt");
const getPlatformDependencies = require("./getPlatformDependencies");

// Read in the libs from this directory and import them
var setters = [];
fs.readdirSync(path.join(".", "package", "setters")).forEach(function (file) {
  if (file.indexOf(".js") > -1)
    setters.push(require("./" + path.join("setters", file)));
});

var libDeclarations = [];
fs.readdirSync(path.join(".", "package", "libDeclarations")).forEach(function (
  file
) {
  if (file.indexOf(".js") > -1)
    libDeclarations.push(require("./" + path.join("libDeclarations", file)));
});

function Bass(options) {
  if (!options) options = {};
  try {
    applyShim(options.silent);
  } catch (err) {
    console.error(chalk.bgRed.white.bold(err));
  }

  if (options.ffiFunDeclaration) {
    console.log(options.ffiFunDeclaration);
  }

  this.FfiFunDeclarationIndex = require("./FfiFunDeclarationIndex");
  const platformDependencies = getPlatformDependencies();
  this.libFiles = platformDependencies.libFiles;
  const basePath = path.join(__dirname, "lib", platformDependencies.path);

  for (let i in setters) if (setters[i]) setters[i](this);

  for (let prop in this.libFiles) {
    this.libFiles[prop].setPath(basePath);
  }

  for (let i in libDeclarations) {
    if (libDeclarations[i])
      this.FfiFunDeclarationIndex.add(
        libDeclarations[i].key,
        libDeclarations[i].getFfiFunDeclarations(this)
      );
  }

  const ffiFunDeclaration = this.FfiFunDeclarationIndex.get("bass");

  enableLibInt(
    this,
    this.libFiles["bass"],
    new ffi.DynamicLibrary(
      this.libFiles["bass"].path,
      ffi.DynamicLibrary.FLAGS.RTLD_NOW | ffi.DynamicLibrary.FLAGS.RTLD_GLOBAL
    ),
    ffiFunDeclaration
  );

  this.libFiles["bass"].setDebugData({
    ffiFunDeclaration: ffiFunDeclaration,
  });
  EventEmitter.call(this);
}

exports = module.exports = Bass;
