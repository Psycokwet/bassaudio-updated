var getBass = require("../tools/getBass");
var test_datas = require("../tools/repo/test-data");
var basslib;
test("Init basslib", () => {
  expect(() => {
    basslib = getBass({
      silent: true,
    });

    basslib.EnableAllAvailable(true);
  }).not.toThrowError();
});

var linked = 0;

test.each(test_datas)(".empty %s", (fun) => {
  expect(() => {
    basslib[fun]();
    linked++;
  }).not.toThrowError();
});

test("test all tests have passed", () => {
  expect(test_datas.length).toBe(linked);
});
