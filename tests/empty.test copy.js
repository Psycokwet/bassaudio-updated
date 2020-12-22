var Bass = require("../");
var basslib = new Bass();

/////////////////////////PRETEST//////////////////////////////////

const setStructs = require("../package/setStructs");
const argTypeValuesDefault = {
  int: 0,
  int64: "0",
  string: "0",
  pointer: null,
  bool: false,
};

var structs = {};
setStructs(structs);
for (let prop in structs) {
  argTypeValuesDefault[prop] = structs[prop].generateNewRefObject().ref();
}

const generateTestInputFor = (libname) => {
  var { ffiFunDeclaration } = basslib.WRAP_DEBUG_getDebugData(libname);

  var testGeneratedInputs = {};
  for (let fun in ffiFunDeclaration) {
    let values = ffiFunDeclaration[fun];
    let returnType = values[0];
    let argTypes = values[1];
    if (values[2]) argTypes = values[2];

    let generatedArgValues = [];
    for (let i in argTypes) {
      if (argTypeValuesDefault[argTypes[i]] !== undefined)
        generatedArgValues.push(argTypeValuesDefault[argTypes[i]]);
      else generatedArgValues.push(null);
    }
    testGeneratedInputs[fun] = [returnType, generatedArgValues];
  }
  return testGeneratedInputs;
};

///////////////////UTIL//////////////////////

basslib.EnableTags(true);
basslib.EnableEncoder(true);
basslib.EnableMixer(true);

var libNames = basslib.WRAP_DEBUG_getAllLibNameActivated();
for (let i in libNames) {
  var testGeneratedInputs = generateTestInputFor(libNames[i]);

  for (let generatedTestValues in testGeneratedInputs) {
    console.log(
      generatedTestValues +
        " return " +
        basslib[generatedTestValues](
          ...testGeneratedInputs[generatedTestValues][1]
        )
    );
  }
}

// // getDevices
// var cards = basslib.getDevices();
// console.log("total found sound cards:" + cards.length);
// var card = cards[1];
// console.log(
//   card.name +
//     " card is enabled:" +
//     card.enabled +
//     " | IsDefault: " +
//     card.IsDefault +
//     " | IsInitialized: " +
//     card.IsInitialized +
//     " | typeSpeakers: " +
//     card.typeSpeakers
// );

// // BASS_GetVersion
// var v = basslib.BASS_GetVersion();
// console.log("result of BASS_GetVersion: " + v);

// // BASS_Init
// var result = basslib.BASS_Init(
//   -1,
//   44100,
//   basslib.BASS_Initflags.BASS_DEVICE_STEREO,
//   null,
//   null
// );
// if (!result) {
//   console.log("error init sound card:" + basslib.BASS_ErrorGetCode());
// }
// console.log("first card is init?:" + basslib.getDevice(1).IsInitialized);

// // BASS_StreamCreateFile

// var filename = path.join(__dirname, "deadmau5-Charlie_cant_dance.mp3");
// var chan = basslib.BASS_StreamCreateFile(
//   false,
//   filename,
//   0,
//   0,
//   basslib.BASS_Initflags.BASS_DEVICE_STEREO
// );
// if (basslib.BASS_ErrorGetCode() !== basslib.BASS_ErrorCode.BASS_OK) {
//   console.log("error opening file:" + basslib.BASS_ErrorGetCode());
//   process.exit();
// }

// // BASS_StreamCreateURL
// /*
// var streamURL = "http://ice1.somafm.com/groovesalad-256-mp3";
// // TODO DOWNLOADPROC example
// var chan = basslib.BASS_StreamCreateURL(streamURL, 0, basslib.BASSFlags.BASS_STREAM_AUTOFREE, null, null);
// if (basslib.BASS_ErrorGetCode() != basslib.BASS_ErrorCode.BASS_OK) {
//   console.log("error streaming:" + basslib.BASS_ErrorGetCode());
// }
// */

// // BASS_ChannelPlay
// var success = basslib.BASS_ChannelPlay(chan, true);
// if (!success) {
//   console.log("error playing file:" + basslib.BASS_ErrorGetCode());
// }

// // BASS_ChannelGetInfo, getInfo
// var info = basslib.BASS_ChannelGetInfo(chan);
// // var info = basslib.getInfo()
// console.log("result of BASS_ChannelGetInfo: " + info);

// // BASS_ChannelSetSync to position
// var Pos20SecondsBytePos = basslib.BASS_ChannelSeconds2Bytes(chan, 15);
// var proc20SecondsID = basslib.BASS_ChannelSetSync(
//   chan,
//   basslib.BASS_ChannelSyncTypes.BASS_SYNC_POS,
//   Pos20SecondsBytePos,
//   function (handle, channel, data, user) {
//     // BASS_ChannelStop
//     if (handle === proc20SecondsID) {
//       console.log("--> position reached to the 15 seconds..");
//       // var result = basslib.BASS_ChannelStop(chan);
//       // console.log("result of BASS_ChannelStop: ", result);
//     }
//   }
// );

// // BASS_ChannelSetSync to END
// var procTOENDID = basslib.BASS_ChannelSetSync(
//   chan,
//   basslib.BASS_ChannelSyncTypes.BASS_SYNC_END,
//   0,
//   function (handle, channel, data, user) {
//     if (handle === procTOENDID) {
//       console.log("--> playback finished..");
//     }
//   }
// );

// // BASS_ChannelRemoveSync
// /*
// basslib.BASS_ChannelRemoveSync(chan, procTOENDID);
// */

// // BASS_ChannelIsActive, BASS_ChannelGetPosition, BASS_ChannelBytes2Seconds
// // BASS_ChannelGetLength, BASS_ChannelSeconds2Bytes
// // getPosition, getDuration
// function pollPosition() {
//   if (
//     basslib.BASS_ChannelIsActive(chan) ===
//     basslib.BASS_ChannelIsActiveAttribs.BASS_ACTIVE_PLAYING
//   ) {
//     var positionInBytes = basslib.BASS_ChannelGetPosition(
//       chan,
//       basslib.BASS_POSITIONflags.BASS_POS_BYTE
//     );
//     var positionInSeconds = basslib.BASS_ChannelBytes2Seconds(
//       chan,
//       positionInBytes
//     );
//     // console.log(basslib.BASS_ChannelSeconds2Bytes(chan, positionInSeconds) === positionInBytes);

//     var durationInBytes = basslib.BASS_ChannelGetLength(
//       chan,
//       basslib.BASS_POSITIONflags.BASS_POS_BYTE
//     );
//     var durationInSeconds = basslib.BASS_ChannelBytes2Seconds(
//       chan,
//       durationInBytes
//     );
//     // console.log(basslib.BASS_ChannelSeconds2Bytes(chan, durationInSeconds) === durationInBytes);

//     console.log("position :" + positionInSeconds / durationInSeconds);
//     // console.log(positionInSeconds + " / " + durationInSeconds);
//     // console.log(basslib.getPosition(chan) + " / " + basslib.getDuration(chan));
//   } else {
//     clearInterval(pollID);
//     clearInterval(vumeterID);
//     clearInterval(statusID);
//   }
// }

// // BASS_ChannelGetLevel, toFloat64
// function vumeter() {
//   var levels = basslib.BASS_ChannelGetLevel(chan);
//   var rightlevel = basslib.toFloat64(levels)[0];
//   var leftlevel = basslib.toFloat64(levels)[1];
//   console.log("vumeter :" + "left: " + leftlevel / +" right: " + "rightlevel");
// }

// // BASS_GetCPU, BASS_GetDevice
// function pollStatus() {
//   console.log("*******************");
//   console.log("CPU usage: ", basslib.BASS_GetCPU());
//   console.log("Soundcard: ", basslib.BASS_GetDevice());
//   console.log("*******************");
// }

// var statusID = setInterval(pollStatus, 3000);
// var pollID = setInterval(pollPosition, 1000);
// var vumeterID = setInterval(vumeter, 500);

// // BASS_ChannelSetPosition, getVolume, setVolume
// console.log("volume: " + basslib.getVolume(chan));
// setTimeout(() => {
//   basslib.setVolume(chan, 20);
//   console.log("volume: " + basslib.getVolume(chan));

//   var myPosition = basslib.BASS_ChannelSeconds2Bytes(chan, 8);
//   basslib.BASS_ChannelSetPosition(
//     chan,
//     myPosition,
//     basslib.BASS_POSITIONflags.BASS_POS_BYTE
//   );
// }, 2000);

// setInterval(() => {
//   var levels = basslib.BASS_ChannelGetLevel(micChan);
//   //its a 64 bit value, lets get lo and hiwords
//   var rightlevel = basslib.toFloat64(levels)[0];
//   var leftlevel = basslib.toFloat64(levels)[1];
//   console.log("cc" + rightlevel + ";" + leftlevel);
// }, 500);
