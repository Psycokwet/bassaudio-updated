var path = require("path");
var chalk = require("chalk");
var bass = require("../index");

var libPath = `${process.platform}-${process.arch}`;
var options = {
    basePath: path.join(__dirname, "libbass", libPath),
}
var basslib = new bass(options);

basslib.EnableMixer(true);

var mixerEnabled = basslib.MixerEnabled();
if (mixerEnabled) {
    console.log(chalk.bgGreen.white.bold("Mixer enabled"));
} else {
    console.log(chalk.bgRed.white.bold("Mixer disabled"));
    process.exit();
}

var filename = path.join(__dirname, "../music.mp3");
var channels = {
    "MONO": 1,
    "STEREO": 2,
    "QUAD": 4,
    "FIVE_ONE": 6,
    "SEVEN_ONE": 8
}

// BASS_Init
var init = basslib.BASS_Init(-1, 44100, basslib.BASS_Initflags.BASS_DEVICE_STEREO);
if (!init) {
    console.log(`${chalk.bgRed.white.bold("error init sound card: ")} ${basslib.BASS_ErrorGetCode()}`);
    process.exit();
}
console.log(`${chalk.bgBlue.white.bold("soundcard is init?: ")} ${basslib.getDevice(-1).IsInitialized}`);

// create mixer
// BASS_Mixer_StreamCreate
var mixer = basslib.BASS_Mixer_StreamCreate(44100, channels["STEREO"], basslib.BASSFlags.BASS_STREAM_DECODE);
if (mixer === 0) {
    console.log(`${chalk.bgRed.white.bold("error at Mixer_StreamCreate: ")} ${basslib.BASS_ErrorGetCode()}`);
    process.exit();
} else {
    console.log(`${chalk.bgBlue.white.bold("Mixer channel: ")} ${mixer}`);
}

var splitChan=basslib.BASS_Split_StreamCreate(mixer,0)
var err1=basslib.BASS_ErrorGetCode()
var splits=basslib.BASS_Split_StreamGetSplits(mixer)
var splitsource=basslib.BASS_Split_StreamGetSource(splitChan)
var avail1=basslib.BASS_Split_StreamGetAvailable(splitChan)
var avail2=basslib.BASS_Split_StreamGetAvailable(mixer)
var createChannelFlag = basslib.BASSFlags.BASS_STREAM_DECODE | basslib.BASSFlags.BASS_SAMPLE_FLOAT;

// load file
// BASS_StreamCreateFile
var chan1 = basslib.BASS_StreamCreateFile(false, filename, 0, 0, createChannelFlag);
if (chan1 === 0) {
    console.log(`${chalk.bgRed.white.bold("error at BASS_StreamCreateFile: ")} ${basslib.BASS_ErrorGetCode()}`);
    process.exit();
} else {
    console.log(`${chalk.bgBlue.white.bold("chan1: ")} ${chan1}`);
}

// load online stream
// BASS_StreamCreateURL
var streamURL = "http://ice1.somafm.com/groovesalad-256-mp3";
var chan2 = basslib.BASS_StreamCreateURL(streamURL, 0, createChannelFlag, null, null);
if (chan2 === 0) {
    console.log(`${chalk.bgRed.white.bold("error at BASS_StreamCreateURL: ")} ${basslib.BASS_ErrorGetCode()}`);
    process.exit();
} else {
    console.log(`${chalk.bgBlue.white.bold("chan2: ")} ${chan2}`);
}

// add both to mixer
// BASS_Mixer_StreamAddChannel
var addChannelFlag = basslib.BASSFlags.BASS_SAMPLE_DEFAULT;

var isAdded1 = basslib.BASS_Mixer_StreamAddChannel(mixer, chan1, addChannelFlag);
if (!isAdded1) {
    console.log(`${chalk.bgRed.white.bold("error at BASS_Mixer_StreamAddChannel: ")} ${basslib.BASS_ErrorGetCode()}`);
}

var isAdded2 = basslib.BASS_Mixer_StreamAddChannel(mixer, chan2, addChannelFlag);
if (!isAdded2) {
    console.log(`${chalk.bgRed.white.bold("error at BASS_Mixer_StreamAddChannel: ")} ${basslib.BASS_ErrorGetCode()}`);
}

// register callback on chan1
// BASS_Mixer_ChannelSetSync
var Pos20SecondsBytePos = basslib.BASS_ChannelSeconds2Bytes(chan1, 20);
var SYNCPROCID = basslib.BASS_Mixer_ChannelSetSync(chan1, basslib.BASS_ChannelSyncTypes.BASS_SYNC_POS, Pos20SecondsBytePos, function(handle, channel, data, user) {
    if (handle === SYNCPROCID) {
        console.log(chalk.green.bold("--> position @ chan1 reached 20 seconds.."));
    }
});

// start playback on the mixer
// BASS_ChannelPlay
var success = basslib.BASS_ChannelPlay(mixer, true);
if (!success) {
    console.log(`${chalk.bgRed.white.bold("error at ChannelPlay: ")} ${basslib.BASS_ErrorGetCode()}`);
}

// poll chan1 every second
// BASS_Mixer_ChannelGetPosition
var chan1PollInterval = setInterval(() => {
    var positionInBytes = basslib.BASS_Mixer_ChannelGetPosition(chan1, basslib.BASS_POSITIONflags.BASS_POS_BYTE);
    var positionInSeconds = basslib.BASS_ChannelBytes2Seconds(chan1, positionInBytes);
    console.log(`${chalk.blue.bold("chan1 position")} ${positionInSeconds}`);
}, 1000);


// BASS_Mixer_ChannelGetMixer, BASS_Mixer_ChannelRemove, BASS_Mixer_ChannelRemoveSync, BASS_Mixer_ChannelSetPosition
setTimeout(() => {
    // is chan1 on the mixer?
    if (!(basslib.BASS_Mixer_ChannelGetMixer(chan1) === mixer)) {
        console.log(`${chalk.bgRed.white.bold("error at BASS_Mixer_ChannelGetMixer: ")} ${basslib.BASS_ErrorGetCode()}`);
    }

    // try removing chan2 from the mixer
    var isChannelRemoved = basslib.BASS_Mixer_ChannelRemove(chan2);
    if (!isChannelRemoved) {
        console.log(`${chalk.bgRed.white.bold("error at BASS_Mixer_ChannelRemove: ")} ${basslib.BASS_ErrorGetCode()}`);
    } else {
        console.log(`${chalk.green.bold("chan2 removed")}`);
    }

    // seek forward on chan1
    var SECONDS_TO_SET = 110;
    var myPosition = basslib.BASS_ChannelSeconds2Bytes(chan1, SECONDS_TO_SET);
    basslib.BASS_Mixer_ChannelSetPosition(chan1, myPosition, basslib.BASS_POSITIONflags.BASS_POS_BYTE);
    if (basslib.BASS_ErrorGetCode() !== basslib.BASS_ErrorCode.BASS_OK) {
        console.log(`${chalk.bgRed.white.bold("Error setting chan position")} ${basslib.BASS_ErrorGetCode()}`);
    } else {
        console.log(chalk.green.bold(`chan1 position set to ${SECONDS_TO_SET} seconds`));
    }
    /*
    var isSyncRemoved = basslib.BASS_Mixer_ChannelRemoveSync(chan1, SYNCPROCID);
    if (!isSyncRemoved) {
      console.log(`${chalk.bgRed.white.bold("error at BASS_Mixer_ChannelRemoveSync: ")} ${basslib.BASS_ErrorGetCode()}`);
    }
    */
}, 3000);

// register callback on chan1 end
var procTOENDID = basslib.BASS_Mixer_ChannelSetSync(chan1, basslib.BASS_ChannelSyncTypes.BASS_SYNC_END, 0, function(handle, channel, data, user) {
    if (handle === procTOENDID) {
        console.log(chalk.green.bold("chan1 playback finished."));
        clearInterval(chan1PollInterval);

        var isAdded = basslib.BASS_Mixer_StreamAddChannel(mixer, chan2, addChannelFlag);
        if (!isAdded) {
            console.log(`${chalk.bgRed.white.bold("error at BASS_Mixer_StreamAddChannel: ")} ${basslib.BASS_ErrorGetCode()}`);
        } else {
            console.log(`${chalk.green.bold("chan2 added")}`);
        }
    }
});
