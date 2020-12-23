var Bass = require("../");
var basslib = new Bass();

/////////////////////////PRETEST//////////////////////////////////

var init = basslib.BASS_Init(
  -1,
  44100,
  basslib.BASS_Initflags.BASS_DEVICE_STEREO
);
if (init === false) {
  console.log("error at BASS_Init: " + basslib.BASS_ErrorGetCode());
  process.exit();
} else {
  console.log("Bass initialized");
}

basslib.EnableMixer(true);
var sampleRate = 44100;
var stereoChannel = 2;
var mixer = basslib.BASS_Mixer_StreamCreate(
  sampleRate,
  stereoChannel,
  basslib.BASSFlags.BASS_SAMPLE_FLOAT
);

if (mixer === 0) {
  console.log("error at Mixer_StreamCreate: " + basslib.BASS_ErrorGetCode());
  //   process.exit();
} else {
  console.log("Mixer channel: " + mixer);
}

var init = basslib.BASS_RecordInit(-1); //initialise default microphone
if (!init) {
  console.log("error at BASS_RecordInit: " + basslib.BASS_ErrorGetCode());
  process.exit();
}
console.log(init);
var micChan = basslib.BASS_RecordStart(44100, 2, 0); // create a recording channel with 10ms period
if (!micChan) {
  console.log("error at BASS_RecordStart: " + basslib.BASS_ErrorGetCode());
  process.exit();
}

console.log(micChan);
var isAdded = basslib.BASS_Mixer_StreamAddChannel(
  mixer,
  micChan,
  basslib.BASSFlags.BASS_STREAM_AUTOFREE | basslib.BASSFlags.BASS_MIXER_LIMIT
);
if (!isAdded) {
  console.log(
    "error adding microphone into mixer: " + basslib.BASS_ErrorGetCode()
  );
  process.exit();
}
console.log(isAdded);
// BASS_ChannelPlay
var success = basslib.BASS_ChannelPlay(mixer, true);
if (!success) {
  console.log("error at ChannelPlay: " + basslib.BASS_ErrorGetCode());
  process.exit();
}

console.log(success);
setInterval(() => {
  console.log("alive");
}, 500);
