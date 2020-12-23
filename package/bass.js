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

const EventEmitter = require("events").EventEmitter;

const util = require("util");
util.inherits(Bass, EventEmitter);

const ref = require("ref-napi");
const path = require("path");
const ArrayType = require("ref-array-di")(ref);
const ffi = require("ffi-napi");
const os = require("os");

const setStructs = require("./setStructs");
const setCallbacks = require("./setCallbacks");
const setFlags = require("./flags");
const libFile = require("./libFile");

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

function Bass(options) {
  if (!options) options = {};
  try {
    applyShim(options.silent);
  } catch (err) {
    console.error(chalk.bgRed.white.bold(err));
  }

  const platformDependencies = getPlatformDependencies();
  this.libFiles = platformDependencies.libFiles;
  const basePath = path.join(__dirname, "lib", platformDependencies.path);

  for (let prop in this.libFiles) {
    this.libFiles[prop].setPath(basePath);
  }

  setStructs(this);
  setCallbacks(this);

  var Bass = ref.types.void;
  var dword = ref.refType(Bass);
  var hwnd = ref.refType(Bass);

  setFlags(this);

  const BASS_DEVICEINFO = this.BASS_DEVICEINFO;
  const BASS_CHANNELINFO = this.BASS_CHANNELINFO;
  const ID3V1Tag = this.ID3V1Tag;
  const BASS_INFO = this.BASS_INFO;
  const BASS_RECORDINFO = this.BASS_RECORDINFO;
  const ffiFunDeclaration = {
    BASS_Init: ["bool", ["int", "int", "int", "int", "int"]],
    BASS_GetVersion: ["int", []],
    BASS_StreamCreate: [
      "int",
      ["int", "int", "int", "pointer", "int64"],
      ["int", "int", "int", this.StreamProc.id, "int64"],
    ],
    BASS_StreamCreateFile: ["int", ["bool", "string", "int64", "int64", "int"]],
    BASS_StreamCreateURL: [
      "int",
      ["string", "int", "int", "pointer", "int64"],
      ["string", "int", "int", this.DownloadProc.id, "int64"],
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
    BASS_ChannelGetAttribute: ["bool", ["int", "int", "pointer"]],
    BASS_ChannelSetSync: [
      "int",
      ["int", "int", "int64", "pointer", "int64"],
      ["int", "int", "int64", this.SyncProc.id, "int64"],
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
    BASS_GetInfo: ["bool", [BASS_INFO.getRefType()], [BASS_INFO.id]],
    BASS_ErrorGetCode: ["int", []],
    BASS_Free: ["bool", []],
    BASS_GetCPU: ["float", []],
    BASS_GetDevice: ["int", []],
    BASS_GetDeviceInfo: [
      "bool",
      ["int", BASS_DEVICEINFO.getRefType()],
      ["int", BASS_DEVICEINFO.id],
    ],
    BASS_ChannelGetTags: ["string", ["int", "int"]],
    BASS_ChannelGetInfo: [
      "bool",
      ["int", BASS_CHANNELINFO.getRefType()],
      ["int", BASS_CHANNELINFO.id],
    ],
    BASS_SetConfig: ["bool", ["int", "int"]],
    BASS_GetConfig: ["int", ["int"]],
    BASS_Update: ["bool", ["int"]],
    BASS_ChannelUpdate: ["bool", ["int", "int"]],
    BASS_RecordFree: ["bool", []],
    BASS_RecordGetDevice: ["int", []],
    BASS_RecordGetDeviceInfo: [
      "bool",
      ["int", BASS_RECORDINFO.getRefType()],
      ["int", BASS_RECORDINFO.id],
    ],
    BASS_RecordGetInfo: [
      "bool",
      [BASS_RECORDINFO.getRefType()],
      [BASS_RECORDINFO.id],
    ],
    BASS_RecordGetInput: ["int", ["int", "float"]],
    BASS_RecordGetInputName: ["string", ["int"]],
    BASS_RecordInit: ["bool", ["int"]],
    BASS_RecordSetDevice: ["bool", ["int"]],
    BASS_RecordSetInput: ["bool", ["int", "int", "float"]],
    BASS_RecordStart: [
      "int",
      ["int", "int", "long", "pointer", "int64"],
      ["int", "int", "long", this.RecordProc.id, "int64"],
    ],
  };

  enableLib(
    this.libFiles["bass"],
    new ffi.DynamicLibrary(
      this.libFiles["bass"].path,
      ffi.DynamicLibrary.FLAGS.RTLD_NOW | ffi.DynamicLibrary.FLAGS.RTLD_GLOBAL
    ),
    ffiFunDeclaration,
    this
  );

  this.libFiles["bass"].setDebugData({
    ffiFunDeclaration: ffiFunDeclaration,
  });
  EventEmitter.call(this);
}
////////////WRAPPER ADD ON////////////

Bass.prototype.getDeviceCount = function () {
  var info = this.BASS_DEVICEINFO.generateNewObject();

  var i = 0;
  while (this.BASS_GetDeviceInfo(i, info.ref())) {
    i++;
  }
  return i;
};

Bass.prototype.getDevices = function () {
  var arr = [];
  var info = this.BASS_DEVICEINFO.generateNewObject();

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
  var info = this.BASS_DEVICEINFO.generateNewObject();

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
  var info = this.BASS_CHANNELINFO.generateNewObject();
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
  var info = this.BASS_DEVICEINFO.generateNewObject();
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
  var info = this.BASS_DEVICEINFO.generateNewObject();

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

// /////////////////////NATIVES FUNCTIONS/////////////////////////

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
        ["int", "int", "int64", "pointer", "int64"],
        ["int", "int", "int64", this.SyncProc.id, "int64"],
      ],
      BASS_Split_StreamCreate: [
        "int",
        ["int", "int", "pointer"],
        ["int", "int", "int*"],
      ],
      BASS_Split_StreamGetAvailable: ["int", ["int"]],
      BASS_Split_StreamGetSource: ["int", ["int"]],
      BASS_Split_StreamReset: ["bool", ["int"]],
      BASS_Split_StreamResetEx: ["bool", ["int", "int"]],
      BASS_Split_StreamGetSplits: [
        "int",
        ["int", "pointer", "int"],
        ["int", "HSTREAM *", "int"],
      ],
    };

    enableLib(
      this.libFiles["mix"],
      this.libFiles["mix"].path,
      ffiFunDeclaration,
      this
    );
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
        ["int", "string", "int", "pointer", "int64"],
        ["int", "string", "int", this.EncodeProc.id, "int64"],
      ],
      BASS_Encode_IsActive: ["int", ["int"]],
      BASS_Encode_SetNotify: [
        "bool",
        ["int", "pointer", "int64"],
        ["int", this.EncodeNotifyProc.id, "int64"],
      ],
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

    enableLib(
      this.libFiles["enc"],
      this.libFiles["enc"].path,
      ffiFunDeclaration,
      this
    );
  } else {
    this.libFiles["enc"].disable();
  }
};

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

    enableLib(
      this.libFiles["tags"],
      this.libFiles["tags"].path,
      ffiFunDeclaration,
      this
    );
  } else {
    this.libFiles["tags"].disable();
  }
};

function enableLib(libFile, pathOrDl, ffiFunDeclaration, bass) {
  libFile.enable(ffi.Library(pathOrDl, ffiFunDeclaration));

  for (let fun in ffiFunDeclaration) {
    bass[fun] = (...args) => libFile.tryFunc(fun, ...args);
  }
  libFile.setDebugData({
    ffiFunDeclaration: ffiFunDeclaration,
  });
}

exports = module.exports = Bass;
