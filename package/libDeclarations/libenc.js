/**
 * Created by scarboni on 25.12.2020
 */

const key = "encoder";

function getFfiFunDeclarations(bass) {
  return {
    BASS_Encode_Start: [
      "int",
      ["int", "string", "int", "pointer", "pointer"],
      ["int", "string", "int", bass.EncodeProc.id, "void*"],
    ],
    BASS_Encode_IsActive: ["int", ["int"]],
    BASS_Encode_SetNotify: [
      "bool",
      ["int", "pointer", "pointer"],
      ["int", bass.EncodeNotifyProc.id, "pointer"],
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
}

exports.key = key;
exports.getFfiFunDeclarations = getFfiFunDeclarations;
