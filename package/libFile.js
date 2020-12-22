/**
 * Created by scarboni on 21.12.2020
 */

const path = require("path");

const setStructs = require("./setStructs");
const argTypeValuesDefault = {
  int: 0,
  int64: "0",
  string: "0",
  pointer: null,
  bool: false,
};

var structs = {};
setStructs(structs);
for (let prop in structs) {
  argTypeValuesDefault[prop] = structs[prop].generateNewRefObject().ref();
}

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
    if (!this.isEnabled())
      throw new Error(wrapper_errors.libNotEnabled(this.id));
    var finalArgs = [];
    for (let i in this.ffiFunDeclaration[fun][1]) {
      if (args[i] !== undefined) finalArgs.push(args[i]);
      else finalArgs.push(this.basicGeneratedInputs[fun][1][i]);
    }
    return this.dl[fun](...finalArgs);
  }
  setDebugData({ ffiFunDeclaration }) {
    this.ffiFunDeclaration = ffiFunDeclaration;
    this.basicGeneratedInputs = generateTestInput(ffiFunDeclaration);
  }
  getDebugData() {
    return {
      ffiFunDeclaration: this.ffiFunDeclaration,
      basicGeneratedInputs: this.basicGeneratedInputs,
    };
  }
}

function generateTestInput(ffiFunDeclaration) {
  var basicGeneratedInputs = {};
  for (let fun in ffiFunDeclaration) {
    let values = ffiFunDeclaration[fun];
    let returnType = values[0];
    let argTypes = values[1];
    if (values[2]) argTypes = values[2];

    let generatedArgValues = [];
    for (let i in argTypes) {
      if (argTypeValuesDefault[argTypes[i]] !== undefined)
        generatedArgValues.push(argTypeValuesDefault[argTypes[i]]);
      else generatedArgValues.push(null);
    }
    basicGeneratedInputs[fun] = [returnType, generatedArgValues];
  }
  return basicGeneratedInputs;
}
exports = module.exports = libFile;
