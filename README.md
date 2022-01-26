<div align="center">
  <h1>Bassaudio-updated</h1>
  A all in one bass library wrapper, maintained and mostly tested.
  This package come with its bass libraries files dependencies, and use the right one if your are on linux 32/64 or Windows 32/64 or macOS. However, you must check the licensing on <a title="un4seen" href="http://www.un4seen.com">un4seen</a>.
  For a lighter version of this package, without the bass files, checkout 
  <a title="bassaudio-updated-light" href="https://www.npmjs.com/package/bassaudio-updated-light">bassaudio-updated-light</a>
</div>
<hr />

#### Tested on

[![macos-latest](https://img.shields.io/static/v1?label=macos&message=latest&color=ff69b4)]("macos-latest")
[![windows-latest](https://img.shields.io/static/v1?label=windows&message=latest&color=blue)]("windows-latest")
[![ubuntu-latest](https://img.shields.io/static/v1?label=ubuntu&message=latest&color=blueviolet)]("ubuntu-latest")

#### With

[![npm version](https://img.shields.io/static/v1?label=Node.js&message=10.x&color=brightgreen)](#note-on-node-14 "Supported version 10.x")
[![npm version](https://img.shields.io/static/v1?label=Node.js&message=12.x&color=brightgreen)](#note-on-node-14 "Supported version 12.x")
[![npm version](https://img.shields.io/static/v1?label=Node.js&message=14.8-&color=brightgreen)](#note-on-node-14 "Supported version 14.8-")
[![npm version](https://img.shields.io/static/v1?label=Node.js&message=14.9%2B&color=red)](#note-on-node-14 "Version non supported 14.9+")

#### Tests results :

[![github build status](https://github.com/Psycokwet/bassaudio-updated/workflows/build/badge.svg)](https://github.com/Psycokwet/bassaudio-updated "Build status")
[![Coverage Status](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/Psycokwet/277c7acb9222d5762a31958b394afb2f/raw/bassaudio-updated-coverage.json)](https://github.com/Psycokwet/bassaudio-updated/tree/master/coverage)

#### Documentation :

[![Examples](https://img.shields.io/static/v1?label=wrapper&message=examples&color=brown)](https://github.com/Psycokwet/bassaudio-updated/tree/master/examples/EXAMPLES.md)
[![partials examples](https://img.shields.io/static/v1?label=wrapper&message=partials%20examples&color=brown)](#partials-examples)
[![features](https://img.shields.io/static/v1?label=wrapper&message=features&color=brown)](https://github.com/Psycokwet/bassaudio-updated/blob/master/documentation/covered-fun.md)
[![structs](https://img.shields.io/static/v1?label=wrapper&message=structs&color=brown)](https://github.com/Psycokwet/bassaudio-updated/blob/master/documentation/covered-structs.md)
[![callbacks](https://img.shields.io/static/v1?label=wrapper&message=callbacks&color=brown)](https://github.com/Psycokwet/bassaudio-updated/blob/master/documentation/covered-callbacks.md)
[![Official documentation](https://img.shields.io/static/v1?label=official&message=un4seen&color=blue)](https://www.un4seen.com/)

#### Others :

[![install size](https://badgen.net/bundlephobia/min/bassaudio-updated)](https://bundlephobia.com/result?p=bassaudio-updated)
[![npm downloads](https://img.shields.io/npm/dm/bassaudio-updated)](https://www.npmjs.com/package/bassaudio-updated "Monthly downloads")
[![npm downloads](https://img.shields.io/npm/dt/bassaudio-updated)](https://www.npmjs.com/package/bassaudio-updated "All time downloads")
[![MIT License](https://img.shields.io/static/v1?label=licence&message=MIT&color=green)](https://github.com//Psycokwet/bassaudio-updated/tree/master/LICENSE "Licence")

# Disclaimer

This package has not been fully tested. Some features may not be fully functionning, if you encounter such a feature, please email me with your traces. I'm still working on it.

Also, I'm not in anyway linked to the bass library. I just like their lib and want it to be accessible to the world of node.

# Announcement

The necessaries dll a part from the eventuals encoder ones are included in this library. For MacOs, Windows 32/64bits, and linux 32/64 bits. If you encounter any issues while using it, please let me know.

As the dll are already included, you need to check for the un4seen licence prior to using this package. You may have a free licence depending on the usage you are making, and as mentionned down there, its a very great library, so check it out ! There is also some documentation, that I did not include here, that you can get directly with the original dynamic library files

If you want a lighter version without superfluous binaries library included, please, check out [bassaudio-updated-light](https://www.npmjs.com/package/bassaudio-updated-light)

**Do you need more features?**

There is two way to use functions that I did not include in this wrapper. Either you send me a mail asking me to officially add it, which I will, either you "patch it" while you use the wrapper as explained [here](#wrapper-parameters)

# Un4Seen Bass Audio Library Wrapper

[Bass Audio library](http://www.un4seen.com) is the best audio library to play, edit, convert, stream etc.
this wrapper wraps most of the "audio playback" features using [ffi-napi](https://www.npmjs.com/package/ffi-napi), [ref-napi](https://www.npmjs.com/package/ref-napi), [ref-struct-di](https://www.npmjs.com/package/ref-struct-di), [ref-array-di](https://www.npmjs.com/package/ref-array-di).
It uses [os](https://www.npmjs.com/package/os) to determines which dynamic library are needed.

ffi-napi enables to call c library methods, properties, callbacks etc.

# Compatible with?

Included binaries library files for Windows 64/32bits, Linux 64/32bits, and macOs. Not fully tested yet, so report any encountered issues please.

# Note on node 14

There is ongoing issues with node 14.9.0 and later that may cause segfault when loading a library file, that are outside my skills. I strongly discourage you from using node 14.9.0 and later until this problem is stabilized.
If you want to find more info about this issue, here is a first lead : https://github.com/node-ffi-napi/node-ffi-napi/issues/99

# Note on documentation

Bass documentation is available here :
http://www.un4seen.com/doc/
You can also see this version :
http://bass.radio42.com/help/

You can find direct link from wrapped content, to un4seen documentation [here](#documentation-)

There is also some documentation directly in the README files accompanying the library files on the un4seen website.

Let me now if there is other useful documentation that I can share here. :)

Original library files, bass community, licensing, other apis and more is available here :
[http://www.un4seen.com](http://www.un4seen.com).

You can see more code examples from the wrapper original creator, [Serkanp](https://bitbucket.org/serkanp/bassaudio/src/master/), in its git repositories linked here. The example I have build [here](https://github.com/Psycokwet/bassaudio-updated/tree/master/examples/EXAMPLES.md) are fully adapted with my version of the wrapper.

# Partials examples

- Divers
  - [Wrapper parameters](#wrapper-parameters)
  - [basic capture and play microphone](#basic-capture-and-play-microphone)
  - [basic load and play file](#basic-load-and-play-file)
  - [Get Artist](#get-artist)
  - [Get Duration](#get-durations)
  - [Get Duration Example2](#get-duration-example2)
  - [Get Volume of channel](#get-volume-of-channel)
  - [Set Volume](#set-volume)
  - [Get current Position of playback](#get-current-position-of-playback)
  - [Set Position](#set-position)
  - [Is channel playing?](#is-channel-playing?)
  - [sliding](#sliding)
  - [callback](#callback)
  - [Vumeter](#vumeter)
  - [close the file](#close-the-file)
  - [change sound card](#change-sound-card)
  - [Info of a channel](#info-of-a-channel)
  - [Info of a device](#info-of-a-device)
  - [Free the memory from bass](#free-the-memory-from-bass)
- [MIXER FEATURES](#mixer-features)
  - [Enable Mixer](#enable-mixer)
  - [Mixer is Enabled?](#mixer-is-enabled?)
  - [Get current Position of mixer playback](#get-current-position-of-mixer-playback)
- [ENCODER FEATURES](#encoder-features)
  - [Init encoder](#init-encoder)
  - [get notification from encoder server](#get-notification-from-encoder-server)
  - [mono speaker output](#mono-speaker-output)
  - [splitting channels](#splitting-channels)

### Wrapper parameters

```javascript
// There is a diversity of parameter accepted by this wrapper, here is a full list of them :

var basslib = getBass({
  silent: true, //there is a few console log that may appear to indicate that everything is going smoothly, if you don't want to see it, you can set it to silent
  generatedFfiFunDeclaration: {
    bass: {
      // addon id
      ffiFunDeclaration: {
        BASS_ORIGINAL_FUN_NAME: ["bool", []],
      },
    },
    // Order of added library might be important if a lib file is depending of another one.
    webm: {
      // addon id
      ffiFunDeclaration: {
        BASS_ORIGINAL_FUN_NAME: [
          // Original name of the bass function
          "int", // return type of the desired function
          ["string", "float", "double", "long", "pointer", "bool"], // Arguments types
        ],
      },
      path: "path/to/lib/file.dylib/dll/so", // A path must be given to the added addon if it's not one already covered by the wrapper. If it is an addon covered, the path would be ignored
    },
  },
});
```

Arguments types : You must choose the most relevants types for each arguments. You can see a list of correspondances [here](https://github.com/Psycokwet/bassaudio-updated/blob/master/documentation/identified-types-correspondances.md).

Addon id :
Identification of the addon, two choices :

- Either it's one of the covered ones (bass, tags, encoder, and mixer are already covered) so, by using one of those id, you will add covering for new fun, without losing the ones already managed by the wrapper.

- Either it's a new addon, for which you can put the name you want. You can put as much diffents addons as you want. Some may have issues, that I did not investigates since I did not test this functionnality with every addon offered with bass, so, don't hesitate to contact me if needed. The name you choose will generate a [Name]Enable() function, as well as a Enabled[Name]\() function, as for the ones already covered to activate an addon, and check if it is activated.

### basic capture and play microphone

```javascript
var bass = require("bassaudio-updated");
var basslib = new bass();

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
var micChan = basslib.BASS_RecordStart(44100, 2, 0, null); // create a recording channel with 10ms period
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
```

### basic load and play file

```javascript
var bass = require("bassaudio-updated");
var basslib = new bass();

//get all sound cards
var cards = basslib.getDevices();
console.log("total found sound cards:" + cards.length);
//lets print first sound card's info, find out more inside source code..
//first item in array '[0]' is "no sound", then use the item [1]
//you will see that card isInitialized will be false, because we did not init it yet..
var card = cards[1];
console.log(
  card.name +
    " is enabled:" +
    card.enabled +
    " ,IsDefault:" +
    card.IsDefault +
    " , IsInitialized:" +
    card.IsInitialized +
    " ,typeSpeakers:" +
    card.typeSpeakers
);

// [device],[freq],[flags], -1 is default sound card
var result = basslib.BASS_Init(
  -1,
  44100,
  basslib.BASS_Initflags.BASS_DEVICE_STEREO
);
if (!result) {
  console.log("error init sound card:" + basslib.BASS_ErrorGetCode());
}

console.log("first card is init?:" + basslib.getDevice(1).IsInitialized);

// isMemoryFile,filename,offset,length,flags, returns pointer of file
var chan = basslib.BASS_StreamCreateFile(0, "c:\\mp3\\test.mp3", 0, 0, 0);
if (basslib.BASS_ErrorGetCode() != basslib.BASS_ErrorCode.BASS_OK) {
  console.log("error opening file:" + basslib.BASS_ErrorGetCode());
}

//lets play
//channel, restart, returns  (also there are stop, pause commands)
var success = basslib.BASS_ChannelPlay(chan, -1);
if (!success) {
  console.log("error playing file:" + basslib.BASS_ErrorGetCode());
}
```

### Get Artist

```javascript
// get artist or other meta data thanks to the Tags add-on
// This example return the artist name or "No artist" if the artist is not set. But you can doo much more with tags.

basslib.EnableTags(true);

var tagsEnabled = basslib.TagsEnabled();
if (tagsEnabled) {
  console.log("Tags enabled");
} else {
  console.log("Tags disabled");
  process.exit();
}

var artist = basslib.TAGS_Read(
  chan,
  basslib.BASS_TAGS_FORMAT_CONDITION.IF_X_THEN_A_IF_NOT_THEN_B(
    basslib.BASS_TAGS_FORMAT_STRINGS.SONG_ARTIST,
    basslib.BASS_TAGS_FORMAT_STRINGS.SONG_ARTIST,
    "No artist"
  )
);
```

### Get Duration

```javascript
//get the duration, bass returns the total bytes of the channel pointer, then we must convert it to seconds :)
var durationInBytes = basslib.BASS_ChannelGetLength(chan, 0);
var durationInSeconds = basslib.BASS_ChannelBytes2Seconds(
  chan,
  durationInBytes
);
```

### Get Duration Example2

```javascript
//if stream is active (playing), then get position and duration..
setInterval(function () {
  if (
    basslib.BASS_ChannelIsActive(chan) ==
    basslib.BASS_ChannelIsActiveAttribs.BASS_ACTIVE_PLAYING
  ) {
    var position = basslib.BASS_ChannelBytes2Seconds(
      chan,
      basslib.BASS_ChannelGetPosition(chan, 0)
    );
    var duration = basslib.BASS_ChannelBytes2Seconds(
      chan,
      basslib.BASS_ChannelGetLength(chan, 0)
    );
    console.log(position + " / " + duration);
  } else {
    console.log("stopped");
  }
}, 500);
```

### Get Volume of channel

```javascript
var ref = require("ref");
//set a float pointer
var volume = ref.alloc("float");
//get the volume
var result = basslib.BASS_ChannelGetAttribute(
  chan,
  basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL,
  volume
);
//now deref volume to get the value
console.log(ref.deref(volume));
```

### Set Volume

```javascript
//lets set to 0.3
basslib.BASS_ChannelSetAttribute(
  chan,
  basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL,
  0.3
);
```

### Get current Position of playback

```javascript
var positionInBytes = basslib.BASS_ChannelGetPosition(chan, 0);
//now convert it to seconds
var position = basslib.BASS_ChannelBytes2Seconds(chan, positionInBytes);
```

### Set Position

```javascript
//first get the byte position of desired seconds (ex:to last 10 seconds
var Last10SecondsBytePos = basslib.BASS_ChannelSeconds2Bytes(
  chan,
  durationInSeconds - 10
);
basslib.BASS_ChannelSetPosition(chan, Last10SecondsBytePos);
```

### Is channel playing?

```javascript
var result = basslib.BASS_ChannelIsActive(chan);
if (result == basslib.BASS_ChannelIsActiveAttribs.BASS_ACTIVE_PLAYING) {
  console.log("channel is playing");
}
```

### sliding

```javascript
//Lets slide volume to 0 in 3 seconds (3000 milliseconds)
basslib.BASS_ChannelSlideAttribute(
  chan,
  basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL,
  0,
  3000
);
```

### callback

```javascript
//lets make a callback when position reaches to 20. seconds.
var Pos20SecondsBytePos = basslib.BASS_ChannelSeconds2Bytes(chan, 20);
var proc20SecondsID = basslib.BASS_ChannelSetSync(
  chan,
  basslib.BASS_ChannelSyncTypes.BASS_SYNC_POS,
  Pos20SecondsBytePos,
  function (handle, channel, data, user) {
    if (handle == proc20SecondsID) {
      console.log("position reached to the 20 seconds..");
    }
  }
);

//lets get the event when the position reaches to end
var procTOENDID = basslib.BASS_ChannelSetSync(
  chan,
  basslib.BASS_ChannelSyncTypes.BASS_SYNC_END,
  0,
  function (handle, channel, data, user) {
    if (handle == procTOENDID) {
      console.log("playback finished..");
    }
  }
);
```

### Vumeter

```javascript
//lets get vumeter :)
var levels = basslib.BASS_ChannelGetLevel(chan);
//its a 64 bit value, lets get lo and hiwords
var rightlevel = basslib.toFloat64(levels)[0];
var leftlevel = basslib.toFloat64(levels)[1];
```

### close the file

```javascript
if (
  basslib.BASS_ChannelIsActive(chan) ==
  basslib.BASS_ChannelIsActiveAttribs.BASS_ACTIVE_PLAYING
) {
  //stop the channel
  basslib.BASS_ChannelStop(chan);
}

var result = basslib.BASS_StreamFree(chan);
if (!result) {
  console.log("stream free error:" + basslib.BASS_ErrorGetCode());
}
```

### change sound card

```javascript
//first check if this sound card is initialized
var soundCardIndex = 1;
var info = basslib.getDevice(soundCardIndex);
if (!info.enabled) {
  console.log("this device is not enabled");
}
if (!info.IsInitialized) {
  var result = basslib.BASS_Init(
    soundCardIndex,
    44100,
    basslib.BASS_Initflags.BASS_DEVICE_STEREO
  );
  if (result != basslib.BASS_ErrorCode.BASS_OK) {
    console.log("error init sound card:" + basslib.BASS_ErrorGetCode());
  }
}
var success = basslib.BASS_ChannelSetDevice(chan, soundCardIndex);
if (!success) {
  console.log("error init sound card:" + basslib.BASS_ErrorGetCode());
}
```

### Info of a channel

```javascript
var info = basslib.BASS_ChannelGetInfo(chan);
console.log("info.ctype:" + info.ctype);
console.log(
  "is channel an mp3 stream?:" +
    (info.ctype == basslib.BASS_CHANNELINFOtypes.BASS_CTYPE_STREAM_MP3)
);
//other infos are: freq,chans,flags,ctype,origres,plugin,sample,filename
```

### Info of a device

```javascript
var info = basslib.getInfo();
console.log("speaker count:" + info.speakers);
console.log("minimum buffer:" + info.minbuf);
console.log("latency:" + info.latency);
```

### Free the memory from bass

```javascript
basslib.BASS_Free();
```

## MIXER FEATURES

### Enable Mixer

```javascript
//before using mixer, first enable it. and put the required component to root folder.
basslib.EnableMixer(true);
```

### Mixer is Enabled?

```javascript
//before using mixer, first enable it. and put the required component to root folder.
console.log(basslib.MixerEnabled());
```

### Create mixer stream

```javascript
basslib.EnableMixer(true);
var mixer = basslib.BASS_Mixer_StreamCreate(
  44100,
  2,
  basslib.BASSFlags.BASS_SAMPLE_FLOAT
);
var chan1 = basslib.BASS_StreamCreateFile(
  0,
  "d:\\mp3\\tes1.mp3",
  0,
  0,
  basslib.BASSFlags.BASS_STREAM_DECODE | basslib.BASSFlags.BASS_SAMPLE_FLOAT
);
var chan2 = basslib.BASS_StreamCreateFile(
  0,
  "d:\\mp3\\test2.mp3",
  0,
  0,
  basslib.BASSFlags.BASS_STREAM_DECODE | basslib.BASSFlags.BASS_SAMPLE_FLOAT
);
var ok1 = basslib.BASS_Mixer_StreamAddChannel(
  mixer,
  chan1,
  basslib.BASSFlags.BASS_SAMPLE_DEFAULT
);
var ok2 = basslib.BASS_Mixer_StreamAddChannel(
  mixer,
  chan2,
  basslib.BASSFlags.BASS_SAMPLE_DEFAULT
);
basslib.BASS_ChannelPlay(mixer, 0);
```

### Get current Position of mixer playback

```javascript
var positionInBytes = basslib.BASS_Mixer_ChannelGetPosition(chan, 0);
//now convert it to seconds
var position = basslib.BASS_ChannelBytes2Seconds(chan, positionInBytes);
```

## ENCODER FEATURES

In order to be used to its full potential, you need to use an encoder like lame to stream audio to a distant server. Alternatively, bass encode mp3 addon does work the same, and is now availaible with this wrapper. I recommend using it directly.
Instead of :

```javascript
var _encoder = basslib.BASS_Encode_Start(
  mixer,
  `${LAME_PATH}lame -r -m s -s ${SAMPLE_RATE} -b ${BIT_RATE} -`,
  basslib.BASS_Encode_Startflags.BASS_ENCODE_NOHEAD
);
```

You can now use

```javascript
var _encoder = basslib.BASS_Encode_MP3_Start(
  mixer,
  ` -r -m s -s ${SAMPLE_RATE} -b ${BIT_RATE} -`,
  basslib.BASS_Encode_Startflags.BASS_ENCODE_NOHEAD
);
```

Without having to find lame executables by yourself. If you still do prefer to use lame directly, you may find what you want [here](https://www.rarewares.org/mp3-lame-bundle.php)

you can directly encode and send output to [shoutcast](http://www.shoutcast.com) and [icecast](http://www.icecast.org) servers

use mixer as a trick, because if the channel freed or added new channel, the encoder stops itself.

add channels to mixer every time, and add mixer channel to encoder, so the encoder never stops.

### Init encoder

```javascript
basslib.EnableMixer(true);
var mixer = basslib.BASS_Mixer_StreamCreate(
  44100,
  2,
  basslib.BASSFlags.BASS_SAMPLE_FLOAT
);
var chan = basslib.BASS_StreamCreateFile(
  0,
  "d:\\mp3\\tes1.mp3",
  0,
  0,
  basslib.BASSFlags.BASS_STREAM_DECODE | basslib.BASSFlags.BASS_SAMPLE_FLOAT
);
var ok = basslib.BASS_Mixer_StreamAddChannel(
  mixer,
  chan,
  basslib.BASSFlags.BASS_SAMPLE_DEFAULT
);

basslib.EnableEncoder(true);

//lets try icecast
var enc_chan = basslib.BASS_Encode_Start(
  mixer,
  "lame -r -m s -s 22050 -b 56 -",
  basslib.BASS_Encode_Startflags.BASS_ENCODE_NOHEAD
);
var result = basslib.BASS_Encode_CastInit(
  enc_chan,
  "http://server-ip:8000/test",
  "password",
  basslib.BASS_Encode_CastInitcontentMIMEtypes.BASS_ENCODE_TYPE_MP3,
  "test stream",
  "http://your-server-ip",
  "pop",
  "this is my new icecast test",
  "header1\r\nheader2\r\n",
  44100,
  true //public
);

basslib.BASS_ChannelPlay(mixer, 0);
```

### get notification from encoder server

```javascript
var result=basslib.BASS_Encode_SetNotify(enc_chan,function(handle,status,user){
  if(status==basslib.EncoderNotifyStatus.BASS_ENCODE_NOTIFY_CAST){
  console.log('server connection is dead');
});
```

### mono speaker output

```javascript
//lets say if you have 5.1 speaker and want to use each output stereo or mono
//basically with 5.1 output you can use 6 different output channels.
//this example shows how to do it
var bass = require("bassaudio-updated");
var basslib = new bass();

//set init to speakers
var result = basslib.BASS_Init(
  -1,
  44100,
  basslib.BASS_Initflags.BASS_DEVICE_SPEAKERS
);
if (!result) {
  console.log("error init sound card:" + basslib.BASS_ErrorGetCode());
}

//to use mixer feature, you have to enable it
basslib.EnableMixer(true);

var cards = basslib.getDevices();
var speakerCount = basslib.getInfo().speakers;
console.log("we have", speakerCount, "speakers");
var path = require("path");
var f1 = path.join(__dirname, "1.mp3");

//create a mixer and tell it to output front right
var mixer = basslib.BASS_Mixer_StreamCreate(
  44100,
  1,
  basslib.BASS_SPEAKERtypes.BASS_SPEAKER_FRONTRIGHT
);
console.log("mixer:", mixer, " error code:", basslib.BASS_ErrorGetCode());

//set channel to decode
var chan1 = basslib.BASS_StreamCreateFile(
  0,
  f1,
  0,
  0,
  basslib.BASSFlags.BASS_STREAM_DECODE
);

//if your file is stereo, you have to downmix to mono, else you cannot get it mono output to only 1 speaker.
var ok1 = basslib.BASS_Mixer_StreamAddChannel(
  mixer,
  chan1,
  basslib.BASS_MIXERsourceflags.BASS_MIXER_DOWNMIX
);
var ok2 = basslib.BASS_ChannelPlay(mixer, 0);

console.log("chan1:", chan1, " error code:", basslib.BASS_ErrorGetCode());
console.log("ok1:", ok1, " error code:", basslib.BASS_ErrorGetCode());

setInterval(() => {}, 1000);
```

### splitting channels

```javascript
//if you want to add a mixer to another mixer, it is not possible/supported
//but there is another way to do it.
//you can split any channel or mixer into two, then you can use the new splitted channel on any other mixer.
//A "splitter" basically does the opposite of a mixer: it splits a single source into multiple streams rather then mixing multiple sources into a single stream. Like mixer sources, splitter sources must be decoding channels.

var splitChan = basslib.BASS_Split_StreamCreate(mixer, 0);
var splits = basslib.BASS_Split_StreamGetSplits(mixer);
var splitsource = basslib.BASS_Split_StreamGetSource(splitChan);
var avail1 = basslib.BASS_Split_StreamGetAvailable(splitChan);
var avail2 = basslib.BASS_Split_StreamGetAvailable(mixer);
```

# UPDATE LOG

**--------------2.X.X------------------**

- 2.1.1

  new features added:
  - BASS_PluginLoad

  - BASS_StreamPutData

  adding wrapper function :
  LoadAllPlugins();
  As well as the related plugins files.
  And an example to show usage.

- 2.1.0

  - Allowing special heritage function to be able to function as they used too from Serkan's work
  - Adding getCodeMessageFrom to translate an error/flag code to the string, for human readability.
  - Adding "EnableAllAvailable" to activate in all call any lib that may have been set naturally, or added on the run.
  - Adding "AreAllAvailableEnabled" to check if all lib available have been set, and send back the one that are not activated
  - Adding support for bass encode MP3
  - Adding what was needed to support new lib files dependant on other. If you add support for new lib files, order might be important.

- 2.0.0

  Complete rebuilding of the wrapper to be easier to test, to evolve, and to suit the needs of everyone.

  - Adding examples
  - Adding tests
  - Adding coverage
  - Adding documentation
  - Leaving out the features lists of Readme to allow to automatise it's content
  - Changing dependencies to [ref-struct-di](https://www.npmjs.com/package/ref-struct-di), [ref-array-di](https://www.npmjs.com/package/ref-array-di) because ref-napi version that can differe in ref-array-napi and ref-struct-napi from ffi-napi.
  - Allowing to load non covered addons by adding the proper parameter in the constructor call of the lib. See how to do so in the test [here](https://github.com/Psycokwet/bassaudio-updated/blob/master/tests/addFun.test.js). Adding fun works on any platform, but, loading new addon does not work on mac yet. Some addon may not load easily due to other issues that I did not investigate enough, but I believe there is a way to by pass thoses loading issues.

**--------------1.X.X------------------**

- 1.0.8-1.3.5

  Updating BASS_ChannelAttributes to add missing values

- 1.0.8-1.3.4

  ffi code correction done

- 1.0.8-1.3.3

  Fixing ffi version until code correction

- 1.0.8-1.3.2

  Important fix (linux) in shim

- 1.0.8-1.3.1

  Important fix in variable name

- 1.0.8-1.3.0

  Adding tags library files
  Getting rid of unused yet library files

  new features added:

  - TAGS_GetVersion
  - TAGS_Read
  - TAGS_ReadEx
  - TAGS_SetUTF8
  - TAGS_GetLastErrorDesc

- 1.0.8-1.2.0

  new features added:

  - BASS_StreamCreate
  - BASS_RecordFree
  - BASS_RecordGetDevice
  - BASS_RecordGetDeviceInfo
  - BASS_RecordGetInfo
  - BASS_RecordGetInput
  - BASS_RecordGetInputName
  - BASS_RecordInit
  - BASS_RecordSetDevice
  - BASS_RecordSetInput
  - BASS_RecordStart

  features corrected:

  - BASS_Mixer_ChannelSetSync

- 1.0.8-1.1.1
  news:
  - adding dll for macos/win32/win64 and licence information
  - Correcting call to BASS_Encode_IsActive
- 1.0.8-1.0.2
  news:
  - adding repo link into package.json
- 1.0.8-1.0.1
  news:
  - Forgot to fully update package references in readme, and correcting package.json too.
- 1.0.8-1.0.0
  news:
  - Made compatible with Node.js v12.19.0 and npm@6.14.8. All functionality have been kept from 1.0.8 from past authors. Special thanks to RiccardoBiemmi who has made a previous attemps at this that have been really useful to mine, and especially to Serkanp who have been very personnaly helpful in this project.
    Serkanp repo :
    https://bitbucket.org/serkanp/bassaudio/src/master/
    RiccardoBiemmi repo :
    https://github.com/RiccardoBiemmi/bassaudiolibrary

**-----BEFORE FORK-UPDATE LOG-----**

- 1.0.8

  new features added:

  - BASS_Split_StreamCreate

  - BASS_Split_StreamGetAvailable

  - BASS_Split_StreamGetSource

  - BASS_Split_StreamGetSplits

  - BASS_Split_StreamReset

  - BASS_Split_StreamResetEx

- 1.0.7

  - BASS_SetConfigflags,
    BASS_SetConfig,
    BASS_GetConfig,
    BASS_Update,
    BASS_ChannelUpdate features added

- 1.0.6

  - correct an arg type in BASS_Encode_CastInit handler

- 1.0.5

  - lock installed "ffi" version
  - add shim to automate the changes to the "ffi" source code

- 1.0.4

  - BASS_Encode_CastSetTitle has a minor bug. fixed.

- 1.0.3

  - constructor now accepts and options object
  - examples folder comes with link files

- 1.0.2

  - getVolume() gives ref error when channel is 0. fixed.

- 1.0.1

  - some types fixed for raspberrypi compability.
  - examples folder added
  - mono speaker out example added

- 1.0.0 Release

  - i hope i fixed everything :) lets cross the fingers..

- 1.0.0-rc.22

  - some types in BASS_StreamCreateFile are changed to ref.types.int64

- 1.0.0-rc.21

  - these fixes are for linux environment
  - fixed BASS_ChannelBytes2Seconds
  - fixed BASS_ChannelSeconds2Bytes
  - fixed BASS_ChannelSetPosition

- 1.0.0-rc.20

  - added BASS_MIXERsourceflags
  - found a bug on ffi source code, see above change for linux os..

- 1.0.0-rc.18

  - BASS_ChannelGetAttribute returns float pointer. fixed.see getvolume example for usage.
  - BASS_GETInfo now works.

- 1.0.0-rc.17

  - BASS_Encode_IsActive fixed

- 1.0.0-rc.16

  - getDevice(-1) must find the default sound card and return it.
  - BASS_GetDevice takes 1 argument, but missing in code. fixed.

- 1.0.0-rc.15

  - documentation fix

- 1.0.0-rc.14

  - documentation fix

- 1.0.0-rc.13

  - new mixer features:

    - BASS_Mixer_StreamCreate
    - BASS_Mixer_StreamAddChannel
    - BASS_Mixer_ChannelGetLevel
    - BASS_Mixer_ChannelGetMixer
    - BASS_Mixer_ChannelGetPosition
    - BASS_Mixer_ChannelRemove
    - BASS_Mixer_ChannelRemoveSync
    - BASS_Mixer_ChannelSetPosition
    - BASS_Mixer_ChannelSetSync

  - new encoder features:
    - BASS_Encode_Start
    - BASS_Encode_IsActive
    - BASS_Encode_SetNotify
    - BASS_Encode_SetPaused
    - BASS_Encode_Stop
    - BASS_Encode_CastInit
    - BASS_Encode_CastGetStats
    - BASS_Encode_CastSetTitle

- 1.0.0-rc.12

  - BASS_ChannelBytes2Seconds and BASS_ChannelSeconds2Bytes returns wrong on arm cpu. pos value type changed to int64. now works correctly
