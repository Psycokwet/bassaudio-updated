var getBass = require("../tools/getBass");
var test_datas = require("../tools/repo/test-data");

var value = null;

var libNames;
var linked = 0;
var awaited = 0;
console.log("Before test " + value);
test("set value ", () => {
  expect(() => {
    value = getBass({
      silent: true,
    });
    value.EnableAllAvailable(true);
    libNames = value.WRAP_DEBUG_getAllLibNameActivated();
    console.log("Set " + value + ":" + libNames);
  }).not.toThrowError();
});
test("get value ", () => {
  expect(() => {
    console.log("Get " + value + ":" + libNames);
  }).not.toThrowError();
});
var valueForOtherTest;
describe("matching cities to foods", () => {
  // Applies only to tests in this describe block

  beforeAll(() => {
    console.log("After test " + value);
    console.log("descrbe test " + libNames);
    valueForOtherTest = value + 1;
  });
  test.each(test_datas)(".empty %s", (fun) => {
    expect(() => {
      basslib[fun]();
      linked++;
    }).not.toThrowError();
  });
});
