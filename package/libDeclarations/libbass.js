/**
 * Created by scarboni on 25.12.2020
 */

const key = "bass";

function getFfiFunDeclarations(bass) {
  return {
    BASS_Init: ["bool", ["int", "int", "int", "int", "int"]],
    BASS_GetVersion: ["int", []],
    BASS_StreamCreate: [
      "int",
      ["int", "int", "int", "pointer", "int64"],
      ["int", "int", "int", bass.StreamProc.id, "int64"],
    ],
    BASS_StreamCreateFile: ["int", ["bool", "string", "int64", "int64", "int"]],
    BASS_StreamCreateURL: [
      "int",
      ["string", "int", "int", "pointer", "pointer"],
      ["string", "int", "int", bass.DownloadProc.id, "void*"],
    ],
    BASS_ChannelPlay: ["bool", ["int", "bool"]],
    BASS_ChannelStop: ["bool", ["int"]],
    BASS_ChannelPause: ["bool", ["int"]],
    BASS_ChannelGetPosition: ["int64", ["int", "int"]],
    BASS_ChannelSetPosition: ["bool", ["int", "int64", "int"]],
    BASS_ChannelGetLength: ["int64", ["int", "int"]],
	BASS_PluginLoad: ["int", ["string", "int"]],
	BASS_StreamPutData: ["int", ["int", "pointer", "int64"]],
    BASS_ChannelBytes2Seconds: ["double", ["int", "int64"]],
    BASS_ChannelSeconds2Bytes: ["int64", ["int", "double"]],
    BASS_ChannelGetLevel: ["int", ["int"]],
    BASS_ChannelRemoveSync: ["bool", ["int", "int"]],
    BASS_ChannelIsActive: ["int", ["int"]],
    BASS_ChannelSetAttribute: ["bool", ["int", "int", "float"]],
    BASS_ChannelGetAttribute: ["bool", ["int", "int", "pointer"]],
    BASS_ChannelSetSync: [
      "int",
      ["int", "int", "int64", "pointer", "pointer"],
      ["int", "int", "int64", bass.SyncProc.id, "void*"],
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
    BASS_GetInfo: ["bool", [bass.BASS_INFO.getRefType()], [bass.BASS_INFO.id]],
    BASS_ErrorGetCode: ["int", []],
    BASS_Free: ["bool", []],
    BASS_GetCPU: ["float", []],
    BASS_GetDevice: ["int", []],
    BASS_GetDeviceInfo: [
      "bool",
      ["int", bass.BASS_DEVICEINFO.getRefType()],
      ["int", bass.BASS_DEVICEINFO.id],
    ],
    BASS_ChannelGetTags: ["string", ["int", "int"]],
    BASS_ChannelGetInfo: [
      "bool",
      ["int", bass.BASS_CHANNELINFO.getRefType()],
      ["int", bass.BASS_CHANNELINFO.id],
    ],
    BASS_SetConfig: ["bool", ["int", "int"]],
    BASS_GetConfig: ["int", ["int"]],
    BASS_Update: ["bool", ["int"]],
    BASS_ChannelUpdate: ["bool", ["int", "int"]],
    BASS_RecordFree: ["bool", []],
    BASS_RecordGetDevice: ["int", []],
    BASS_RecordGetDeviceInfo: [
      "bool",
      ["int", bass.BASS_RECORDINFO.getRefType()],
      ["int", bass.BASS_RECORDINFO.id],
    ],
    BASS_RecordGetInfo: [
      "bool",
      [bass.BASS_RECORDINFO.getRefType()],
      [bass.BASS_RECORDINFO.id],
    ],
    BASS_RecordGetInput: ["int", ["int", "float"]],
    BASS_RecordGetInputName: ["string", ["int"]],
    BASS_RecordInit: ["bool", ["int"]],
    BASS_RecordSetDevice: ["bool", ["int"]],
    BASS_RecordSetInput: ["bool", ["int", "int", "float"]],
    BASS_RecordStart: [
      "int",
      ["int", "int", "long", "pointer", "int64"],
      ["int", "int", "long", bass.RecordProc.id, "int64"],
    ],
  };
}
exports.key = key;
exports.getFfiFunDeclarations = getFfiFunDeclarations;
