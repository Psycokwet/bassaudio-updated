/**
 * Created by scarboni on 21.12.2020
 */

const ref = require("ref-napi");
const Struct = require("ref-struct-di")(ref);

class refBuilder {
  constructor(id, content, libid) {
    this.id = id;
    this.libid = libid;
    this.content = content;
    this.struct = content;
    this.refType = ref.refType(content);
    return this;
  }
  getRefType() {
    return this.refType;
  }
  generateNewObject(args) {
    return new this.struct(args);
  }
}

function setStructs(bass) {
  // Originals types
  //   char *name;
  //   char *driver;
  //   DWORD flags;

  var structs = {};
  structs.BASS_DEVICEINFO = Struct({
    name: "string",
    driver: "string",
    flags: "int",
  });
  structs.BASS_DEVICEINFO.libid = "bass";

  // Originals types
  //     DWORD flags;
  //     DWORD hwsize;
  //     DWORD hwfree;
  //     DWORD freesam;
  //     DWORD free3d;
  //     DWORD minrate;
  //     DWORD maxrate;
  //     BOOL eax;
  //     DWORD minbuf;
  //     DWORD dsver;
  //     DWORD latency;
  //     DWORD initflags;
  //     DWORD speakers;
  //     DWORD freq;

  structs.BASS_INFO = Struct({
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
  structs.BASS_INFO.libid = "bass";

  // Originals types
  //   DWORD flags;
  //   DWORD formats;
  //   DWORD inputs;
  //   BOOL singlein;
  //   DWORD freq;

  structs.BASS_RECORDINFO = Struct({
    flags: "int",
    formats: "int",
    inputs: "int",
    singlein: "bool",
    freq: "int",
  });
  structs.BASS_RECORDINFO.libid = "bass";

  structs.BASS_CHANNELINFO = Struct({
    freq: "int",
    chans: "int",
    flags: "int",
    ctype: "int",
    origres: "int",
    plugin: "int",
    sample: "int",
    filename: "string",
  });
  structs.BASS_CHANNELINFO.libid = "bass";

  // Originals types
  //     char id[3];
  //     char title[30];
  //     char artist[30];
  //     char album[30];
  //     char year[4];
  //     char comment[30];
  //     BYTE genre;
  structs.TAG_ID3 = Struct({
    id: "string",
    title: "string",
    artist: "string",
    album: "string",
    year: "string",
    comment: "string",
    genre: "byte",
  });
  structs.TAG_ID3.libid = "bass";

  for (let prop in structs)
    bass[prop] = new refBuilder(prop, structs[prop], structs[prop].libid);
}

exports = module.exports = setStructs;
