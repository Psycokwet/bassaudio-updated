/**
 * Created by scarboni on 25.12.2020.
 */

const ref = require("ref-napi");
const ArrayType = require("ref-array-di")(ref);
const ffi = require("ffi-napi");

function setWrapFun(Bass) {
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

  Bass.prototype.WRAP_ChannelSetSync = function (
    handle,
    type,
    param,
    callback
  ) {
    return this.libFiles["bass"].tryFunc(
      "BASS_ChannelSetSync",
      handle,
      type,
      param,
      ffi.Callback("void", ["int", "int", "int", "pointer"], callback),
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
      ffi.Callback("void", ["int", "int", "int", "pointer"], callback),
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
          (info.flags &
            this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DISPLAYPORT) ==
          this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_DISPLAYPORT;
        o.typeHandset =
          (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HANDSET) ==
          this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HANDSET;
        o.typeHdmi =
          (info.flags & this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HDMI) ==
          this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HDMI;
        o.typeHeadPhones =
          (info.flags &
            this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_HEADPHONES) ==
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
          (info.flags &
            this.BASS_DEVICEINFOflags.BASS_DEVICE_TYPE_MICROPHONE) ==
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
}
exports = module.exports = setWrapFun;
