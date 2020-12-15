var bass = require("../index");
var basslib = new bass();

/////////////////////////PRETEST//////////////////////////////////

test("BASS_GetVersion", () => {
  expect(basslib.BASS_GetVersion()).toBe(33820416);
});
