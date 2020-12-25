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
// util.inherits(Bass, EventEmitter);

const path = require("path");
const ffi = require("ffi-napi");
const os = require("os");

const fs = require("fs");

// Read in the libs from this directory and add them as exports
// This way you can just reference
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

const FfiFunDeclarationIndex = require("./FfiFunDeclarationIndex");
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

  for (let i in setters) if (setters[i]) setters[i](this);
  const platformDependencies = getPlatformDependencies();
  this.libFiles = platformDependencies.libFiles;
  const basePath = path.join(__dirname, "lib", platformDependencies.path);

  for (let prop in this.libFiles) {
    this.libFiles[prop].setPath(basePath);
  }

  for (let i in libDeclarations) {
    if (libDeclarations[i])
      FfiFunDeclarationIndex.add(
        libDeclarations[i].key,
        libDeclarations[i].getFfiFunDeclarations(this)
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
  // EventEmitter.call(this);
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
