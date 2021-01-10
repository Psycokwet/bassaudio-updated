/**
 * Created by scarboni on 25.12.2020
 */

const os = require("os");
const libFile = require("./libFile");

function getPlatformDependencies() {
  let platform = os.platform();
  let arch = os.arch();

  switch (platform) {
    case "win32":
      const winLibFiles = {
        bass: new libFile("bass", "bass.dll"),
        mixer: new libFile("mixer", "bassmix.dll"),
        encoder: new libFile("encoder", "bassenc.dll"),
        encMP3: new libFile("encMP3", "bassenc_mp3.dll"),
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
        mixer: new libFile("mixer", "libbassmix.dylib"),
        encoder: new libFile("encoder", "libbassenc.dylib"),
        encMP3: new libFile("encMP3", "libbassenc_mp3.dylib"),
        tags: new libFile("tags", "libtags.dylib"),
      };
      return { path: "macOs", libFiles: macosLibFiles };
    case "linux":
      const linuxLibFiles = {
        bass: new libFile("bass", "libbass.so"),
        mixer: new libFile("mixer", "libbassmix.so"),
        encoder: new libFile("encoder", "libbassenc.so"),
        encMP3: new libFile("encMP3", "libbassenc_mp3.so"),
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

exports = module.exports = getPlatformDependencies;
