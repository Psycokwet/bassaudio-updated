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

const ref = require("ref-napi");
const path = require("path");
const ArrayType = require("ref-array-di")(ref);
const ffi = require("ffi-napi");
const os = require("os");
const setWrapDebug = require("./setWrapDebug");
const setWrapFun = require("./setWrapFun");
const setStructs = require("./setStructs");
const setCallbacks = require("./setCallbacks");
const FfiFunDeclarationIndex = require("./FfiFunDeclarationIndex");
const setFlags = require("./flags");
const libFile = require("./libFile");

function getPlatformDependencies() {
  let platform = os.platform();
  let arch = os.arch();

  switch (platform) {
    case "win32":
      const winLibFiles = {
        bass: new libFile("bass", "bass.dll"),
        mix: new libFile("mix", "bassmix.dll"),
        enc: new libFile("enc", "bassenc.dll"),
        tags: new libFile("tags", "tags.dll"),
      };
      if (arch == "x64") {
        return { path: "win64", libFiles: winLibFiles };
      } else if (arch == "x86") {
        return { path: "win32", libFiles: winLibFiles };
      } else {
        return null;
      }
    case "darwin":
      const macosLibFiles = {
        bass: new libFile("bass", "libbass.dylib"),
        mix: new libFile("mix", "libbassmix.dylib"),
        enc: new libFile("enc", "libbassenc.dylib"),
        tags: new libFile("tags", "libtags.dylib"),
      };
      return { path: "macOs", libFiles: macosLibFiles };
    case "linux":
      const linuxLibFiles = {
        bass: new libFile("bass", "libbass.so"),
        mix: new libFile("mix", "libbassmix.so"),
        enc: new libFile("enc", "libbassenc.so"),
        tags: new libFile("tags", "libtags.so"),
      };
      if (arch == "x64") {
        return { path: "linux64", libFiles: linuxLibFiles };
      } else if (arch == "x86") {
        return { path: "linux32", libFiles: linuxLibFiles };
      } else {
        return null;
      }
  }
  return null;
}

const libbass = require("./libbass");
const libenc = require("./libenc");
const libtags = require("./libtags");
const libmix = require("./libmix");

var libs = [];
libs.push(libbass);
libs.push(libenc);
libs.push(libtags);
libs.push(libmix);

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

  const platformDependencies = getPlatformDependencies();
  this.libFiles = platformDependencies.libFiles;
  const basePath = path.join(__dirname, "lib", platformDependencies.path);

  for (let prop in this.libFiles) {
    this.libFiles[prop].setPath(basePath);
  }
  setWrapDebug(Bass);
  setWrapFun(Bass);
  setStructs(this);
  setCallbacks(this);

  setFlags(this);

  for (i in libs) {
    if (libs[i])
      FfiFunDeclarationIndex.add(
        libs[i].key,
        libs[i].getFfiFunDeclarations(this)
      );
  }
  const ffiFunDeclaration = FfiFunDeclarationIndex.get("bass");

  enableLib(
    this.libFiles["bass"],
    new ffi.DynamicLibrary(
      this.libFiles["bass"].path,
      ffi.DynamicLibrary.FLAGS.RTLD_NOW | ffi.DynamicLibrary.FLAGS.RTLD_GLOBAL
    ),
    ffiFunDeclaration,
    this
  );

  this.libFiles["bass"].setDebugData({
    ffiFunDeclaration: ffiFunDeclaration,
  });
  EventEmitter.call(this);
}
// /////////////////////NATIVES FUNCTIONS/////////////////////////

Bass.prototype.MixerEnabled = function () {
  return this.libFiles["mix"].isEnabled();
};

Bass.prototype.EnableMixer = function (value) {
  if (value) {
    const ffiFunDeclaration = FfiFunDeclarationIndex.get("mix");
    enableLib(
      this.libFiles["mix"],
      this.libFiles["mix"].path,
      ffiFunDeclaration,
      this
    );
  } else {
    this.libFiles["mix"].disable();
  }
};

//endregion

//region encoder
Bass.prototype.EncoderEnabled = function () {
  return this.libFiles["enc"].isEnabled();
};

Bass.prototype.EnableEncoder = function (value) {
  if (value) {
    const ffiFunDeclaration = FfiFunDeclarationIndex.get("enc");

    enableLib(
      this.libFiles["enc"],
      this.libFiles["enc"].path,
      ffiFunDeclaration,
      this
    );
  } else {
    this.libFiles["enc"].disable();
  }
};

///////////////////////TAGS lib/////////////////////////////
Bass.prototype.TagsEnabled = function () {
  return this.libFiles["tags"].isEnabled();
};

Bass.prototype.EnableTags = function (value) {
  if (value) {
    const ffiFunDeclaration = FfiFunDeclarationIndex.get("tags");

    enableLib(
      this.libFiles["tags"],
      this.libFiles["tags"].path,
      ffiFunDeclaration,
      this
    );
  } else {
    this.libFiles["tags"].disable();
  }
};

function enableLib(libFile, pathOrDl, ffiFunDeclaration, bass) {
  libFile.enable(ffi.Library(pathOrDl, ffiFunDeclaration));

  for (let fun in ffiFunDeclaration) {
    Bass.prototype[fun] = (...args) => libFile.tryFunc(fun, ...args);
  }
  libFile.setDebugData({
    ffiFunDeclaration: ffiFunDeclaration,
  });
}

exports = module.exports = Bass;
