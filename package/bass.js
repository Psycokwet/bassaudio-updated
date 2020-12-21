/**
 * Created by serkan on 30.10.2016.
 * Updated by scarboni since 20.10.2020
 */

/**
 *  hsync : int
 *  dword : int
 *  HWND : int used 0 ?
 *  GUID : int used Null?
 *  int : int
 *  bool : bool
 *  float : float
 *  void : void
 */

const chalk = require("chalk");
const applyShim = require("../shim.js");
try {
  applyShim();
} catch (err) {
  console.error(chalk.bgRed.white.bold(err));
}

const EventEmitter = require("events").EventEmitter;

const util = require("util");
util.inherits(Bass, EventEmitter);

const ref = require("ref-napi");
const path = require("path");
const ArrayType = require("ref-array-di")(ref);
const ffi = require("ffi-napi");
const os = require("os");

const structMaster = require("./structMaster");
const libFile = require("./libFile");
const setFlags = require("./flags");

const wrapper_errors = {
  libNotEnabled: (lib) => `You must enable ${lib} before using this function`,
};

Bass.prototype.WRAP_DEBUG_getDebugData = function (libName) {
  return this.libFiles[libName].getDebugData();
};

Bass.prototype.WRAP_DEBUG_getAllLibNameActivated = function () {
  let libNames = [];
  for (let prop in this.libFiles) {
    libNames.push(prop);
  }
  return libNames;
};

function getPlatformDependencies() {
  let platform = os.platform();
  let arch = os.arch();

  switch (platform) {
    case "win32":
      const winLibFiles = {
        bass: new libFile("bass", "bass.dll"),
        mix: new libFile("mix", "bassmix.dll"),
        enc: new libFile("enc", "bassenc.dll"),
        tags: new libFile("tags", "tags.dll"),
      };
      if (arch == "x64") {
        return { path: "win64", libFiles: winLibFiles };
      } else if (arch == "x86") {
        return { path: "win32", libFiles: winLibFiles };
      } else {
        return null;
      }
    case "darwin":
      const macosLibFiles = {
        bass: new libFile("bass", "libbass.dylib"),
        mix: new libFile("mix", "libbassmix.dylib"),
        enc: new libFile("enc", "libbassenc.dylib"),
        tags: new libFile("tags", "libtags.dylib"),
      };
      return { path: "macOs", libFiles: macosLibFiles };
    case "linux":
      const linuxLibFiles = {
        bass: new libFile("bass", "libbass.so"),
        mix: new libFile("mix", "libbassmix.so"),
        enc: new libFile("enc", "libbassenc.so"),
        tags: new libFile("tags", "libtags.so"),
      };
      if (arch == "x64") {
        return { path: "linux64", libFiles: linuxLibFiles };
      } else if (arch == "x86") {
        return { path: "linux32", libFiles: linuxLibFiles };
      } else {
        return null;
      }
  }
  return null;
}

function Bass() {
  const platformDependencies = getPlatformDependencies();
  this.libFiles = platformDependencies.libFiles;
  const basePath = path.join(__dirname, "lib", platformDependencies.path);

  for (let prop in this.libFiles) {
    this.libFiles[prop].setPath(basePath);
  }

  const sm = new structMaster();
  console.log(sm.BASS_DEVICEINFO.getRefType());

  var Bass = ref.types.void;
  var dword = ref.refType(Bass);
  var hwnd = ref.refType(Bass);

  setFlags(this);

  // unused yet, but must see later if better
  //
  // this.SYNCPROC = ffi.Callback(
  //   "void",
  //   ["int", "int", "int", ref.types.void],
  //   function (handle, channel, data, user) {
  //     console.log("syncproc is called");
  //     Bass.BASS_ChannelSlideAttribute(
  //       channel,
  //       BASS_ChannelAttributes.BASS_ATTRIB_VOL,
  //       0,
  //       3000
  //     );
  //   }
  // );

  // this.DownloadProc = ffi.Callback(
  //   "void",
  //   ["long", "long", ref.types.void],
  //   function (buffer, length, user) {
  //     console.log(buffer);
  //   }
  // );
  // this.StreamProc = ffi.Callback(
  //   "void",
  //   ["int", ref.types.void, "int", ref.types.void],
  //   function (handle, buffer, length, user) {
  //     console.log("StreamProc");
  //     //console.log(buffer);
  //   }
  // );
  const deviceInfoPTR = ref.refType(sm.BASS_DEVICEINFO.getRefType());
  const chanInfoPTR = ref.refType(sm.BASS_CHANNELINFO.getRefType());
  const idTagPTR = ref.refType(sm.ID3V1Tag.getRefType());
  const infoPTR = ref.refType(sm.BASS_INFO.getRefType());
  const recinfoPTR = ref.refType(sm.BASS_RECORDINFO.getRefType());
  const ffiFunDeclaration = {
    BASS_Init: ["bool", ["int", "int", "int", "int", "int"]],
    BASS_GetVersion: ["int", []],
    BASS_StreamCreate: ["int", ["int", "int", "int", "pointer", "int64"]],
    BASS_StreamCreateFile: ["int", ["bool", "string", "int64", "int64", "int"]],
    BASS_StreamCreateURL: [
      "int",
      ["string", "int", "int", "pointer", ref.types.void],
    ],
    BASS_ChannelPlay: ["bool", ["int", "bool"]],
    BASS_ChannelStop: ["bool", ["int"]],
    BASS_ChannelPause: ["bool", ["int"]],
    BASS_ChannelGetPosition: ["int64", ["int", "int"]],
    BASS_ChannelSetPosition: ["bool", ["int", "int64", "int"]],
    BASS_ChannelGetLength: ["int64", ["int", "int"]],

    BASS_ChannelBytes2Seconds: ["double", ["int", "int64"]],
    BASS_ChannelSeconds2Bytes: ["int64", ["int", "double"]],
    BASS_ChannelGetLevel: ["int", ["int"]],
    BASS_ChannelRemoveSync: ["bool", ["int", "int"]],
    BASS_ChannelIsActive: ["int", ["int"]],
    BASS_ChannelSetAttribute: ["bool", ["int", "int", "float"]],
    BASS_ChannelGetAttribute: ["bool", ["int", "int", "float"]],
    BASS_ChannelSetSync: [
      "int",
      ["int", "int", "int64", "pointer", ref.types.void],
    ],

    BASS_ChannelSlideAttribute: ["bool", ["long", "long", "float", "long"]],
    BASS_ChannelIsSliding: ["bool", ["long", "long"]],
    BASS_ChannelGetDevice: ["int", ["int"]],
    BASS_ChannelSetDevice: ["bool", ["long", "long"]],
    BASS_StreamFree: ["bool", ["int"]],
    BASS_SetDevice: ["bool", ["int"]],
    BASS_SetVolume: ["bool", ["float"]],
    BASS_Start: ["bool", []],
    BASS_Stop: ["bool", []],
    BASS_Pause: ["bool", []],
    BASS_GetInfo: ["bool", [infoPTR]],
    BASS_ErrorGetCode: ["int", []],
    BASS_Free: ["bool", []],
    BASS_GetCPU: ["float", []],
    BASS_GetDevice: ["int", []],
    BASS_GetDeviceInfo: ["bool", ["int", deviceInfoPTR]],
    BASS_ChannelGetTags: ["string", ["int", "int"]],
    BASS_ChannelGetInfo: ["bool", ["int", chanInfoPTR]],
    BASS_SetConfig: ["bool", ["int", "int"]],
    BASS_GetConfig: ["int", ["int"]],
    BASS_Update: ["bool", ["int"]],
    BASS_ChannelUpdate: ["bool", ["int", "int"]],
    BASS_RecordFree: ["bool", []],
    BASS_RecordGetDevice: ["int", []],
    BASS_RecordGetDeviceInfo: ["bool", ["int", recinfoPTR]],
    BASS_RecordGetInfo: ["bool", [recinfoPTR]],
    BASS_RecordGetInput: ["int", ["int", "float"]],
    BASS_RecordGetInputName: ["string", ["int"]],
    BASS_RecordInit: ["bool", ["int"]],
    BASS_RecordSetDevice: ["bool", ["int"]],
    BASS_RecordSetInput: ["bool", ["int", "int", "float"]],
    BASS_RecordStart: [
      "int",
      ["int", "int", "long", "pointer", ref.types.void],
    ],
  };
  this.libFiles["bass"].enable(
    ffi.Library(
      new ffi.DynamicLibrary(
        this.libFiles["bass"].path,
        ffi.DynamicLibrary.FLAGS.RTLD_NOW | ffi.DynamicLibrary.FLAGS.RTLD_GLOBAL
      ),
      ffiFunDeclaration
    )
  );

  this.libFiles["bass"].setDebugData({
    ffiFunDeclaration: ffiFunDeclaration,
  });
  EventEmitter.call(this);
}
////////////WRAPPER ADD ON////////////

Bass.prototype.getDeviceCount = function () {
  var info = new this.BASS_DEVICEINFO();

  var i = 0;
  while (this.BASS_GetDeviceInfo(i, info.ref())) {
    i++;
  }
  return i;
};

Bass.prototype.getDevices = function () {
  var arr = [];
  var info = new this.BASS_DEVICEINFO();

  var i = 0;
  while (this.BASS_GetDeviceInfo(i, info.ref())) {
    //replace by a getdevice later
    var o = new Object();
    o.name = info.name;
    o.driver = info.driver;
    o.flags = info.flags;
    o.enabled =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_ENABLED) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_ENABLED;
    o.IsDefault =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_DEFAULT) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_DEFAULT;
    o.IsInitialized =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_INIT) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_INIT;
    o.typeDigital =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DIGITAL) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DIGITAL;
    o.typeDisplayPort =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DISPLAYPORT) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DISPLAYPORT;
    o.typeHandset =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HANDSET) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HANDSET;
    o.typeHdmi =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HDMI) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HDMI;
    o.typeHeadPhones =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADPHONES) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADPHONES;
    o.typeHeadSet =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADSET) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADSET;
    o.typeLine =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_LINE) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_LINE;
    o.typeMask =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MASK) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MASK;
    o.typeMicrophone =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MICROPHONE) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MICROPHONE;
    o.typeNetwork =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_NETWORK) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_NETWORK;
    o.typeSPDIF =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPDIF) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPDIF;
    o.typeSpeakers =
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPEAKERS) ==
      this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPEAKERS;
    arr.push(o);
    i++;
  }
  return arr;
};

Bass.prototype.getDevice = function (device) {
  if (device == -1) {
    var devs = this.getDevices();
    for (i = 0; i < devs.length; i++) {
      if (devs[i].IsDefault) {
        return devs[i];
      }
    }
  }
  var info = new this.BASS_DEVICEINFO();

  this.BASS_GetDeviceInfo(device, info.ref());
  var o = new Object();

  o.name = info.name;
  o.driver = info.driver;
  o.flags = info.flags;
  o.enabled =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_ENABLED) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_ENABLED;
  o.IsDefault =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_DEFAULT) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_DEFAULT;
  o.IsInitialized =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_INIT) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_INIT;
  o.typeDigital =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DIGITAL) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DIGITAL;
  o.typeDisplayPort =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DISPLAYPORT) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DISPLAYPORT;
  o.typeHandset =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HANDSET) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HANDSET;
  o.typeHdmi =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HDMI) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HDMI;
  o.typeHeadPhones =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADPHONES) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADPHONES;
  o.typeHeadSet =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADSET) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADSET;
  o.typeLine =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_LINE) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_LINE;
  o.typeMask =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MASK) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MASK;
  o.typeMicrophone =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MICROPHONE) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MICROPHONE;
  o.typeNetwork =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_NETWORK) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_NETWORK;
  o.typeSPDIF =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPDIF) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPDIF;
  o.typeSpeakers =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPEAKERS) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPEAKERS;

  return o;
};

Bass.prototype.WRAP_ChannelGetInfo = function (handle) {
  var info = new this.BASS_CHANNELINFO();
  this.BASS_ChannelGetInfo(handle, info.ref());

  return info;
};

Bass.prototype.WRAP_ChannelGetTags = function (handle, tags) {
  var t = this.BASS_ChannelGetTags(handle, tags);
  if (
    tags == this.BASS_ChannelGetTagtypes.BASS_TAG_ID3 ||
    tags == this.BASS_ChannelGetTagtypes.BASS_TAG_ID3V2
  ) {
    console.log(t);
  } else {
    t.type = ref.types.string;
  }
  return t;
};

Bass.prototype.WRAP_Split_StreamCreate = function (handle, flags) {
  var myArr = ArrayType(ref.types.int);
  var arr = new myArr(3);
  arr[0] = 1;
  arr[1] = 0;
  arr[2] = -1;
  var buff = new Buffer(arr);
  var q = this.BASS_Split_StreamCreate(handle, flags, null);
  return q;
};

Bass.prototype.WRAP_Split_StreamGetSplits = function (handle, count) {
  var myArr = ArrayType(ref.types.int);
  var buff = new Buffer(myArr);
  var q = this.BASS_Split_StreamGetSplits(handle, buff, count);
  var arr = Array.prototype.slice.call(buff, 0);
  return arr;
};

Bass.prototype.WRAP_ChannelSetSync = function (handle, type, param, callback) {
  return this.libFiles["bass"].tryFunc(
    "BASS_ChannelSetSync",
    handle,
    type,
    param,
    ffi.Callback("void", ["int", "int", "int", ref.types.void], callback),
    null
  );
};

Bass.prototype.WRAP_Mixer_ChannelSetSync = function (
  handle,
  type,
  param,
  callback
) {
  return this.libFiles["mix"].tryFunc(
    "BASS_Mixer_ChannelSetSync",
    handle,
    type,
    param,
    ffi.Callback("void", ["int", "int", "int", ref.types.void], callback),
    null
  );
};
Bass.prototype.WRAP_Encode_SetNotify = function (handle, callback) {
  return this.libFiles["enc"].tryFunc(
    "BASS_Encode_SetNotify",
    handle,
    ffi.Callback("void", ["int", "int", ref.types.void], callback),
    null
  );
};

Bass.prototype.WRAP_RecordStart = function (freq, chans, flags, callback) {
  if (callback) {
    return this.libFiles["bass"].tryFunc(
      "BASS_RecordStart",
      freq,
      chans,
      flags,
      ffi.Callback(
        "bool",
        ["int", ref.types.void, "int", ref.types.void],
        callback
      ),
      null
    );
  }
  return this.libFiles["bass"].tryFunc(
    "BASS_RecordStart",
    freq,
    chans,
    flags,
    null,
    null
  );
};

Bass.prototype.getVolume = function (channel) {
  if (channel == 0) {
    return 0;
  }
  try {
    var volume = ref.alloc("float");
    this.BASS_ChannelGetAttribute(
      channel,
      this.BASS_ChannelAttributes.BASS_ATTRIB_VOL,
      volume
    );

    return ref.deref(volume).toFixed(4) * 100;
  } catch (ex) {
    console.log("get volume error:" + ex);
    return 0;
  }
};

Bass.prototype.setVolume = function (channel, newVolume) {
  return this.BASS_ChannelSetAttribute(
    channel,
    this.BASS_ChannelAttributes.BASS_ATTRIB_VOL,
    newVolume / 100
  );
};

Bass.prototype.getPosition = function (channel) {
  return this.BASS_ChannelBytes2Seconds(
    channel,
    this.BASS_ChannelGetPosition(channel, 0)
  );
};

Bass.prototype.getDuration = function (channel) {
  return this.BASS_ChannelBytes2Seconds(
    channel,
    this.BASS_ChannelGetLength(channel, 0)
  );
};

Bass.prototype.getInfo = function () {
  var refinfo = ref.alloc(this.BASS_INFO);
  this.BASS_GetInfo(refinfo);
  var d = ref.deref(refinfo);
  var o = new Object();

  o.flags = d.flags;
  o.hwsize = d.hwsize;
  o.hwfree = d.hwfree;
  o.freesam = d.freesam;
  o.free3d = d.free3d;
  o.minrate = d.minrate;
  o.maxrate = d.maxrate;
  o.eax = d.eax;
  o.minbuf = d.minbuf;
  o.dsver = d.dsver;
  o.latency = d.latency;
  o.initflags = d.initflags;
  o.speakers = d.speakers;
  o.freq = d.freq;

  return o;
};

Bass.prototype.toFloat64 = function (level) {
  var hiWord = 0,
    loWord = 0;
  if (level < 0) {
    hiWord = (level / 0x10000 - 1) & 0xffff;
  } else {
    hiWord = level / 0x10000;
  }
  loWord = level & 0xffff;

  return [hiWord, loWord];
};

Bass.prototype.getRecordInfo = function () {
  var refinfo = ref.alloc(this.BASS_RECORDINFO);
  this.BASS_RecordGetInfo(refinfo);
  var d = ref.deref(refinfo);
  var o = new Object();

  o.flags = d.flags;
  o.formats = d.formats;
  o.inputs = d.inputs;
  o.singlein = d.singlein;
  o.freq = d.freq;

  return o;
};

Bass.prototype.getRecordDevices = function () {
  var arr = [];
  var info = new this.BASS_DEVICEINFO();
  // var micdev = -1;

  var i = 0;
  while (this.BASS_RecordGetDeviceInfo(i, info.ref())) {
    if (
      info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_ENABLED &&
      (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MASK) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MICROPHONE
    ) {
      // micdev = i;
      var o = new Object();

      o.deviceNumber = i;
      o.name = info.name;
      o.driver = info.driver;
      o.flags = info.flags;
      o.enabled =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_ENABLED) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_ENABLED;
      o.IsDefault =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_DEFAULT) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_DEFAULT;
      o.IsInitialized =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_INIT) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_INIT;
      o.typeDigital =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DIGITAL) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DIGITAL;
      o.typeDisplayPort =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DISPLAYPORT) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DISPLAYPORT;
      o.typeHandset =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HANDSET) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HANDSET;
      o.typeHdmi =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HDMI) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HDMI;
      o.typeHeadPhones =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADPHONES) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADPHONES;
      o.typeHeadSet =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADSET) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADSET;
      o.typeLine =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_LINE) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_LINE;
      o.typeMask =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MASK) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MASK;
      o.typeMicrophone =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MICROPHONE) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MICROPHONE;
      o.typeNetwork =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_NETWORK) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_NETWORK;
      o.typeSPDIF =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPDIF) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPDIF;
      o.typeSpeakers =
        (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPEAKERS) ==
        this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPEAKERS;

      arr.push(o);
      // break;
    }

    i++;
  }
  return arr;
};

Bass.prototype.getRecordDevice = function (device) {
  if (device == -1) {
    var devs = this.getRecordDevices();
    for (i = 0; i < devs.length; i++) {
      if (devs[i].IsDefault) {
        return devs[i];
      }
    }
  }
  var info = new this.BASS_DEVICEINFO();

  this.BASS_RecordGetDeviceInfo(device, info.ref());
  var o = new Object();

  o.name = info.name;
  o.driver = info.driver;
  o.flags = info.flags;
  o.enabled =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_ENABLED) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_ENABLED;
  o.IsDefault =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_DEFAULT) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_DEFAULT;
  o.IsInitialized =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_INIT) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_INIT;
  o.typeDigital =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DIGITAL) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DIGITAL;
  o.typeDisplayPort =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DISPLAYPORT) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DISPLAYPORT;
  o.typeHandset =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HANDSET) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HANDSET;
  o.typeHdmi =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HDMI) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HDMI;
  o.typeHeadPhones =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADPHONES) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADPHONES;
  o.typeHeadSet =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADSET) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADSET;
  o.typeLine =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_LINE) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_LINE;
  o.typeMask =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MASK) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MASK;
  o.typeMicrophone =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MICROPHONE) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MICROPHONE;
  o.typeNetwork =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_NETWORK) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_NETWORK;
  o.typeSPDIF =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPDIF) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPDIF;
  o.typeSpeakers =
    (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPEAKERS) ==
    this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_SPEAKERS;

  return o;
};

/////////////////////NATIVES FUNCTIONS/////////////////////////

Bass.prototype.BASS_SetConfig = function (option, value) {
  return this.libFiles["bass"].tryFunc("BASS_SetConfig", option, value);
};
Bass.prototype.BASS_GetConfig = function (option) {
  return this.libFiles["bass"].tryFunc("BASS_GetConfig", option);
};
Bass.prototype.BASS_ChannelUpdate = function (handle, length) {
  return this.libFiles["bass"].tryFunc("BASS_ChannelUpdate", handle, length);
};
Bass.prototype.BASS_Update = function (length) {
  return this.libFiles["bass"].tryFunc("BASS_Update", length);
};

Bass.prototype.BASS_Init = function (device, freq, flags) {
  return this.libFiles["bass"].tryFunc(
    "BASS_Init",
    device,
    freq,
    flags,
    0,
    null
  );
};

Bass.prototype.BASS_GetVersion = function () {
  return this.libFiles["bass"].tryFunc("BASS_GetVersion"); //.toString(16)
};

Bass.prototype.BASS_StreamCreate = function (
  freq,
  chans,
  flags,
  callback,
  user
) {
  return this.libFiles["bass"].tryFunc(
    "BASS_StreamCreate",
    freq,
    chans,
    flags,
    null,
    0
  );
};

Bass.prototype.BASS_StreamCreateFile = function (
  IsMemoryStream,
  file,
  offset,
  length,
  flags
) {
  return this.libFiles["bass"].tryFunc(
    "BASS_StreamCreateFile",
    IsMemoryStream,
    file,
    offset,
    length,
    flags
  );
};

Bass.prototype.BASS_StreamCreateURL = function (url, offset, flags, callback) {
  return this.libFiles["bass"].tryFunc(
    "BASS_StreamCreateURL",
    url,
    offset,
    flags,
    null,
    0
  );
};

Bass.prototype.BASS_ChannelPlay = function (handle, restart) {
  return this.libFiles["bass"].tryFunc("BASS_ChannelPlay", handle, restart);
};

Bass.prototype.BASS_ChannelPause = function (handle) {
  return this.libFiles["bass"].tryFunc("BASS_ChannelPause", handle);
};

Bass.prototype.BASS_ChannelStop = function (handle) {
  return this.libFiles["bass"].tryFunc("BASS_ChannelStop", handle);
};

Bass.prototype.BASS_ChannelGetPosition = function (handle, mode) {
  return this.libFiles["bass"].tryFunc("BASS_ChannelGetPosition", handle, mode);
};

Bass.prototype.BASS_ChannelSetPosition = function (handle, pos, mode) {
  return this.libFiles["bass"].tryFunc(
    "BASS_ChannelSetPosition",
    handle,
    pos,
    mode
  );
};

Bass.prototype.BASS_ChannelGetLength = function (handle, mode) {
  return this.libFiles["bass"].tryFunc("BASS_ChannelGetLength", handle, mode);
};

Bass.prototype.BASS_ChannelSeconds2Bytes = function (handle, pos) {
  return this.libFiles["bass"].tryFunc(
    "BASS_ChannelSeconds2Bytes",
    handle,
    pos
  );
};

Bass.prototype.BASS_ChannelBytes2Seconds = function (handle, pos) {
  return this.libFiles["bass"].tryFunc(
    "BASS_ChannelBytes2Seconds",
    handle,
    pos
  );
};

Bass.prototype.BASS_ChannelGetLevel = function (handle) {
  return this.libFiles["bass"].tryFunc("BASS_ChannelGetLevel", handle);
};

Bass.prototype.BASS_ChannelRemoveSync = function (handle, synchandle) {
  return this.libFiles["bass"].tryFunc(
    "BASS_ChannelRemoveSync",
    handle,
    synchandle
  );
};

Bass.prototype.BASS_ChannelIsActive = function (handle) {
  return this.libFiles["bass"].tryFunc("BASS_ChannelIsActive", handle);
};

Bass.prototype.BASS_ChannelSetAttribute = function (handle, attrib, value) {
  return this.libFiles["bass"].tryFunc(
    "BASS_ChannelSetAttribute",
    handle,
    attrib,
    value
  );
};

Bass.prototype.BASS_ChannelGetAttribute = function (handle, attrib, value) {
  return this.libFiles["bass"].tryFunc(
    "BASS_ChannelGetAttribute",
    handle,
    attrib,
    value
  );
};

Bass.prototype.BASS_ChannelSetSync = function (handle, type, param, callback) {
  return this.libFiles["bass"].tryFunc(
    "BASS_ChannelSetSync",
    handle,
    type,
    param,
    callback,
    null
  );
};

Bass.prototype.BASS_ErrorGetCode = function () {
  return this.libFiles["bass"].tryFunc("BASS_ErrorGetCode");
};

Bass.prototype.BASS_ChannelSlideAttribute = function (
  handle,
  attrib,
  value,
  time
) {
  return this.libFiles["bass"].tryFunc(
    "BASS_ChannelSlideAttribute",
    handle,
    attrib,
    value,
    time
  );
};

Bass.prototype.BASS_ChannelIsSliding = function (handle, attrib) {
  return this.libFiles["bass"].tryFunc("BASS_ChannelIsSliding", handle, attrib);
};

Bass.prototype.BASS_ChannelGetDevice = function (handle) {
  return this.libFiles["bass"].tryFunc("BASS_ChannelGetDevice", handle);
};

Bass.prototype.BASS_ChannelSetDevice = function (handle, device) {
  return this.libFiles["bass"].tryFunc("BASS_ChannelSetDevice", handle, device);
};

Bass.prototype.BASS_StreamFree = function (handle) {
  return this.libFiles["bass"].tryFunc("BASS_StreamFree", handle);
};

Bass.prototype.BASS_SetDevice = function (device) {
  return this.libFiles["bass"].tryFunc("BASS_SetDevice", device);
};

Bass.prototype.BASS_SetVolume = function (volume) {
  return this.libFiles["bass"].tryFunc("BASS_SetVolume", volume);
};

Bass.prototype.BASS_Start = function () {
  return this.libFiles["bass"].tryFunc("BASS_Start");
};

Bass.prototype.BASS_Stop = function () {
  return this.libFiles["bass"].tryFunc("BASS_Stop");
};

Bass.prototype.BASS_Pause = function () {
  return this.libFiles["bass"].tryFunc("BASS_Pause");
};

Bass.prototype.BASS_Free = function () {
  return this.libFiles["bass"].tryFunc("BASS_Free");
};

Bass.prototype.BASS_GetCPU = function () {
  return this.libFiles["bass"].tryFunc("BASS_GetCPU");
};

Bass.prototype.BASS_GetDevice = function () {
  return this.libFiles["bass"].tryFunc("BASS_GetDevice");
};

Bass.prototype.BASS_GetDeviceInfo = function (device, info) {
  return this.libFiles["bass"].tryFunc("BASS_GetDeviceInfo", device, info);
};

Bass.prototype.BASS_ChannelGetInfo = function (handle, inforef) {
  return this.libFiles["bass"].tryFunc("BASS_ChannelGetInfo", handle, inforef);
};

Bass.prototype.BASS_ChannelGetTags = function (handle, tags) {
  return this.libFiles["bass"].tryFunc("BASS_ChannelGetTags", handle, tags);
};

//----------------------- Split Functions -----------------------------
Bass.prototype.BASS_Split_StreamCreate = function (handle, flags, chanmap) {
  return this.libFiles["mix"].tryFunc(
    "BASS_Split_StreamCreate",
    handle,
    flags,
    chanmap
  );
};

Bass.prototype.BASS_Split_StreamGetAvailable = function (handle) {
  return this.libFiles["mix"].tryFunc("BASS_Split_StreamGetAvailable", handle);
};

Bass.prototype.BASS_Split_StreamGetSource = function (handle) {
  return this.libFiles["mix"].tryFunc("BASS_Split_StreamGetSource", handle);
};

Bass.prototype.BASS_Split_StreamGetSplits = function (handle, splits, count) {
  return this.libFiles["mix"].tryFunc(
    "BASS_Split_StreamGetSplits",
    handle,
    splits,
    count
  );
};
Bass.prototype.BASS_Split_StreamReset = function (handle) {
  return this.libFiles["mix"].tryFunc("BASS_Split_StreamReset", handle);
};
Bass.prototype.BASS_Split_StreamResetEx = function (handle, offset) {
  return this.libFiles["mix"].tryFunc(
    "BASS_Split_StreamResetEx",
    handle,
    offset
  );
};
//----------------------- /Split Functions -----------------------------

//region mixer features
Bass.prototype.BASS_Mixer_StreamCreate = function (freq, chans, flags) {
  return this.libFiles["mix"].tryFunc(
    "BASS_Mixer_StreamCreate",
    freq,
    chans,
    flags
  );
};

Bass.prototype.BASS_Mixer_ChannelGetLevel = function (handle) {
  return this.libFiles["mix"].tryFunc("BASS_Mixer_ChannelGetLevel", handle);
};

Bass.prototype.BASS_Mixer_StreamAddChannel = function (handle, chans, flags) {
  return this.libFiles["mix"].tryFunc(
    "BASS_Mixer_StreamAddChannel",
    handle,
    chans,
    flags
  );
};

Bass.prototype.BASS_Mixer_ChannelGetMixer = function (handle) {
  return this.libFiles["mix"].tryFunc("BASS_Mixer_ChannelGetMixer", handle);
};

Bass.prototype.BASS_Mixer_ChannelGetPosition = function (handle, mode) {
  return this.libFiles["mix"].tryFunc(
    "BASS_Mixer_ChannelGetPosition",
    handle,
    mode
  );
};

Bass.prototype.BASS_Mixer_ChannelRemove = function (handle) {
  return this.libFiles["mix"].tryFunc("BASS_Mixer_ChannelRemove", handle);
};

Bass.prototype.BASS_Mixer_ChannelRemoveSync = function (handle, synchandle) {
  return this.libFiles["mix"].tryFunc(
    "BASS_Mixer_ChannelRemoveSync",
    handle,
    synchandle
  );
};

Bass.prototype.BASS_Mixer_ChannelSetPosition = function (handle, pos, mode) {
  return this.libFiles["mix"].tryFunc(
    "BASS_Mixer_ChannelSetPosition",
    handle,
    pos,
    mode
  );
};

Bass.prototype.BASS_Mixer_ChannelSetSync = function (
  handle,
  type,
  param,
  callback
) {
  return this.libFiles["mix"].tryFunc(
    "BASS_Mixer_ChannelSetSync",
    handle,
    type,
    param,
    callback,
    null
  );
};

Bass.prototype.MixerEnabled = function () {
  return this.libFiles["mix"].isEnabled();
};

Bass.prototype.EnableMixer = function (value) {
  if (value) {
    const ffiFunDeclaration = {
      BASS_Mixer_StreamCreate: ["int", ["int", "int", "int"]],
      BASS_Mixer_StreamAddChannel: ["bool", ["int", "int", "int"]],
      BASS_Mixer_ChannelGetLevel: ["int", ["int"]],
      BASS_Mixer_ChannelGetMixer: ["int", ["int"]],
      BASS_Mixer_ChannelGetPosition: ["int64", ["int", "int"]],
      BASS_Mixer_ChannelRemove: ["bool", ["int"]],
      BASS_Mixer_ChannelRemoveSync: ["bool", ["int", "int"]],
      BASS_Mixer_ChannelSetPosition: ["bool", ["int", "int64", "int"]],
      BASS_Mixer_ChannelSetSync: [
        "int",
        ["int", "int", "int64", "pointer", ref.types.void],
      ],
      BASS_Split_StreamCreate: ["int", ["int", "int", "pointer"]],
      BASS_Split_StreamGetAvailable: ["int", ["int"]],
      BASS_Split_StreamGetSource: ["int", ["int"]],
      BASS_Split_StreamReset: ["bool", ["int"]],
      BASS_Split_StreamResetEx: ["bool", ["int", "int"]],
      BASS_Split_StreamGetSplits: ["int", ["int", "pointer", "int"]],
    };
    this.libFiles["mix"].enable(
      ffi.Library(this.libFiles["mix"].path, ffiFunDeclaration)
    );

    this.libFiles["mix"].setDebugData({
      ffiFunDeclaration: ffiFunDeclaration,
    });
  } else {
    this.libFiles["mix"].disable();
  }
};

//endregion

//region encoder
Bass.prototype.EncoderEnabled = function () {
  return this.libFiles["enc"].isEnabled();
};

Bass.prototype.EnableEncoder = function (value) {
  if (value) {
    const ffiFunDeclaration = {
      BASS_Encode_Start: [
        "int",
        ["int", "string", "int", "pointer", ref.types.void],
      ],
      BASS_Encode_IsActive: ["int", ["int"]],
      BASS_Encode_SetNotify: ["bool", ["int", "pointer", ref.types.void]],
      BASS_Encode_SetPaused: ["bool", ["int", "bool"]],
      BASS_Encode_Stop: ["bool", ["int"]],
      BASS_Encode_CastInit: [
        "bool",
        [
          "int",
          "string",
          "string",
          "string",
          "string",
          "string",
          "string",
          "string",
          "string",
          "int",
          "bool",
        ],
      ],
      BASS_Encode_CastGetStats: ["string", ["int", "int", "string"]],
      BASS_Encode_CastSetTitle: ["bool", ["int", "string", "string"]],
    };
    this.libFiles["enc"].enable(
      ffi.Library(this.libFiles["enc"].path, ffiFunDeclaration)
    );

    this.libFiles["enc"].setDebugData({
      ffiFunDeclaration: ffiFunDeclaration,
    });
  } else {
    this.libFiles["enc"].disable();
  }
};

Bass.prototype.BASS_Encode_SetNotify = function (handle, callback) {
  return this.libFiles["enc"].tryFunc(
    "BASS_Encode_SetNotify",
    handle,
    callback,
    null
  );
};

Bass.prototype.BASS_Encode_Start = function (handle, cmdline, flags) {
  return this.libFiles["enc"].tryFunc(
    "BASS_Encode_Start",
    handle,
    cmdline,
    flags,
    null,
    ref.types.void
  );
};

Bass.prototype.BASS_Encode_IsActive = function (handle) {
  return this.libFiles["enc"].tryFunc("BASS_Encode_IsActive", handle);
};

Bass.prototype.BASS_Encode_SetPaused = function (handle, paused) {
  return this.libFiles["enc"].tryFunc("BASS_Encode_SetPaused", handle, paused);
};

Bass.prototype.BASS_Encode_Stop = function (handle) {
  return this.libFiles["enc"].tryFunc("BASS_Encode_Stop", handle);
};

Bass.prototype.BASS_Encode_CastInit = function (
  handle,
  server,
  pass,
  content,
  name,
  url,
  genre,
  desc,
  headers,
  bitrate,
  pub
) {
  return this.libFiles["enc"].tryFunc(
    "BASS_Encode_CastInit",
    handle,
    server,
    pass,
    content,
    name,
    url,
    genre,
    desc,
    headers,
    bitrate,
    pub
  );
};

Bass.prototype.BASS_Encode_CastGetStats = function (handle, type, pass) {
  return this.libFiles["enc"].tryFunc(
    "BASS_Encode_CastGetStats",
    handle,
    type,
    pass
  );
};

Bass.prototype.BASS_Encode_CastSetTitle = function (handle, title, url) {
  return this.libFiles["enc"].tryFunc(
    "BASS_Encode_CastSetTitle",
    handle,
    title,
    url
  );
};

//endregion

Bass.prototype.BASS_GetInfo = function (refinfo) {
  return this.libFiles["bass"].tryFunc("BASS_GetInfo", refinfo);
};

//recording

Bass.prototype.BASS_RecordFree = function () {
  return this.libFiles["bass"].tryFunc("BASS_RecordFree");
};

Bass.prototype.BASS_RecordGetDevice = function () {
  return this.libFiles["bass"].tryFunc("BASS_RecordGetDevice");
};

Bass.prototype.BASS_RecordGetDeviceInfo = function (device, refinfo) {
  return this.libFiles["bass"].tryFunc(
    "BASS_RecordGetDeviceInfo",
    device,
    refinfo
  );
};

Bass.prototype.BASS_RecordGetInfo = function (refinfo) {
  return this.libFiles["bass"].tryFunc("BASS_RecordGetInfo", refinfo);
};

Bass.prototype.BASS_RecordGetInput = function (input, volume) {
  return this.libFiles["bass"].tryFunc("BASS_RecordGetInput", input, volume);
};

Bass.prototype.BASS_RecordGetInputName = function (input) {
  return this.libFiles["bass"].tryFunc("BASS_RecordGetInputName", input);
};

Bass.prototype.BASS_RecordInit = function (device) {
  return this.libFiles["bass"].tryFunc("BASS_RecordInit", device);
};

Bass.prototype.BASS_RecordSetDevice = function (device) {
  return this.libFiles["bass"].tryFunc("BASS_RecordSetDevice", device);
};

Bass.prototype.BASS_RecordSetInput = function (input, flags, volume) {
  return this.libFiles["bass"].tryFunc(
    "BASS_RecordSetInput",
    input,
    flags,
    volume
  );
};

Bass.prototype.BASS_RecordStart = function (freq, chans, flags, callback) {
  return this.libFiles["bass"].tryFunc(
    "BASS_RecordStart",
    freq,
    chans,
    flags,
    callback,
    null
  );
};

//DWORD BASS_RecordGetDevice();

// BOOL BASS_RecordGetInfo(
//   BASS_RECORDINFO *info
// );
// Parameters
// info	Pointer to a structure to receive the information.
// Return value
// If successful, TRUE is returned, else FALSE is returned. Use BASS_ErrorGetCode to get the error code.
// Error codes
// BASS_ERROR_INIT	BASS_RecordInit has not been successfully called.
// Example
// Check if the current device can have multiple inputs enabled.

///////////////////////TAGS lib/////////////////////////////
Bass.prototype.TagsEnabled = function () {
  return this.libFiles["tags"].isEnabled();
};

Bass.prototype.EnableTags = function (value) {
  if (value) {
    const ffiFunDeclaration = {
      TAGS_GetVersion: ["int", []],
      TAGS_Read: ["string", ["int", "string"]], //handle, fmt
      TAGS_ReadEx: ["string", ["int", "string", "int", "int"]], // handle, fmt, tagtype, codepage
      TAGS_SetUTF8: ["bool", ["bool"]], // enable
      TAGS_GetLastErrorDesc: ["string", []],
    };
    this.libFiles["tags"].enable(
      ffi.Library(this.libFiles["tags"].path, ffiFunDeclaration)
    );

    for (let fun in ffiFunDeclaration) {
      Bass.prototype[fun] = (...args) =>
        this.libFiles["tags"].tryFunc(fun, ...args);
    }
    this.libFiles["tags"].setDebugData({
      ffiFunDeclaration: ffiFunDeclaration,
    });
  } else {
    this.libFiles["tags"].disable();
  }
};

// Bass.prototype.TAGS_GetVersion = function () {
//   return this.libFiles["tags"].tryFunc("TAGS_GetVersion");
// };
// Bass.prototype.TAGS_Read = function (handle, fmt) {
//   return this.libFiles["tags"].tryFunc("TAGS_Read", handle, fmt);
// };
// Bass.prototype.TAGS_ReadEx = function (handle, fmt, tagtype, codepage) {
//   return this.libFiles["tags"].tryFunc(
//     "TAGS_ReadEx",
//     handle,
//     fmt,
//     tagtype,
//     codepage
//   );
// };
// Bass.prototype.TAGS_SetUTF8 = function (enable) {
//   return this.libFiles["tags"].tryFunc("TAGS_SetUTF8", enable);
// };
// Bass.prototype.TAGS_GetLastErrorDesc = function () {
//   return this.libFiles["tags"].tryFunc("TAGS_GetLastErrorDesc");
// };

exports = module.exports = Bass;