/**
 * Created by scarboni on 25.12.2020
 */

const os = require("os");

function getPlatformDependenciesForOneFile(
  ffiFunDeclaration,
  macPath,
  winPath32,
  winPath,
  linPath32,
  linPath
) {
  let platform = os.platform();
  let arch = os.arch();

  switch (platform) {
    case "win32":
      if (arch == "x64") {
        return {
          path: winPath,
          ffiFunDeclaration: ffiFunDeclaration,
        };
      } else if (arch == "x86") {
        return {
          path: winPath32,
          ffiFunDeclaration: ffiFunDeclaration,
        };
      } else {
        return null;
      }
    case "darwin":
      return {
        path: macPath,
        ffiFunDeclaration: ffiFunDeclaration,
      };
    case "linux":
      if (arch == "x64") {
        return {
          path: linPath,
          ffiFunDeclaration: ffiFunDeclaration,
        };
      } else if (arch == "x86") {
        return {
          path: linPath32,
          ffiFunDeclaration: ffiFunDeclaration,
        };
      } else {
        return null;
      }
  }
  return null;
}

exports = module.exports = getPlatformDependenciesForOneFile;
