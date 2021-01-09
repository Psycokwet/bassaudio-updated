var getBass = require("../tools/getBass");

const path = require("path");
var getPlatformDependenciesForOneFile = require("../tools/getPlatformDependenciesForOneFile");

var basslib;
test("Bass generation working ? ", () => {
  expect(() => {
    basslib = getBass({
      // silent: true,
      generatedFfiFunDeclaration: {
        bass: {
          ffiFunDeclaration: {
            BASS_IsStarted: ["bool", []],
          },
        },
        webm: getPlatformDependenciesForOneFile(
          {
            BASS_WEBM_StreamCreateURL: [
              "int",
              ["string", "int", "int", "pointer", "pointer", "int"],
            ],
          },
          path.join(__dirname, "basswebm24-osx", "libbasswebm.dylib"),
          path.join(__dirname, "basswebm24", "basswebm.dll"),
          path.join(__dirname, "basswebm24", "x64", "basswebm.dll"),
          path.join(__dirname, "basswebm24-linux", "libbasswebm.so"),
          path.join(__dirname, "basswebm24-linux", "x64", "libbasswebm.so")
        ),
      },
    });
  }).not.toThrowError();
});

const os = require("os");
if (os.platform() !== "darwin") {
  test("Auto enable all available libs", () => {
    expect(() => {
      // basslib.EnableWebm(true);
      basslib.EnableAllAvailable(true); // I test with it to check that it is effectively added in the auto enable list. But the up line would be as fine.
    }).not.toThrowError();
  });

  test("test full new lib file linking", () => {
    expect(basslib.BASS_WEBM_StreamCreateURL()).toBe(0);
  });

  test("Is bass well loaded?", () => {
    expect(basslib.BASS_GetVersion()).toBe(33820416);
  });
}

test("test add a single fun to base lib bass", () => {
  expect(basslib.BASS_IsStarted()).toBe(false);
});
