var Bass = require("../");
console.log(Bass);
var basslib = new Bass();

/////////////////////////PRETEST//////////////////////////////////

const argTypeValuesDefault = {
  int: 0,
  int64: "0",
  string: "0",
  pointer: null,
  bool: false,
};

const generateTestInputFor = (libname) => {
  var { ffiFunDeclaration } = basslib.WRAP_DEBUG_getDebugData(libname);

  var testGeneratedInputs = {};
  for (let fun in ffiFunDeclaration) {
    let values = ffiFunDeclaration[fun];
    let returnType = values[0];
    let argTypes = values[1];

    let generatedArgValues = [];
    for (let i in argTypes) {
      if (argTypeValuesDefault[argTypes[i]] !== undefined)
        generatedArgValues.push(argTypeValuesDefault[argTypes[i]]);
      else generatedArgValues.push(0);
    }
    testGeneratedInputs[fun] = [returnType, generatedArgValues];
  }
  return testGeneratedInputs;
};

///////////////////UTIL//////////////////////

basslib.EnableTags(true);
// basslib.EnableEncoder(true);
// basslib.EnableMixer(true);

var libNames = basslib.WRAP_DEBUG_getAllLibNameActivated();
var testGeneratedInputs = generateTestInputFor(libNames[0]);

for (let generatedTestValues in testGeneratedInputs) {
  console.log(
    "Return " +
      basslib[generatedTestValues](
        ...testGeneratedInputs[generatedTestValues][1]
      )
  );
}

console.log("testGeneratedInputs");
console.log(testGeneratedInputs);

// console.log(ffiFunDeclaration);
// for (let fun in basslib) {
//   if (fun.startsWith("BASS") && typeof basslib[fun] === "function") {
//     console.log(fun);
//     console.log(fun + ":" + basslib[fun]("0", "0", "3", "3"));
//     // basslib[fun](1, 1, 1, 1);
//   } else {
//     // console.log("reject" + fun);
//   }
// }

// const ref = require("ref-napi");
// const Struct = require("ref-struct-di")(ref);

// const BASS_DEVICEINFO = Struct({
//   name: "string",
//   driver: "string",
//   flags: "int",
// });

// var info = new BASS_DEVICEINFO({ name: "test", driver: "ccbis", flags: 42 });
// console.log("info");
// console.log(info.flags); //works fine
// console.log(info.name); //works fine (is at null but I didn't set it so it looks normal)
// console.log(info.driver); // crashes
// console.log(info.ref().deref()); //works fine
