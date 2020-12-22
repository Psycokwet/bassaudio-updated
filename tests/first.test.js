var bass = require("../");
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

test("TAGS_SetUTF8_1", () => {
  expect(basslib.TAGS_SetUTF8(true)).toBe(false);
});
test("TAGS_SetUTF8_2", () => {
  expect(basslib.TAGS_SetUTF8(true)).toBe(true);
});
test("TAGS_SetUTF8_3", () => {
  expect(basslib.TAGS_SetUTF8(false)).toBe(true);
});
test("TAGS_SetUTF8_4", () => {
  expect(basslib.TAGS_SetUTF8(false)).toBe(false);
});

test("TAGS_GetLastErrorDesc", () => {
  expect(basslib.TAGS_GetLastErrorDesc()).toBe("");
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
