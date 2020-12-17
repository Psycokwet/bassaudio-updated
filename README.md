<div align="center">
  <h1>Bassaudio-updated</h1>
  A all in one bass library wrapper, maintained and tested.
</div>

<hr />

Tested on

[![macos-latest](https://img.shields.io/static/v1?label=macos&message=latest&color=ff69b4)]("macos-latest")
[![windows-latest](https://img.shields.io/static/v1?label=windows&message=latest&color=blue)]("windows-latest")
[![ubuntu-latest](https://img.shields.io/static/v1?label=ubuntu&message=latest&color=blueviolet)]("ubuntu-latest")

with

[![npm version](https://img.shields.io/static/v1?label=Node.js&message=10.x&color=green)](https://www.npmjs.com/package/bassaudio-updated-light "Last npm version checked")
[![npm version](https://img.shields.io/static/v1?label=Node.js&message=12.x&color=green)](https://www.npmjs.com/package/bassaudio-updated-light "Last npm version checked")
[![npm version](https://img.shields.io/static/v1?label=Node.js&message=14.x&color=green)](https://www.npmjs.com/package/bassaudio-updated-light "Last npm version checked")

Tests results :

[![github build status](https://github.com/Psycokwet/bassaudio-updated/workflows/build/badge.svg)](https://github.com/Psycokwet/bassaudio-updated "Build status")
![Coverage Status](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/Psycokwet/277c7acb9222d5762a31958b394afb2f/raw/bassaudio-updated-coverage.json)

Documentation :

[![Examples](https://img.shields.io/static/v1?label=info&message=examples&color=yellow)](https://github.com/Psycokwet/bassaudio-updated/tree/master/examples/EXAMPLES.md)
[![Official documentation](https://img.shields.io/static/v1?label=official&message=un4seen&color=blue)](https://www.un4seen.com/)

Others :

[![install size](https://badgen.net/bundlephobia/min/bassaudio-updated)](https://bundlephobia.com/result?p=bassaudio-updated)
[![npm downloads](https://img.shields.io/npm/dm/bassaudio-updated)](https://www.npmjs.com/package/bassaudio-updated "Monthly downloads")
[![npm downloads](https://img.shields.io/npm/dt/bassaudio-updated)](https://www.npmjs.com/package/bassaudio-updated "All time downloads")
[![MIT License](https://img.shields.io/static/v1?label=licence&message=MIT&color=green)](https://github.com//Psycokwet/bassaudio-updated/tree/master/LICENSE "Licence")

**Disclaimer**

This package has not been fully tested. Some features may not be fully functionning, if you encounter such a feature, please email me with your traces. I'm still working on it.

Also, I'm not in anyway linked to the bass library. I just like their lib and want it to be accessible to the world of node.

**Announcement**

In order to be used to its full potential, you need to use an encoder like lame to stream audio to a distant server.

The necessaries dll a part from the eventuals encoder ones are included in this library. For MacOs, Windows 32/64bits, and linux 32/64 bits. If you encounter any issues while using it, please let me know.

As the dll are already included, you need to check for the un4seen licence prior to using this package. You may have a free licence depending on the usage you are making, and as mentionned down there, its a very great library, so check it out ! There is also some documentation, that I did not include here, that you can get directly with the original dynamic library files

If you want a lighter version without superfluous binaries library included, please, check out [bassaudio-updated-light](https://www.npmjs.com/package/bassaudio-updated-light)

**Un4Seen Bass Audio Library Wrapper**

[Bass Audio library](http://www.un4seen.com) is the best audio library to play, edit, convert, stream etc.
this wrapper wraps most of the "audio playback" features using [ffi-napi](https://www.npmjs.com/package/ffi-napi) , [ref-napi](https://www.npmjs.com/package/ref-napi) , [ref-struct-napi](https://www.npmjs.com/package/ref-struct-napi) .
It uses [os](https://www.npmjs.com/package/os) to determines which dynamic library are needed.

ffi-napi enables to call c library methods, properties , callbacks etc.

**Compatible with?**

Included binaries library files for Windows 64/32bits, Linux 64/32bits, and macOs. Not fully tested yet, so report any encountered issues please.

**Documentation**

Bass documentation is available here :
http://www.un4seen.com/doc/
You can also see this version :
http://bass.radio42.com/help/

There is also some documentation directly in the README files accompanying the library files on the un4seen website.

Let me now if there is other useful documentation that I can share here. :)

Original library files, bass community, licensing, other apis and more is available here :
[http://www.un4seen.com](http://www.un4seen.com).

You can see more code examples from the wrapper original creator, [Serkanp](https://bitbucket.org/serkanp/bassaudio/src/master/), in its git repositories linked here.

**Features:**

- BASS_Init

- BASS_GetVersion

- BASS_StreamCreate

- BASS_StreamCreateFile

- BASS_StreamCreateURL

- BASS_StreamFree

- BASS_ChannelPlay

- BASS_ChannelStop

- BASS_ChannelPause

- BASS_ChannelGetPosition

- BASS_ChannelSetPosition

- BASS_ChannelGetLength

- BASS_ChannelBytes2Seconds

- BASS_ChannelSeconds2Bytes

- BASS_ChannelGetLevel

- BASS_ChannelRemoveSync

- BASS_ChannelIsActive

- BASS_ChannelSetAttribute

- BASS_ChannelGetAttribute

- BASS_ChannelSetSync

- BASS_ChannelSlideAttribute

- BASS_ChannelIsSliding

- BASS_ChannelGetDevice

- BASS_ChannelSetDevice

- BASS_StreamFree

- BASS_SetDevice

- BASS_SetVolume

- BASS_Start

- BASS_Stop

- BASS_Pause

- BASS_GetInfo

- BASS_ErrorGetCode

- BASS_Free

- BASS_GetCPU

- BASS_GetDevice

- BASS_GetDeviceInfo

- BASS_ChannelGetTags

- BASS_Mixer_StreamCreate

- BASS_Mixer_StreamAddChannel

- BASS_Mixer_ChannelGetLevel

- BASS_Mixer_ChannelGetMixer

- BASS_Mixer_ChannelGetPosition

- BASS_Mixer_ChannelRemove

- BASS_Mixer_ChannelRemoveSync

- BASS_Mixer_ChannelSetPosition

- BASS_Mixer_ChannelSetSync

- BASS_Encode_Start

- BASS_Encode_IsActive

- BASS_Encode_SetNotify

- BASS_Encode_SetPaused

- BASS_Encode_Stop

- BASS_Encode_CastInit

- BASS_Encode_CastGetStats

- BASS_Encode_CastSetTitle

- BASS_Split_StreamCreate

- BASS_Split_StreamGetAvailable

- BASS_Split_StreamGetSource

- BASS_Split_StreamGetSplits

- BASS_Split_StreamReset

- BASS_Split_StreamResetEx

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

From Tags add-ons :

- TAGS_GetVersion

- TAGS_Read

- TAGS_ReadEx

- TAGS_SetUTF8

- TAGS_GetLastErrorDesc

**Extra:**

SYNCPROC also implemented

**Installation**

Install with npm :
`npm install bassaudio-updated`

**Examples**

**basic capture and play microphone**

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

**basic load and play file**

```javascript
var bass = require("bassaudio-updated");
var basslib = new bass();

//get all sound cards
var cards = basslib.getDevices();
console.log("total found sound cards:" + cards.length);
//lets print first sound card's info, find out more inside source code..
//first item in array '[0]' is "no sound" , then use the item [1]
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

// [device],[freq],[flags] , -1 is default sound card
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
//channel,restart   , returns  (also there are stop , pause commands)
var success = basslib.BASS_ChannelPlay(chan, -1);
if (!success) {
  console.log("error playing file:" + basslib.BASS_ErrorGetCode());
}
```

**Get Artist**

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

**Get Duration**

```javascript
//get the duration, bass returns the total bytes of the channel pointer, then we must convert it to seconds :)
var durationInBytes = basslib.BASS_ChannelGetLength(chan, 0);
var durationInSeconds = basslib.BASS_ChannelBytes2Seconds(
  chan,
  durationInBytes
);
```

**Get Duration Example2**

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

**Get Volume of channel**

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

**Set Volume**

```javascript
//lets set to 0.3
basslib.BASS_ChannelSetAttribute(
  chan,
  basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL,
  0.3
);
```

**Get current Position of playback**

```javascript
var positionInBytes = basslib.BASS_ChannelGetPosition(chan, 0);
//now convert it to seconds
var position = basslib.BASS_ChannelBytes2Seconds(chan, positionInBytes);
```

**Set Position**

```javascript
//first get the byte position of desired seconds (ex:to last 10 seconds
var Last10SecondsBytePos = basslib.BASS_ChannelSeconds2Bytes(
  chan,
  durationInSeconds - 10
);
basslib.BASS_ChannelSetPosition(chan, Last10SecondsBytePos);
```

**Is channel is playing?**

```javascript
var result = basslib.BASS_ChannelIsActive(chan);
if (result == basslib.BASS_ChannelIsActiveAttribs.BASS_ACTIVE_PLAYING) {
  console.log("channel is playing");
}
```

**sliding**

```javascript
//Lets slide volume to 0 in 3 seconds (3000 milliseconds)
basslib.BASS_ChannelSlideAttribute(
  chan,
  basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL,
  0,
  3000
);
```

**callback**

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

**vumeter**

```javascript
//lets get vumeter :)
var levels = basslib.BASS_ChannelGetLevel(chan);
//its a 64 bit value, lets get lo and hiwords
var rightlevel = basslib.toFloat64(levels)[0];
var leftlevel = basslib.toFloat64(levels)[1];
```

**close the file**

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

**change sound card**

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

**Info of a channel**

```javascript
var info = basslib.BASS_ChannelGetInfo(chan);
console.log("info.ctype:" + info.ctype);
console.log(
  "is channel an mp3 stream?:" +
    (info.ctype == basslib.BASS_CHANNELINFOtypes.BASS_CTYPE_STREAM_MP3)
);
//other infos are: freq,chans,flags,ctype,origres,plugin,sample,filename
```

**Info of a device**

```javascript
var info = basslib.getInfo();
console.log("speaker count:" + info.speakers);
console.log("minimum buffer:" + info.minbuf);
console.log("latency:" + info.latency);
```

**Free the memory from bass**

```javascript
basslib.BASS_Free();
```

**MIXER FEATURES**

**Enable Mixer**

```javascript
//before using mixer, first enable it. and put the required component to root folder.
basslib.EnableMixer(true);
```

**Mixer is Enabled?**

```javascript
//before using mixer, first enable it. and put the required component to root folder.
console.log(basslib.MixerEnabled());
```

**Create mixer stream**

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

**Get current Position of mixer playback**

```javascript
var positionInBytes = basslib.BASS_Mixer_ChannelGetPosition(chan, 0);
//now convert it to seconds
var position = basslib.BASS_ChannelBytes2Seconds(chan, positionInBytes);
```

**ENCODER FEATURES**

you can directly encode and send output to [shoutcast](http://www.shoutcast.com) and [icecast](http://www.icecast.org) servers

use mixer as a trick, because if the channel freed or added new channel, the encoder stops itself.

add channels to mixer every time, and add mixer channel to encoder. so the encoder never stops..

**Init encoder**

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

**get notification from encoder server**

```javascript
var result=basslib.BASS_Encode_SetNotify(enc_chan,function(handle,status,user){
  if(status==basslib.EncoderNotifyStatus.BASS_ENCODE_NOTIFY_CAST){
  console.log('server connection is dead');
});
```

**mono speaker output**

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

//if your file is stereo , you have to downmix to mono, else you cannot get it mono output to only 1 speaker.
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

**splitting channels**

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

**INFO**
i only added methods, properties what i needed.. add yours to the code or send me mail..

**IMPORTANT**

\***\*Below modifications are now handled internally. You shouldn't need to do these manually. However, if you do, you know where to find them.\*\***

2017-02-10

please modify node_modules/ffi/lib/callback.js if you are using callbacks.
ffi garbage collector removes callbacks after 10 seconds. with this modification, callbacks stays on memory

at line 81 , before return, add;

```javascript
Object.defineProperty(func, "_func", { value: callback });
```

**--------------------------------**

2017-01-31

please modify node_modules/ffi/lib/library.js if you are using linux os and if you are using addons.
ffi loads bass into instance, not as global instance.. so the addons could not find main bass on memory.
this fixes that issue.. (on windows and macos, it works without this modification)

find

```javascript
var dl = new DynamicLibrary(libfile || null, RTLD_NOW);
```

change it to

```javascript
var dl = new DynamicLibrary(
  libfile || null,
  RTLD_NOW | DynamicLibrary.FLAGS.RTLD_GLOBAL
);
```

**UPDATE LOG**

**--------------------------------**

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

**BEFORE FORK-UPDATE LOG**

**--------------------------------**

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
