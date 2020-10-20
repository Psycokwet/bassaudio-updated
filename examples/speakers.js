var path = require("path");
var chalk = require("chalk");
var ref = require("ref");
var bass = require("../index");

var libPath = `${process.platform}-${process.arch}`;
var options = {
  basePath: path.join(__dirname, "libbass", libPath),
}
var basslib = new bass(options);

basslib.EnableMixer(true);

var channels = {
  "MONO": 1,
  "STEREO": 2,
  "QUAD": 4,
  "FIVE_ONE": 6,
  "SEVEN_ONE": 8
}

var file = path.join(__dirname, "deadmau5-Charlie_cant_dance.mp3");
console.log(`Bass version: ${basslib.BASS_GetVersion().toString(16)}`);

// INIT
var init = basslib.BASS_Init(-1, 44100, basslib.BASS_Initflags.BASS_DEVICE_SPEAKERS);
if (!init) {
  console.log(`${chalk.bgRed.white.bold("error init sound card: ")} ${basslib.BASS_ErrorGetCode()}`);
}

// MIXER1 - FRONTRIGHT
var mixer1 = basslib.BASS_Mixer_StreamCreate(44100, channels["MONO"], basslib.BASS_SPEAKERtypes.BASS_SPEAKER_FRONTRIGHT);
if (mixer1 === 0) {
  console.log(`${chalk.bgRed.white.bold("error at Mixer_StreamCreate 1: ")} ${basslib.BASS_ErrorGetCode()}`);
  process.exit();
} else {
  console.log(`${chalk.bgBlue.white.bold("Mixer1 channel: ")} ${mixer1}`);
}

// MIXER2 - FRONTLEFT
var mixer2 = basslib.BASS_Mixer_StreamCreate(44100, channels["MONO"], basslib.BASS_SPEAKERtypes.BASS_SPEAKER_FRONTLEFT);
if (mixer2 === 0) {
  console.log(`${chalk.bgRed.white.bold("error at Mixer_StreamCreate 2: ")} ${basslib.BASS_ErrorGetCode()}`);
  process.exit();
} else {
  console.log(`${chalk.bgBlue.white.bold("Mixer2 channel: ")} ${mixer2}`);
}

// Create 2 channels with the same file
var chan1 = basslib.BASS_StreamCreateFile(false, file, 0, 0, basslib.BASSFlags.BASS_STREAM_DECODE);
if (chan1 === 0) {
  console.log(`${chalk.bgRed.white.bold("error at BASS_StreamCreateFile 1: ")} ${basslib.BASS_ErrorGetCode()}`);
  process.exit();
} else {
  console.log(`${chalk.bgBlue.white.bold("chan1: ")} ${chan1}`);
}

var chan2 = basslib.BASS_StreamCreateFile(false, file, 0, 0, basslib.BASSFlags.BASS_STREAM_DECODE);
if (chan2 === 0) {
  console.log(`${chalk.bgRed.white.bold("error at BASS_StreamCreateFile 2: ")} ${basslib.BASS_ErrorGetCode()}`);
  process.exit();
} else {
  console.log(`${chalk.bgBlue.white.bold("chan2: ")} ${chan1}`);
}

// add mixer channels
var isAdded1 = basslib.BASS_Mixer_StreamAddChannel(mixer1, chan1, basslib.BASS_MIXERsourceflags.BASS_MIXER_DOWNMIX);
if (!isAdded1) {
  console.log(`${chalk.bgRed.white.bold("error at BASS_Mixer_StreamAddChannel 1: ")} ${basslib.BASS_ErrorGetCode()}`);
}

var isAdded2 = basslib.BASS_Mixer_StreamAddChannel(mixer2, chan2, basslib.BASS_MIXERsourceflags.BASS_MIXER_DOWNMIX);
if (!isAdded1) {
  console.log(`${chalk.bgRed.white.bold("error at BASS_Mixer_StreamAddChannel 2: ")} ${basslib.BASS_ErrorGetCode()}`);
}

basslib.BASS_ChannelPlay(mixer1, false);

// start chan2 muted
basslib.BASS_ChannelSetAttribute(chan1, basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL, 0);
basslib.BASS_ChannelPlay(mixer2, false);

// switch channel volumes
setInterval(() => {
  console.log(chalk.bgRed.white.bold("x-fading"));
  var chan1Vol = ref.alloc("float");

  basslib.BASS_ChannelGetAttribute(chan1, basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL, chan1Vol);

  // if chan1Vol !== 0
  if (ref.deref(chan1Vol)) {
    basslib.BASS_ChannelSlideAttribute(chan1, basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL, 0, 3000);

    basslib.BASS_ChannelSlideAttribute(chan2, basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL, 1, 3000);
  } else {
    basslib.BASS_ChannelSlideAttribute(chan1, basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL, 1, 3000);

    basslib.BASS_ChannelSlideAttribute(chan2, basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL, 0, 3000);
  }
}, 10000);
