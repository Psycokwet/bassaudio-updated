var bass = require("../index");
var basslib = new bass();

/////////////////////////PRETEST//////////////////////////////////

basslib.EnableTags(true);
// basslib.EnableEncoder(true);
// basslib.EnableMixer(true);

test("everyFun", () => {
  for (let fun in basslib) {
    if (typeof basslib[fun] === "function") {
      console.log(fun);
      basslib[fun](1);
    } else {
      console.log("reject" + fun);
    }
  }
  expect(basslib.BASS_GetVersion()).toBe(33820416);
});
