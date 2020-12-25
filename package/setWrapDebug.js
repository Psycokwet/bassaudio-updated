/**
 * Updated by scarboni on 24.12.2020
 */

function setWrapDebug(Bass) {
  Bass.prototype.WRAP_DEBUG_getDebugData = function (libName) {
    return this.libFiles[libName].getDebugData();
  };

  Bass.prototype.WRAP_DEBUG_getAllLibNameActivated = function () {
    let libNames = [];
    for (let prop in this.libFiles) {
      libNames.push(prop);
    }
    return libNames;
  };
}

exports = module.exports = setWrapDebug;
