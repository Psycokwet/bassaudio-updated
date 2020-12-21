/**
 * Created by scarboni on 21.12.2020
 */

const path = require("path");

class libFile {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.dl = null;
    return this;
  }
  setPath(basePath) {
    this.path = path.join(basePath, this.name);
  }
  enable(dl) {
    if (!dl) return false;
    this.dl = dl;
    return true;
  }
  isEnabled() {
    return this.dl == null ? false : true;
  }
  disable() {
    this.dl = null;
  }
  tryFunc(fun, ...args) {
    console.log("try " + fun + ":" + args);
    if (this.isEnabled()) return this.dl[fun](...args);
    throw new Error(wrapper_errors.libNotEnabled(this.id));
  }
  setDebugData({ ffiFunDeclaration }) {
    this.ffiFunDeclaration = ffiFunDeclaration;
  }
  getDebugData() {
    return { ffiFunDeclaration: this.ffiFunDeclaration };
  }
}

exports = module.exports = libFile;
