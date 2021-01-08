/**
 * Created by scarboni on 25.12.2020
 */

const key = "tags";
const dep = "bass";

function getFfiFunDeclarations(bass) {
  return {
    TAGS_GetVersion: ["int", []],
    TAGS_Read: ["string", ["int", "string"]], //handle, fmt
    TAGS_ReadEx: ["string", ["int", "string", "int", "int"]], // handle, fmt, tagtype, codepage
    TAGS_SetUTF8: ["bool", ["bool"]], // enable
    TAGS_GetLastErrorDesc: ["string", []],
  };
}
exports.dep = dep;
exports.key = key;
exports.getFfiFunDeclarations = getFfiFunDeclarations;
