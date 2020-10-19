/**
 * Created by serkan on 30.10.2016.
 */

var EventEmitter = require("events").EventEmitter;

function bass(options) {
  var self = this;

  var ref = require("ref-napi");
  this.ffi = require("ffi-napi");
  this.ref = ref;

  options = options || {};
  // basePath must be a valid *absolute* path
  options.basePath = options.basePath || process.cwd();

  var bass = ref.types.void;
  var dword = ref.refType(bass);
  var hwnd = ref.refType(bass);

  var Struct = require("ref-struct-napi");
  this.BASS_DEVICEINFO = Struct({
    name: "string",
    driver: "string",
    flags: "int",
  });

  this.BASS_INFO = Struct({
    flags: "int",
    hwsize: "int",
    hwfree: "int",
    freesam: "int",
    free3d: "int",
    minrate: "int",
    maxrate: "int",
    eax: "bool",
    minbuf: "int",
    dsver: "int",
    latency: "int",
    initflags: "int",
    speakers: "int",
    freq: "int",
  });

  this.BASS_SetConfigflags = {
    BASS_CONFIG_BUFFER: 0,
    BASS_CONFIG_UPDATEPERIOD: 1,
    BASS_CONFIG_GVOL_SAMPLE: 4,
    BASS_CONFIG_GVOL_STREAM: 5,
    BASS_CONFIG_GVOL_MUSIC: 6,
    BASS_CONFIG_CURVE_VOL: 7,
    BASS_CONFIG_CURVE_PAN: 8,
    BASS_CONFIG_FLOATDSP: 9,
    BASS_CONFIG_3DALGORITHM: 10,
    BASS_CONFIG_NET_TIMEOUT: 11,
    BASS_CONFIG_NET_BUFFER: 12,
    BASS_CONFIG_PAUSE_NOPLAY: 13,
    BASS_CONFIG_NET_PREBUF: 15,
    BASS_CONFIG_NET_PASSIVE: 18,
    BASS_CONFIG_REC_BUFFER: 19,
    BASS_CONFIG_NET_PLAYLIST: 21,
    BASS_CONFIG_MUSIC_VIRTUAL: 22,
    BASS_CONFIG_VERIFY: 23,
    BASS_CONFIG_UPDATETHREADS: 24,
    BASS_CONFIG_DEV_BUFFER: 27,
    BASS_CONFIG_VISTA_TRUEPOS: 30,
    BASS_CONFIG_IOS_MIXAUDIO: 34,
    BASS_CONFIG_DEV_DEFAULT: 36,
    BASS_CONFIG_NET_READTIMEOUT: 37,
    BASS_CONFIG_VISTA_SPEAKERS: 38,
    BASS_CONFIG_IOS_SPEAKER: 39,
    BASS_CONFIG_MF_DISABLE: 40,
    BASS_CONFIG_HANDLES: 41,
    BASS_CONFIG_UNICODE: 42,
    BASS_CONFIG_SRC: 43,
    BASS_CONFIG_SRC_SAMPLE: 44,
    BASS_CONFIG_ASYNCFILE_BUFFER: 45,
    BASS_CONFIG_OGG_PRESCAN: 47,
    BASS_CONFIG_MF_VIDEO: 48,
    BASS_CONFIG_AIRPLAY: 49,
    BASS_CONFIG_DEV_NONSTOP: 50,
    BASS_CONFIG_IOS_NOCATEGORY: 51,
    BASS_CONFIG_VERIFY_NET: 52,
    BASS_CONFIG_DEV_PERIOD: 53,
    BASS_CONFIG_FLOAT: 54,
    BASS_CONFIG_NET_SEEK: 56,
  };

  this.BASS_POSITIONflags = {
    BASS_POS_BYTE: 0, // byte position
    BASS_POS_MUSIC_ORDER: 1, // order.row position, MAKELONG(order,row)
    BASS_POS_OGG: 3, // OGG bitstream number
    BASS_POS_INEXACT: 0x8000000, // flag: allow seeking to inexact position
    BASS_POS_DECODE: 0x10000000, // flag: get the decoding (not playing) position
    BASS_POS_DECODETO: 0x20000000, // flag: decode to the position instead of seeking
    BASS_POS_SCAN: 0x40000000, // flag: scan to the position
  };

  this.BASSFlags = {
    BASS_SAMPLE_DEFAULT: 0,
    BASS_SAMPLE_8BITS: 1, // 8 bit
    BASS_SAMPLE_FLOAT: 256, // 32 bit floating-point
    BASS_SAMPLE_MONO: 2, // mono
    BASS_SAMPLE_LOOP: 4, // looped
    BASS_SAMPLE_3D: 8, // 3D functionality
    BASS_SAMPLE_SOFTWARE: 16, // not using hardware mixing
    BASS_SAMPLE_MUTEMAX: 32, // mute at max distance (3D only)
    BASS_SAMPLE_VAM: 64, // DX7 voice allocation & management
    BASS_SAMPLE_FX: 128, // old implementation of DX8 effects
    BASS_SAMPLE_OVER_VOL: 0x10000, // override lowest volume
    BASS_SAMPLE_OVER_POS: 0x20000, // override longest playing
    BASS_SAMPLE_OVER_DIST: 0x30000, // override furthest from listener (3D only)
    BASS_STREAM_PRESCAN: 0x20000, // enable pin-point seeking/length (MP3/MP2/MP1)
    BASS_MP3_SETPOS: 0x20000,
    BASS_STREAM_AUTOFREE: 0x40000, // automatically free the stream when it stop/ends
    BASS_STREAM_RESTRATE: 0x80000, // restrict the download rate of internet file streams
    BASS_STREAM_BLOCK: 0x100000, // download/play internet file stream in small blocks
    BASS_STREAM_DECODE: 0x200000, // don't play the stream, only decode (BASS_ChannelGetData)
    BASS_STREAM_STATUS: 0x800000, // give server status info (HTTP/ICY tags) in DOWNLOADPROC
  };
  this.BASS_CHANNELINFO = Struct({
    freq: "int",
    chans: "int",
    flags: "int",
    ctype: "int",
    origres: "int",
    plugin: "int",
    sample: "int",
    filename: "string",
  });

  this.ID3V1Tag = Struct({
    id: "string",
    title: "string",
    artist: "string",
    album: "string",
    year: "string",
    comment: "string",
    genre: "byte",
  });

  var BASS_SPEAKER_FRONT = 0x1000000, // front speakers
    BASS_SPEAKER_REAR = 0x2000000, // rear/side speakers
    BASS_SPEAKER_CENLFE = 0x3000000, // center & LFE speakers (5.1)
    BASS_SPEAKER_REAR2 = 0x4000000, // rear center speakers (7.1)
    BASS_SPEAKER_LEFT = 0x10000000, // modifier: left
    BASS_SPEAKER_RIGHT = 0x20000000; // modifier: right

  this.BASS_SPEAKERtypes = {
    BASS_SPEAKER_FRONT: BASS_SPEAKER_FRONT,
    BASS_SPEAKER_REAR: BASS_SPEAKER_REAR,
    BASS_SPEAKER_CENLFE: BASS_SPEAKER_CENLFE,
    BASS_SPEAKER_REAR2: BASS_SPEAKER_REAR2,
    BASS_SPEAKER_LEFT: BASS_SPEAKER_LEFT,
    BASS_SPEAKER_RIGHT: BASS_SPEAKER_RIGHT,
    BASS_SPEAKER_FRONTLEFT: BASS_SPEAKER_FRONT | BASS_SPEAKER_LEFT,
    BASS_SPEAKER_FRONTRIGHT: BASS_SPEAKER_FRONT | BASS_SPEAKER_RIGHT,
    BASS_SPEAKER_REARLEFT: BASS_SPEAKER_REAR | BASS_SPEAKER_LEFT,
    BASS_SPEAKER_REARRIGHT: BASS_SPEAKER_REAR | BASS_SPEAKER_RIGHT,
    BASS_SPEAKER_CENTER: BASS_SPEAKER_CENLFE | BASS_SPEAKER_LEFT,
    BASS_SPEAKER_LFE: BASS_SPEAKER_CENLFE | BASS_SPEAKER_RIGHT,
    BASS_SPEAKER_REAR2LEFT: BASS_SPEAKER_REAR2 | BASS_SPEAKER_LEFT,
    BASS_SPEAKER_REAR2RIGHT: BASS_SPEAKER_REAR2 | BASS_SPEAKER_RIGHT,
  };

  this.BASS_MIXERsourceflags = {
    BASS_MIXER_BUFFER: 0x2000, // buffer data for BASS_Mixer_ChannelGetData/Level
    BASS_MIXER_LIMIT: 0x4000, // limit mixer processing to the amount available from this source
    BASS_MIXER_MATRIX: 0x10000, // matrix mixing
    BASS_MIXER_PAUSE: 0x20000, // don't process the source
    BASS_MIXER_DOWNMIX: 0x400000, // downmix to stereo/mono
    BASS_MIXER_NORAMPIN: 0x800000, // don't ramp-in the start
  };

  this.BASS_ChannelGetTagtypes = {
    BASS_TAG_ID3: 0, // ID3v1 tags : TAG_ID3 structure
    BASS_TAG_ID3V2: 1, // ID3v2 tags : variable length block
    BASS_TAG_OGG: 2, // OGG comments : series of null-terminated UTF-8 strings
    BASS_TAG_HTTP: 3, // HTTP headers : series of null-terminated ANSI strings
    BASS_TAG_ICY: 4, // ICY headers : series of null-terminated ANSI strings
    BASS_TAG_META: 5, // ICY metadata : ANSI string
    BASS_TAG_APE: 6, // APE tags : series of null-terminated UTF-8 strings
    BASS_TAG_MP4: 7, // MP4/iTunes metadata : series of null-terminated UTF-8 strings
    BASS_TAG_WMA: 8, // WMA tags : series of null-terminated UTF-8 strings
    BASS_TAG_VENDOR: 9, // OGG encoder : UTF-8 string
    BASS_TAG_LYRICS3: 10, // Lyric3v2 tag : ASCII string
    BASS_TAG_CA_CODEC: 11, // CoreAudio codec info : TAG_CA_CODEC structure
    BASS_TAG_MF: 13, // Media Foundation tags : series of null-terminated UTF-8 strings
    BASS_TAG_WAVEFORMAT: 14, // WAVE format : WAVEFORMATEEX structure
    BASS_TAG_RIFF_INFO: 0x100, // RIFF "INFO" tags : series of null-terminated ANSI strings
    BASS_TAG_RIFF_BEXT: 0x101, // RIFF/BWF "bext" tags : TAG_BEXT structure
    BASS_TAG_RIFF_CART: 0x102, // RIFF/BWF "cart" tags : TAG_CART structure
    BASS_TAG_RIFF_DISP: 0x103, // RIFF "DISP" text tag : ANSI string
    BASS_TAG_APE_BINARY: 0x1000, // + index #, binary APE tag : TAG_APE_BINARY structure
    BASS_TAG_MUSIC_NAME: 0x10000, // MOD music name : ANSI string
    BASS_TAG_MUSIC_MESSAGE: 0x10001, // MOD message : ANSI string
    BASS_TAG_MUSIC_ORDERS: 0x10002, // MOD order list : BYTE array of pattern numbers
    BASS_TAG_MUSIC_AUTH: 0x10003, // MOD author : UTF-8 string
    BASS_TAG_MUSIC_INST: 0x10100, // + instrument #, MOD instrument name : ANSI string
    BASS_TAG_MUSIC_SAMPLE: 0x10300, // + sample #, MOD sample name : ANSI string
  };

  this.BASS_CHANNELINFOtypes = {
    BASS_CTYPE_NOTHING: 0,
    BASS_CTYPE_SAMPLE: 1,
    BASS_CTYPE_RECORD: 2,
    BASS_CTYPE_STREAM: 0x10000,
    BASS_CTYPE_STREAM_OGG: 0x10002,
    BASS_CTYPE_STREAM_MP1: 0x10003,
    BASS_CTYPE_STREAM_MP2: 0x10004,
    BASS_CTYPE_STREAM_MP3: 0x10005,
    BASS_CTYPE_STREAM_AIFF: 0x10006,
    BASS_CTYPE_STREAM_CA: 0x10007,
    BASS_CTYPE_STREAM_MF: 0x10008,
    BASS_CTYPE_STREAM_WAV: 0x40000, // WAVE flag, LOWORD=codec
    BASS_CTYPE_STREAM_WAV_PCM: 0x50001,
    BASS_CTYPE_STREAM_WAV_FLOAT: 0x50003,
    BASS_CTYPE_MUSIC_MOD: 0x20000,
    BASS_CTYPE_MUSIC_MTM: 0x20001,
    BASS_CTYPE_MUSIC_S3M: 0x20002,
    BASS_CTYPE_MUSIC_XM: 0x20003,
    BASS_CTYPE_MUSIC_IT: 0x20004,
    BASS_CTYPE_MUSIC_MO3: 0x00100, // MO3 flag
  };

  this.BASS_DEVICEINFOflags = {
    BASS_DEVICE_ENABLED: 1,
    BASS_DEVICE_DEFAULT: 2,
    BASS_DEVICE_INIT: 4,
    BASS_DEVICE_TYPE_MASK: 0xff000000,
    BASS_DEVICE_TYPE_NETWORK: 0x01000000,
    BASS_DEVICE_TYPE_SPEAKERS: 0x02000000,
    BASS_DEVICE_TYPE_LINE: 0x03000000,
    BASS_DEVICE_TYPE_HEADPHONES: 0x04000000,
    BASS_DEVICE_TYPE_MICROPHONE: 0x05000000,
    BASS_DEVICE_TYPE_HEADSET: 0x06000000,
    BASS_DEVICE_TYPE_HANDSET: 0x07000000,
    BASS_DEVICE_TYPE_DIGITAL: 0x08000000,
    BASS_DEVICE_TYPE_SPDIF: 0x09000000,
    BASS_DEVICE_TYPE_HDMI: 0x0a000000,
    BASS_DEVICE_TYPE_DISPLAYPORT: 0x40000000,
    BASS_DEVICES_AIRPLAY: 0x1000000,
  };

  this.BASS_Initflags = {
    BASS_DEVICE_STEREO: 0,
    BASS_DEVICE_8BITS: 1, // 8 bit resolution, else 16 bit
    BASS_DEVICE_MONO: 2, // mono, else stereo
    BASS_DEVICE_3D: 4, // enable 3D functionality
    BASS_DEVICE_LATENCY: 0x100, // calculate device latency (BASS_INFO struct)
    BASS_DEVICE_CPSPEAKERS: 0x400, // detect speakers via Windows control panel
    BASS_DEVICE_SPEAKERS: 0x800, // force enabling of speaker assignment
    BASS_DEVICE_NOSPEAKER: 0x1000, // ignore speaker arrangement
    BASS_DEVICE_DMIX: 0x2000, // use ALSA "dmix" plugin
    BASS_DEVICE_FREQ: 0x4000, // set device sample rate
  };

  this.BASS_ChannelIsActiveAttribs = {
    BASS_ACTIVE_STOPPED: 0,
    BASS_ACTIVE_PLAYING: 1,
    BASS_ACTIVE_STALLED: 2,
    BASS_ACTIVE_PAUSED: 3,
  };

  this.BASS_ChannelSyncTypes = {
    BASS_SYNC_POS: 0,
    BASS_SYNC_END: 2,
    BASS_SYNC_META: 4,
    BASS_SYNC_SLIDE: 5,
    BASS_SYNC_STALL: 6,
    BASS_SYNC_DOWNLOAD: 7,
    BASS_SYNC_FREE: 8,
    BASS_SYNC_SETPOS: 11,
    BASS_SYNC_MUSICPOS: 10,
    BASS_SYNC_MUSICINST: 1,
    BASS_SYNC_MUSICFX: 3,
    BASS_SYNC_OGG_CHANGE: 12,
    BASS_SYNC_MIXTIME: 0x40000000, // FLAG: sync at mixtime, else at playtime
    BASS_SYNC_ONETIME: 0x80000000, // FLAG: sync only once, else continuously
  };

  this.BASS_ChannelAttributes = {
    BASS_ATTRIB_FREQ: 1,
    BASS_ATTRIB_VOL: 2,
    BASS_ATTRIB_PAN: 3,
    BASS_ATTRIB_EAXMIX: 4,
    BASS_ATTRIB_NOBUFFER: 5,
    BASS_ATTRIB_VBR: 6,
    BASS_ATTRIB_CPU: 7,
    BASS_ATTRIB_SRC: 8,
    BASS_ATTRIB_NET_RESUME: 9,
    BASS_ATTRIB_SCANINFO: 10,
    BASS_ATTRIB_NORAMP: 11,
    BASS_ATTRIB_BITRATE: 12,
    BASS_ATTRIB_MUSIC_AMPLIFY: 0x100,
    BASS_ATTRIB_MUSIC_PANSEP: 0x101,
    BASS_ATTRIB_MUSIC_PSCALER: 0x102,
    BASS_ATTRIB_MUSIC_BPM: 0x103,
    BASS_ATTRIB_MUSIC_SPEED: 0x104,
    BASS_ATTRIB_MUSIC_VOL_GLOBAL: 0x105,
    BASS_ATTRIB_MUSIC_ACTIVE: 0x106,
    BASS_ATTRIB_MUSIC_VOL_CHAN: 0x200, // + channel #
    BASS_ATTRIB_MUSIC_VOL_INST: 0x300, // + instrument #
  };

  this.BASS_Position_modes = {
    BASS_FILEPOS_CURRENT: 0,
    BASS_FILEPOS_DECODE: 0,
    BASS_FILEPOS_DOWNLOAD: 1,
    BASS_FILEPOS_END: 2,
    BASS_FILEPOS_START: 3,
    BASS_FILEPOS_CONNECTED: 4,
    BASS_FILEPOS_BUFFER: 5,
    BASS_FILEPOS_SOCKET: 6,
    BASS_FILEPOS_ASYNCBUF: 7,
    BASS_FILEPOS_SIZE: 8,
  };

  this.BASS_ErrorCode = {
    BASS_OK: 0, // all is OK
    BASS_ERROR_MEM: 1, // memory error
    BASS_ERROR_FILEOPEN: 2, // can't open the file,
    BASS_ERROR_DRIVER: 3, // can't find a free/valid driver
    BASS_ERROR_BUFLOST: 4, // the sample buffer was lost
    BASS_ERROR_HANDLE: 5, // invalid handle
    BASS_ERROR_FORMAT: 6, // unsupported sample format
    BASS_ERROR_POSITION: 7, // invalid position
    BASS_ERROR_INIT: 8, // BASS_Init has not been successfully called
    BASS_ERROR_START: 9, // BASS_Start has not been successfully called
    BASS_ERROR_SSL: 10, // SSL/HTTPS support isn't available
    BASS_ERROR_ALREADY: 14, // already initialized/paused/whatever
    BASS_ERROR_NOCHAN: 18, // can't get a free channel
    BASS_ERROR_ILLTYPE: 19, // an illegal type was specified
    BASS_ERROR_ILLPARAM: 20, // an illegal parameter was specified
    BASS_ERROR_NO3D: 21, // no 3D support
    BASS_ERROR_NOEAX: 22, // no EAX support
    BASS_ERROR_DEVICE: 23, // illegal device number
    BASS_ERROR_NOPLAY: 24, // not playing
    BASS_ERROR_FREQ: 25, // illegal sample rate
    BASS_ERROR_NOTFILE: 27, // the stream is not a file stream
    BASS_ERROR_NOHW: 29, // no hardware voices available
    BASS_ERROR_EMPTY: 31, // the MOD music has no sequence data
    BASS_ERROR_NONET: 32, // no internet connection could be opened
    BASS_ERROR_CREATE: 33, // couldn't create the file
    BASS_ERROR_NOFX: 34, // effects are not available
    BASS_ERROR_NOTAVAIL: 37, // requested data is not available
    BASS_ERROR_DECODE: 38, // the channel is/isn't a "decoding channel"
    BASS_ERROR_DX: 39, // a sufficient DirectX version is not installed
    BASS_ERROR_TIMEOUT: 40, // connection timedout
    BASS_ERROR_FILEFORM: 41, // unsupported file format
    BASS_ERROR_SPEAKER: 42, // unavailable speaker
    BASS_ERROR_VERSION: 43, // invalid BASS version (used by add-ons)
    BASS_ERROR_CODEC: 44, // codec is not available/supported
    BASS_ERROR_ENDED: 45, // the channel/file has ended
    BASS_ERROR_BUSY: 46, // the device is busy
    BASS_ERROR_UNKNOWN: -1, // some other mystery problem
  };

  this.EncoderNotifyStatus = {
    // Encoder notifications
    BASS_ENCODE_NOTIFY_ENCODER: 1, // encoder died
    BASS_ENCODE_NOTIFY_CAST: 2, // cast server connection died
    BASS_ENCODE_NOTIFY_CAST_TIMEOUT: 0x10000, // cast timeout
    BASS_ENCODE_NOTIFY_QUEUE_FULL: 0x10001, // queue is out of space
    BASS_ENCODE_NOTIFY_FREE: 0x10002, // encoder has been freed
  };

  this.BASS_Encode_CastGetStatstypes = {
    BASS_ENCODE_STATS_SHOUT: 0, // Shoutcast stats
    BASS_ENCODE_STATS_ICE: 1, // Icecast mount-point stats
    BASS_ENCODE_STATS_ICESERV: 2, // Icecast server stats
  };
  this.BASS_Encode_Startflags = {
    BASS_ENCODE_NOHEAD: 1, // don't send a WAV header to the encoder
    BASS_ENCODE_FP_8BIT: 2, // convert floating-point sample data to 8-bit integer
    BASS_ENCODE_FP_16BIT: 4, // convert floating-point sample data to 16-bit integer
    BASS_ENCODE_FP_24BIT: 6, // convert floating-point sample data to 24-bit integer
    BASS_ENCODE_FP_32BIT: 8, // convert floating-point sample data to 32-bit integer
    BASS_ENCODE_FP_AUTO: 14, // convert floating-point sample data back to channel's format
    BASS_ENCODE_BIGEND: 16, // big-endian sample data
    BASS_ENCODE_PAUSE: 32, // start encording paused
    BASS_ENCODE_PCM: 64, // write PCM sample data (no encoder)
    BASS_ENCODE_RF64: 128, // send an RF64 header
    BASS_ENCODE_MONO: 0x100, // convert to mono (if not already)
    BASS_ENCODE_QUEUE: 0x200, // queue data to feed encoder asynchronously
    BASS_ENCODE_WFEXT: 0x400, // WAVEFORMATEXTENSIBLE "fmt" chunk
    BASS_ENCODE_CAST_NOLIMIT: 0x1000, // don't limit casting data rate
    BASS_ENCODE_LIMIT: 0x2000, // limit data rate to real-time
    BASS_ENCODE_AIFF: 0x4000, // send an AIFF header rather than WAV
    BASS_ENCODE_DITHER: 0x8000, // apply dither when converting floating-point sample data to integer
    BASS_ENCODE_AUTOFREE: 0x40000, // free the encoder when the channel is freed
  };

  this.BASS_Encode_CastInitcontentMIMEtypes = {
    BASS_ENCODE_TYPE_MP3: "audio/mpeg",
    BASS_ENCODE_TYPE_OGG: "application/ogg",
    BASS_ENCODE_TYPE_AAC: "audio/aacp",
  };
  this.SYNCPROC = this.ffi.Callback(
    "void",
    ["int", "int", "int", ref.types.void],
    function (handle, channel, data, user) {
      console.log("syncproc is called");
      bass.BASS_ChannelSlideAttribute(
        channel,
        BASS_ChannelAttributes.BASS_ATTRIB_VOL,
        0,
        3000
      );
    }
  );

  var DOWNLOADPROC = this.ffi.Callback(
    "void",
    ["long", "long", ref.types.void],
    function (buffer, length, user) {
      console.log(buffer);
    }
  );

  var deviceInfoPTR = ref.refType(this.BASS_DEVICEINFO);
  var chanInfoPTR = ref.refType(this.BASS_CHANNELINFO);
  this.idTagPTR = ref.refType(this.ID3V1Tag);

  var floatPTR = ref.refType(ref.types.float);
  var infoPTR = ref.refType(this.BASS_INFO);

  var path = require("path");
  var basslibName = "";
  var bassmixlibName = "";
  var bassenclibName = "";
  if (process.platform == "win32") {
    basslibName = "bass.dll";
    bassmixlibName = "bassmix.dll";
    bassenclibName = "bassenc.dll";
  } else if (process.platform == "darwin") {
    basslibName = "libbass.dylib";
    bassmixlibName = "libbassmix.dylib";
    bassenclibName = "libbassenc.dylib";
  } else if (process.platform == "linux") {
    basslibName = "libbass.so";
    bassmixlibName = "libbassmix.so";
    bassenclibName = "libbassenc.so";
  }
  basslibName = path.join(options.basePath, basslibName);
  bassmixlibName = path.join(options.basePath, bassmixlibName);
  bassenclibName = path.join(options.basePath, bassenclibName);

  // this.ArrayType = require("ref-array-napi");// Not used????
  this.bassenclibName = bassenclibName;
  this.bassmixlibName = bassmixlibName;

  this.basslibmixer = null;
  this.basslibencoder = null;

  this.basslib = this.ffi.Library(basslibName, {
    BASS_Init: ["bool", ["int", "int", "int", "int", "int"]],
    BASS_GetVersion: ["int", []],
    BASS_StreamCreateFile: [
      "int",
      ["bool", "string", ref.types.int64, ref.types.int64, "int"],
    ],
    BASS_StreamCreateURL: [
      "int",
      ["string", "int", "int", "pointer", ref.types.void],
    ],
    BASS_ChannelPlay: ["bool", ["int", "bool"]],
    BASS_ChannelStop: ["bool", ["int"]],
    BASS_ChannelPause: ["bool", ["int"]],
    BASS_ChannelGetPosition: [ref.types.int64, ["int", "int"]],
    BASS_ChannelSetPosition: ["bool", ["int", ref.types.int64, "int"]],
    BASS_ChannelGetLength: [ref.types.int64, ["int", "int"]],

    BASS_ChannelBytes2Seconds: [ref.types.double, ["int", ref.types.int64]],
    BASS_ChannelSeconds2Bytes: [ref.types.int64, ["int", ref.types.double]],
    BASS_ChannelGetLevel: ["int", ["int"]],
    BASS_ChannelRemoveSync: ["bool", ["int", "int"]],
    BASS_ChannelIsActive: ["int", ["int"]],
    BASS_ChannelSetAttribute: ["bool", ["int", "int", "float"]],
    BASS_ChannelGetAttribute: ["bool", ["int", "int", floatPTR]],
    BASS_ChannelSetSync: [
      "int",
      ["int", "int", ref.types.int64, "pointer", ref.types.void],
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
  });

  // mixer_streamCreate, mixer_streamADdChannel,
  //bass_encode_start, bass_Encode_castinit, encode_stop, isActive,CastSetTitle

  console.log("testin");
  EventEmitter.call(this);
}
////////////////////////

var util = require("util");
util.inherits(bass, EventEmitter);

bass.prototype.getDeviceCount = function () {
  var info = new this.BASS_DEVICEINFO();

  var i = 0;
  while (this.basslib.BASS_GetDeviceInfo(i, info.ref())) {
    i++;
  }
  return i;
};

bass.prototype.getDevices = function () {
  var arr = [];
  var info = new this.BASS_DEVICEINFO();

  var i = 0;
  while (this.basslib.BASS_GetDeviceInfo(i, info.ref())) {
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

//if problem, take the other one form bal
bass.prototype.getDevice = function (device) {
  var info = new this.BASS_DEVICEINFO();

  this.basslib.BASS_GetDeviceInfo(device, info.ref());
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
// ---1

bass.prototype.BASS_SetConfig = function (option, value) {
  return this.basslib.BASS_SetConfig(option, value);
};
bass.prototype.BASS_GetConfig = function (option) {
  return this.basslib.BASS_GetConfig(option);
};
bass.prototype.BASS_ChannelUpdate = function (handle, length) {
  return this.basslib.BASS_ChannelUpdate(handle, length);
};
bass.prototype.BASS_Update = function (length) {
  return this.basslib.BASS_Update(length);
};
// ---1
bass.prototype.BASS_Init = function (device, freq, flags) {
  return this.basslib.BASS_Init(device, freq, flags, 0, null);
};
//---2
bass.prototype.BASS_GetVersion = function () {
  return this.basslib.BASS_GetVersion(); //.toString(16)
};
//---2
bass.prototype.BASS_StreamCreateFile = function (
  IsMemoryStream,
  file,
  offset,
  length,
  flags
) {
  return this.basslib.BASS_StreamCreateFile(
    IsMemoryStream,
    file,
    offset,
    length,
    flags
  );
};

bass.prototype.BASS_StreamCreateURL = function (url, offset, flags, callback) {
  return this.basslib.BASS_StreamCreateURL(url, offset, flags, null, 0);
};
//---
bass.prototype.BASS_StreamFree = function (handle) {
  return this.basslib.BASS_StreamFree(handle);
};
//---
bass.prototype.BASS_ChannelPlay = function (handle, restart) {
  return this.basslib.BASS_ChannelPlay(handle, restart);
};

bass.prototype.BASS_ChannelPause = function (handle) {
  return this.basslib.BASS_ChannelPause(handle);
};

bass.prototype.BASS_ChannelStop = function (handle) {
  return this.basslib.BASS_ChannelStop(handle);
};

bass.prototype.BASS_ChannelGetPosition = function (handle, mode) {
  return this.basslib.BASS_ChannelGetPosition(handle, mode);
};

bass.prototype.BASS_ChannelSetPosition = function (handle, pos, mode) {
  return this.basslib.BASS_ChannelSetPosition(handle, pos, mode);
};

bass.prototype.BASS_ChannelGetLength = function (handle, mode) {
  return this.basslib.BASS_ChannelGetLength(handle, mode);
};

bass.prototype.BASS_ChannelSeconds2Bytes = function (handle, pos) {
  return this.basslib.BASS_ChannelSeconds2Bytes(handle, pos);
};

bass.prototype.BASS_ChannelBytes2Seconds = function (handle, pos) {
  return this.basslib.BASS_ChannelBytes2Seconds(handle, pos);
};

bass.prototype.BASS_ChannelGetLevel = function (handle) {
  return this.basslib.BASS_ChannelGetLevel(handle);
};

bass.prototype.BASS_ChannelRemoveSync = function (handle, synchandle) {
  return this.basslib.BASS_ChannelRemoveSync(handle, synchandle);
};

bass.prototype.BASS_ChannelIsActive = function (handle) {
  return this.basslib.BASS_ChannelIsActive(handle);
};

bass.prototype.BASS_ChannelSetAttribute = function (handle, attrib, value) {
  return this.basslib.BASS_ChannelSetAttribute(handle, attrib, value);
};

bass.prototype.BASS_ChannelGetAttribute = function (handle, attrib, value) {
  return this.basslib.BASS_ChannelGetAttribute(handle, attrib, value);
};

bass.prototype.BASS_ChannelSetSync = function (handle, type, param, callback) {
  return this.basslib.BASS_ChannelSetSync(
    handle,
    type,
    param,
    this.ffi.Callback(
      "void",
      ["int", "int", "int", this.ref.types.void],
      callback
    ),
    null
  );
};

bass.prototype.BASS_ErrorGetCode = function () {
  return this.basslib.BASS_ErrorGetCode();
};

bass.prototype.BASS_ChannelSlideAttribute = function (
  handle,
  attrib,
  value,
  time
) {
  return this.basslib.BASS_ChannelSlideAttribute(handle, attrib, value, time);
};

bass.prototype.BASS_ChannelIsSliding = function (handle, attrib) {
  return this.basslib.BASS_ChannelIsSliding(handle, attrib);
};

//burdan
bass.prototype.BASS_ChannelGetDevice = function (handle) {
  return this.basslib.BASS_ChannelGetDevice(handle);
};

bass.prototype.BASS_ChannelSetDevice = function (handle, device) {
  return this.basslib.BASS_ChannelSetDevice(handle, device);
};

bass.prototype.BASS_StreamFree = function (handle) {
  return this.basslib.BASS_StreamFree(handle);
};

bass.prototype.BASS_SetDevice = function (device) {
  return this.basslib.BASS_SetDevice(device);
};

bass.prototype.BASS_SetVolume = function (volume) {
  return this.basslib.BASS_SetVolume(volume);
};

bass.prototype.BASS_Start = function () {
  return this.basslib.BASS_Start();
};

bass.prototype.BASS_Stop = function () {
  return this.basslib.BASS_Stop();
};

bass.prototype.BASS_Pause = function () {
  return this.basslib.BASS_Pause();
};

bass.prototype.BASS_Free = function () {
  return this.basslib.BASS_Free();
};

bass.prototype.BASS_GetCPU = function () {
  return this.basslib.BASS_GetCPU();
};

//bura
bass.prototype.BASS_GetDevice = function () {
  return this.basslib.BASS_GetDevice();
};

bass.prototype.BASS_GetDeviceInfo = function (device, info) {
  return this.basslib.BASS_GetDeviceInfo(device, info);
};

bass.prototype.BASS_ChannelGetInfo = function (handle) {
  var info = new this.BASS_CHANNELINFO();
  this.basslib.BASS_ChannelGetInfo(handle, info.ref());
  return info;
};

bass.prototype.BASS_ChannelGetTags = function (handle, tags) {
  var t = this.basslib.BASS_ChannelGetTags(handle, tags);
  if (
    tags == this.BASS_ChannelGetTagtypes.BASS_TAG_ID3 ||
    tags == this.BASS_ChannelGetTagtypes.BASS_TAG_ID3V2
  ) {
    console.log(t);
  } else {
    t.type = this.ref.types.string;
  }
  return t;
};
//---
//region mixer features
bass.prototype.BASS_Mixer_StreamCreate = function (freq, chans, flags) {
  return this.basslibmixer.BASS_Mixer_StreamCreate(freq, chans, flags);
};
bass.prototype.BASS_Mixer_StreamAddChannel = function (handle, chans, flags) {
  return this.basslibmixer.BASS_Mixer_StreamAddChannel(handle, chans, flags);
};
bass.prototype.BASS_Mixer_ChannelGetLevel = function (handle) {
  return this.basslibmixer.BASS_Mixer_ChannelGetLevel(handle);
};

bass.prototype.BASS_Mixer_StreamAddChannel = function (handle, chans, flags) {
  return this.basslibmixer.BASS_Mixer_StreamAddChannel(handle, chans, flags);
};
bass.prototype.BASS_Mixer_ChannelGetMixer = function (handle) {
  return this.basslibmixer.BASS_Mixer_ChannelGetMixer(handle);
};
bass.prototype.BASS_Mixer_ChannelGetPosition = function (handle, mode) {
  return this.basslibmixer.BASS_Mixer_ChannelGetPosition(handle, mode);
};
bass.prototype.BASS_Mixer_ChannelRemove = function (handle) {
  return this.basslibmixer.BASS_Mixer_ChannelRemove(handle);
};

bass.prototype.BASS_Mixer_ChannelRemoveSync = function (handle, synchandle) {
  return this.basslibmixer.BASS_Mixer_ChannelRemoveSync(handle, synchandle);
};

bass.prototype.BASS_Mixer_ChannelSetPosition = function (handle, pos, mode) {
  return this.basslibmixer.BASS_Mixer_ChannelSetPosition(handle, pos, mode);
};
bass.prototype.BASS_Mixer_ChannelSetSync = function (
  handle,
  type,
  param,
  callback
) {
  return this.basslib.BASS_Mixer_ChannelSetSync(
    handle,
    type,
    param,
    this.ffi.Callback(
      "void",
      ["int", "int", "int", this.ref.types.void],
      callback
    ),
    null
  );
};

bass.prototype.MixerEnabled = function () {
  return this.basslibmixer == null ? false : true;
};
bass.prototype.EnableMixer = function (value) {
  if (value) {
    this.basslibmixer = this.ffi.Library(this.bassmixlibName, {
      BASS_Mixer_StreamCreate: ["int", ["int", "int", "int"]],
      BASS_Mixer_StreamAddChannel: ["bool", ["int", "int", "int"]],
      BASS_Mixer_ChannelGetLevel: ["int", ["int"]],
      BASS_Mixer_ChannelGetMixer: ["int", ["int"]],
      BASS_Mixer_ChannelGetPosition: ["int", ["int", "int"]],
      BASS_Mixer_ChannelRemove: ["bool", ["int"]],
      BASS_Mixer_ChannelRemoveSync: ["bool", ["int", "int"]],
      BASS_Mixer_ChannelSetPosition: ["bool", ["int", "int", "int"]],
      BASS_Mixer_ChannelSetSync: [
        "int",
        ["int", "int", "ulong", "pointer", this.ref.types.void],
      ],
    });
  } else {
    this.basslibmixer = null;
  }
};

//endregion

//region encoder
bass.prototype.EncoderEnabled = function () {
  return this.basslibencoder == null ? false : true;
};
bass.prototype.EnableEncoder = function (value) {
  if (value) {
    this.basslibencoder = this.ffi.Library(this.bassenclibName, {
      BASS_Encode_Start: [
        "int",
        ["int", "string", "int", "pointer", this.ref.types.void],
      ],
      BASS_Encode_IsActive: ["int", ["int"]],
      BASS_Encode_SetNotify: ["bool", ["int", "pointer", this.ref.types.void]],
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
    });
  } else {
    this.basslibencoder = null;
  }
};

bass.prototype.BASS_Encode_SetNotify = function (handle, callback) {
  return this.basslibencoder.BASS_Encode_SetNotify(
    handle,
    this.ffi.Callback("void", ["int", "int", this.ref.types.void], callback),
    null
  );
};

bass.prototype.BASS_Encode_Start = function (handle, cmdline, flags) {
  return this.basslibencoder.BASS_Encode_Start(
    handle,
    cmdline,
    flags,
    null,
    this.ref.types.void
  );
};

bass.prototype.BASS_Encode_IsActive = function (handle) {
  return this.basslibencoder.BASS_ChannelIsActive(handle);
};

bass.prototype.BASS_Encode_SetPaused = function (handle, paused) {
  return this.basslibencoder.BASS_Encode_SetPaused(handle, paused);
};

bass.prototype.BASS_Encode_Stop = function (handle) {
  return this.basslibencoder.BASS_Encode_Stop(handle);
};

bass.prototype.BASS_Encode_CastInit = function (
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
  return this.basslibencoder.BASS_Encode_CastInit(
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

bass.prototype.BASS_Encode_CastGetStats = function (handle, type, pass) {
  return this.basslibencoder.BASS_Encode_CastGetStats(handle, type, pass);
};

bass.prototype.BASS_Encode_CastSetTitle = function (handle, title, url) {
  return this.basslibencoder.BASS_Encode_CastSetTitle(handle, title, url);
};
//endregion

//----
bass.prototype.getVolume = function (channel) {
  if (channel == 0) {
    return 0;
  }
  try {
    var volume = this.ref.alloc("float");
    this.basslib.BASS_ChannelGetAttribute(
      channel,
      this.BASS_ChannelAttributes.BASS_ATTRIB_VOL,
      volume
    );

    return this.ref.deref(volume).toFixed(4) * 100;
  } catch (ex) {
    console.log("get volume error:" + ex);
    return 0;
  }
};

bass.prototype.setVolume = function (channel, newVolume) {
  return this.basslib.BASS_ChannelSetAttribute(
    channel,
    this.BASS_ChannelAttributes.BASS_ATTRIB_VOL,
    newVolume / 100
  );
};

bass.prototype.getPosition = function (channel) {
  return this.basslib.BASS_ChannelBytes2Seconds(
    channel,
    this.basslib.BASS_ChannelGetPosition(channel, 0)
  );
};

bass.prototype.getDuration = function (channel) {
  return this.basslib.BASS_ChannelBytes2Seconds(
    channel,
    this.basslib.BASS_ChannelGetLength(channel, 0)
  );
};

bass.prototype.BASS_GetInfo = function (refinfo) {
  return this.basslib.BASS_GetInfo(refinfo);
};

bass.prototype.getInfo = function () {
  var refinfo = this.ref.alloc(this.BASS_INFO);
  this.basslib.BASS_GetInfo(refinfo);
  var d = this.ref.deref(refinfo);
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
//----

bass.prototype.toFloat64 = function (level) {
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

exports = module.exports = bass;
