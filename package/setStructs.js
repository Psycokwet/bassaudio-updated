/**
 * Created by scarboni on 21.12.2020
 */

const chalk = require("chalk");

const ref = require("ref-napi");
const path = require("path");
const Struct = require("ref-struct-di")(ref);
const ArrayType = require("ref-array-di")(ref);

class refBuilder {
  constructor(id, content) {
    this.id = id;
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

  structs.ID3V1Tag = Struct({
    id: "string",
    title: "string",
    artist: "string",
    album: "string",
    year: "string",
    comment: "string",
    genre: "byte",
  });
  for (let prop in structs) {
    bass[prop] = new refBuilder(prop, structs[prop]);
  }
}

exports = module.exports = setStructs;
