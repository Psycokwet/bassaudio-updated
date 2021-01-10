/**
 * Created by scarboni on 21.12.2020
 */

function setFlags(bass) {
  bass.BASS_SetConfigflags = {
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

  bass.BASS_POSITIONflags = {
    BASS_POS_BYTE: 0, // byte position
    BASS_POS_MUSIC_ORDER: 1, // order.row position, MAKELONG(order,row)
    BASS_POS_OGG: 3, // OGG bitstream number
    BASS_POS_INEXACT: 0x8000000, // flag: allow seeking to inexact position
    BASS_POS_DECODE: 0x10000000, // flag: get the decoding (not playing) position
    BASS_POS_DECODETO: 0x20000000, // flag: decode to the position instead of seeking
    BASS_POS_SCAN: 0x40000000, // flag: scan to the position
  };
  //see http://www.bass.radio42.com/help/html/fdf43f28-d1cd-2951-c126-3ce35edaa7f5.htm for info
  bass.BASSFlags = {
    BASS_SAMPLE_DEFAULT: 0,
    BASS_SAMPLE_8BITS: 1, // 8 bit
    BASS_SAMPLE_MONO: 2, // mono
    BASS_SAMPLE_LOOP: 4, // looped
    BASS_SAMPLE_3D: 8, // 3D functionality
    BASS_SAMPLE_SOFTWARE: 16, // not using hardware mixing
    BASS_SAMPLE_MUTEMAX: 32, // mute at max distance (3D only)
    BASS_SAMPLE_VAM: 64, // DX7 voice allocation & management
    BASS_SAMPLE_FX: 128, // old implementation of DX8 effects
    BASS_SAMPLE_FLOAT: 256, // 32 bit floating-point
    BASS_RECORD_PAUSE: 32768, // Recording: Start the recording paused. Use BASS_ChannelPlay(Int32, Boolean) to start it.
    BASS_RECORD_ECHOCANCEL: 8192, //Recording: enable echo cancellation (only available on certain devices, like iOS).
    BASS_RECORD_AGC: 16384, // Recording: enabled automatic gain control (only available on certain devices, like iOS).
    BASS_SAMPLE_FLOAT: 256, // 32 bit floating-point
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
  const BASS_SPEAKER_FRONT = 0x1000000, // front speakers
    BASS_SPEAKER_REAR = 0x2000000, // rear/side speakers
    BASS_SPEAKER_CENLFE = 0x3000000, // center & LFE speakers (5.1)
    BASS_SPEAKER_REAR2 = 0x4000000, // rear center speakers (7.1)
    BASS_SPEAKER_LEFT = 0x10000000, // modifier: left
    BASS_SPEAKER_RIGHT = 0x20000000; // modifier: right

  bass.BASS_SPEAKERtypes = {
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

  bass.BASS_MIXERsourceflags = {
    BASS_MIXER_BUFFER: 0x2000, // buffer data for BASS_Mixer_ChannelGetData/Level
    BASS_MIXER_LIMIT: 0x4000, // limit mixer processing to the amount available from this source
    BASS_MIXER_MATRIX: 0x10000, // matrix mixing
    BASS_MIXER_PAUSE: 0x20000, // don't process the source
    BASS_MIXER_DOWNMIX: 0x400000, // downmix to stereo/mono
    BASS_MIXER_NORAMPIN: 0x800000, // don't ramp-in the start
  };

  bass.BASS_ChannelGetTagtypes = {
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

  bass.BASS_CHANNELINFOtypes = {
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

  bass.BASS_DEVICEINFOflags = {
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

  bass.BASS_Initflags = {
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

  bass.BASS_ChannelIsActiveAttribs = {
    BASS_ACTIVE_STOPPED: 0,
    BASS_ACTIVE_PLAYING: 1,
    BASS_ACTIVE_STALLED: 2,
    BASS_ACTIVE_PAUSED: 3,
  };

  bass.BASS_ChannelSyncTypes = {
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

  bass.BASS_ChannelAttributes = {
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
    BASS_ATTRIB_BUFFER: 13,
    BASS_ATTRIB_MUSIC_AMPLIFY: 0x100,
    BASS_ATTRIB_MUSIC_PANSEP: 0x101,
    BASS_ATTRIB_MUSIC_PSCALER: 0x102,
    BASS_ATTRIB_MUSIC_BPM: 0x103,
    BASS_ATTRIB_MUSIC_SPEED: 0x104,
    BASS_ATTRIB_MUSIC_VOL_GLOBAL: 0x105,
    BASS_ATTRIB_MUSIC_ACTIVE: 0x106,
    BASS_ATTRIB_MUSIC_VOL_CHAN: 0x200, // + channel #
    BASS_ATTRIB_MUSIC_VOL_INST: 0x300, // + instrument #
    BASS_ATTRIB_TEMPO: 65536,
    BASS_ATTRIB_TEMPO_PITCH: 65537,
    BASS_ATTRIB_TEMPO_FREQ: 65538,
    BASS_ATTRIB_TEMPO_OPTION_USE_AA_FILTER: 65552,
    BASS_ATTRIB_TEMPO_OPTION_AA_FILTER_LENGTH: 65553,
    BASS_ATTRIB_TEMPO_OPTION_USE_QUICKALGO: 65554,
    BASS_ATTRIB_TEMPO_OPTION_SEQUENCE_MS: 65555,
    BASS_ATTRIB_TEMPO_OPTION_SEEKWINDOW_MS: 65556,
    BASS_ATTRIB_TEMPO_OPTION_OVERLAP_MS: 65557,
    BASS_ATTRIB_TEMPO_OPTION_PREVENT_CLICK: 65558,
    BASS_ATTRIB_REVERSE_DIR: 69632,
    BASS_ATTRIB_MIDI_PPQN: 73728,
    BASS_ATTRIB_MIDI_CPU: 73729,
    BASS_ATTRIB_MIDI_CHANS: 73730,
    BASS_ATTRIB_MIDI_VOICES: 73731,
    BASS_ATTRIB_MIDI_VOICES_ACTIVE: 73732,
    BASS_ATTRIB_MIDI_STATE: 73733,
    BASS_ATTRIB_MIDI_SRC: 73734,
    BASS_ATTRIB_MIDI_KILL: 73735,
    BASS_ATTRIB_MIDI_TRACK_VOL: 73984,
    BASS_ATTRIB_OPUS_ORIGFREQ: 77824,
    BASS_ATTRIB_DSD_GAIN: 81920,
    BASS_ATTRIB_DSD_RATE: 81921,
    BASS_ATTRIB_MIXER_LATENCY: 86016,
    BASS_ATTRIB_SPLIT_ASYNCBUFFER: 86032,
    BASS_ATTRIB_SPLIT_ASYNCPERIOD: 86033,
    BASS_SLIDE_LOG: 16777216,
  };

  bass.BASS_Position_modes = {
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

  bass.BASS_ErrorCode = {
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
    BASS_ERROR_NOCD: 12, // No CD in drive
    BASS_ERROR_CDTRACK: 13, // Invalid track number
    BASS_ERROR_ALREADY: 14, // already initialized/paused/whatever
    BASS_ERROR_NOPAUSE: 16, // Not paused
    BASS_ERROR_NOTAUDIO: 17, // Not an audio track
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
    BASS_ERROR_PLAYING: 35, // The channel is playing
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
    BASS_ERROR_WMA_LICENSE: 1000, // some other mystery problem
    BASS_ERROR_WMA_WM9: 1001, // BassWma: WM9 is required
    BASS_ERROR_WMA_DENIED: 1002, // BassWma: access denied (user/pass is invalid)
    BASS_ERROR_WMA_CODEC: 1003, // BassWma: no appropriate codec is installed
    BASS_ERROR_WMA_INDIVIDUAL: 1004, // BassWma: individualization is needed
    BASS_ERROR_ACM_CANCEL: 2000, // BassEnc: ACM codec selection cancelled
    BASS_ERROR_CAST_DENIED: 2100, // BassEnc: Access denied (invalid password)
    BASS_VST_ERROR_NOINPUTS: 3000, // BassVst: the given effect has no inputs and is probably a VST instrument and no effect
    BASS_VST_ERROR_NOOUTPUTS: 3001, // BassVst: the given effect has no outputs
    BASS_VST_ERROR_NOREALTIME: 3002, // BassVst: the given effect does not support realtime processing
    BASS_ERROR_WASAPI: 5000, // BASSWASAPI: no WASAPI available
    BASS_ERROR_MP4_NOSTREAM: 6000, // BASS_AAC: non-streamable due to MP4 atom order ('mdat' before 'moov')
  };

  bass.EncoderNotifyStatus = {
    // Encoder notifications
    BASS_ENCODE_NOTIFY_ENCODER: 1, // encoder died
    BASS_ENCODE_NOTIFY_CAST: 2, // cast server connection died
    BASS_ENCODE_NOTIFY_CAST_TIMEOUT: 0x10000, // cast timeout
    BASS_ENCODE_NOTIFY_QUEUE_FULL: 0x10001, // queue is out of space
    BASS_ENCODE_NOTIFY_FREE: 0x10002, // encoder has been freed
  };

  bass.BASS_Encode_CastGetStatstypes = {
    BASS_ENCODE_STATS_SHOUT: 0, // Shoutcast stats
    BASS_ENCODE_STATS_ICE: 1, // Icecast mount-point stats
    BASS_ENCODE_STATS_ICESERV: 2, // Icecast server stats
  };
  bass.BASS_Encode_Startflags = {
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

  bass.BASS_Encode_CastInitcontentMIMEtypes = {
    BASS_ENCODE_TYPE_MP3: "audio/mpeg",
    BASS_ENCODE_TYPE_OGG: "application/ogg",
    BASS_ENCODE_TYPE_AAC: "audio/aacp",
  };

  bass.BASS_TAGS_FORMAT_STRINGS = {
    SONG_TITLE: "%TITL",
    SONG_ARTIST: "%ARTI",
    ALBUM_NAME: "%ALBM",
    SONG_GENRE: "%GNRE",
    SONG_ALBUM_YEAR: "%YEAR",
    COMMENT: "%CMNT",
    TRACK_NUMBER: "%TRCK", //(may include total track count "track/total");
    COMPOSER: "%COMP",
    COPYRIGHT: "%COPY",
    SUBTITLE: "%SUBT",
    ALBUM_ARTIST: "%AART",
    DISC_NUMBER: "%DISC", //(may include total disc count "disc/total");
    PUBLISHER: "%PUBL",
  };
  bass.BASS_TAGS_FORMAT_CONDITION = {
    IF_NO_X_THEN_A: (x, a) => "%IFV1(" + x + "," + a + ")", //if x is not empty, then this evaluates to a, or to an empty string otherwise;
    IF_X_THEN_A_IF_NOT_THEN_B: (x, a, b) =>
      "%IFV2(" + x + "," + a + "," + b + ")", //if x is not empty, then this evaluates to a, else to b;
    UPPERCASE: (x) => "%IUPC(" + x + ")", //brings x to uppercase
    LOWERCASE: (x) => "%ILWC(" + x + ")", //brings x to lowercase
    CAPITALIZE: (x) => "%ICAP(" + x + ")", //capitalizes first letter in each word of x
    REMOVE_SPACES: (x) => "%ITRM(" + x + ")", //removes beginning and trailing spaces from x;
  };
}

exports = module.exports = setFlags;
