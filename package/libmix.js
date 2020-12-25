/**
 * Created by scarboni on 25.12.2020
 */

const key = "mix";

function getFfiFunDeclarations(bass) {
  return {
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
      ["int", "int", "int64", "pointer", "pointer"],
      ["int", "int", "int64", bass.SyncProc.id, "void*"],
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
}
exports.key = key;
exports.getFfiFunDeclarations = getFfiFunDeclarations;
