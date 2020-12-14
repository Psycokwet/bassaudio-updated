var bass = require("../index");
var basslib = new bass();

test("adds 1 + 2 to equal 3", () => {
  expect(basslib.BASS_GetVersion()).toBe(33820416);
});
