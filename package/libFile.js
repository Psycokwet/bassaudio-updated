/**
 * Created by scarboni on 21.12.2020
 */

const path = require("path");

const ref = require("ref-napi");
const setStructs = require("./setStructs");
const setCallbacks = require("./setCallbacks");
const argTypeValuesDefault = {
  int: ref.alloc("int", 0).ref(),
  int64: "0",
  string: "0",
  float: ref.alloc("float", 0).ref(),
  bool: ref.alloc("bool", false).ref(),
};

var structs = {};
setStructs(structs);
for (let prop in structs) {
  argTypeValuesDefault[prop] = structs[prop].generateNewObject().ref();
}
const argCallbackBuilders = {};
var callbacks = {};
setCallbacks(callbacks);
for (let prop in callbacks) {
  argCallbackBuilders[prop] = callbacks[prop];
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
      if (this.basicGeneratedInputs[fun][1][i] === "callback") {
        let builder = argCallbackBuilders[this.ffiFunDeclaration[fun][2][i]];
        if (args[i] !== undefined)
          finalArgs.push(builder.generateNewObject(args[i]));
        else finalArgs.push(builder.generateNewObject(null));
      } else {
        if (args[i] !== undefined) finalArgs.push(args[i]);
        else finalArgs.push(this.basicGeneratedInputs[fun][1][i]);
      }
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
      else if (argCallbackBuilders[argTypes[i]] !== undefined)
        generatedArgValues.push("callback");
      else generatedArgValues.push(null);
    }
    basicGeneratedInputs[fun] = [returnType, generatedArgValues];
  }
  return basicGeneratedInputs;
}
exports = module.exports = libFile;
