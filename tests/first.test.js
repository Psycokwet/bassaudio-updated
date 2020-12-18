var bass = require("../index");
var basslib = new bass();

/////////////////////////PRETEST//////////////////////////////////

test("BASS_GetVersion", () => {
  expect(basslib.BASS_GetVersion()).toBe(33820416);
});

/////////////////////////TAGS//////////////////////////////////
test("TAGS_GetVersion", () => {
  expect(() => {
    basslib.TAGS_GetVersion();
  }).toThrowError();
});

test("TagsEnabled", () => {
  basslib.EnableTags(true);
  expect(basslib.TagsEnabled()).toBe(true);
});

test("TAGS_GetVersion", () => {
  expect(basslib.TAGS_GetVersion()).toBe(4608);
});

test("TagsDisabled", () => {
  basslib.EnableTags(false);
  expect(basslib.TagsEnabled()).toBe(false);
});

test("TAGS_GetVersion", () => {
  expect(() => {
    basslib.TAGS_GetVersion();
  }).toThrowError();
});
