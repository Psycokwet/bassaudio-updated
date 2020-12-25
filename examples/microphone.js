var getBass = require("../tools/getBass");
var basslib = getBass({
  silent: true,
});

const chalk = require("chalk");
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
var micChan = basslib.BASS_RecordStart(44100, 2, 0); // create a recording channel with 10ms period
if (!micChan) {
  console.log("error at BASS_RecordStart: " + basslib.BASS_ErrorGetCode());
  process.exit();
}

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
// BASS_ChannelPlay
var success = basslib.BASS_ChannelPlay(mixer, true);
if (!success) {
  console.log("error at ChannelPlay: " + basslib.BASS_ErrorGetCode());
  process.exit();
}

// BASS_ChannelIsActive, BASS_ChannelGetPosition, BASS_ChannelBytes2Seconds
// BASS_ChannelGetLength, BASS_ChannelSeconds2Bytes
// getPosition, getDuration
function pollPosition() {
  if (
    basslib.BASS_ChannelIsActive(micChan) !==
    basslib.BASS_ChannelIsActiveAttribs.BASS_ACTIVE_PLAYING
  ) {
    clearInterval(pollID);
    clearInterval(vumeterID);
    clearInterval(statusID);
  }
}

// BASS_ChannelGetLevel, toFloat64
function vumeter() {
  var levels = basslib.BASS_ChannelGetLevel(micChan);
  var rightlevel = basslib.toFloat64(levels)[0];
  var leftlevel = basslib.toFloat64(levels)[1];
  console.log(
    `${chalk.bgBlue.white.bold(
      "vumeter :"
    )} left: ${leftlevel} / right: ${rightlevel}`
  );
}

// BASS_GetCPU, BASS_GetDevice
function pollStatus() {
  console.log("*******************");
  console.log("CPU usage: ", basslib.BASS_GetCPU());
  console.log("Soundcard: ", basslib.BASS_GetDevice());
  console.log("*******************");
}

var statusID = setInterval(pollStatus, 3000);
var pollID = setInterval(pollPosition, 1000);
var vumeterID = setInterval(vumeter, 500);

// BASS_ChannelSetPosition, getVolume, setVolume
console.log(chalk.bgGreen.white.bold("volume: "), basslib.getVolume(micChan));
