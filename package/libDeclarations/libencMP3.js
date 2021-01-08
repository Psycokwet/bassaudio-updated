/**
 * Created by scarboni on 07.01.2021
 */

const key = "encMP3";

function getFfiFunDeclarations(bass) {
  return {
    BASS_Encode_MP3_GetVersion: ["int", []],
    BASS_Encode_MP3_Start: [
      "int",
      ["int", "string", "int", "pointer", "pointer"],
      ["int", "string", "int", bass.EncodeProcEx.id, "void*"],
    ],
    BASS_Encode_MP3_StartFile: ["int", ["int", "string", "int", "string"]],
  };
}

exports.key = key;
exports.getFfiFunDeclarations = getFfiFunDeclarations;
