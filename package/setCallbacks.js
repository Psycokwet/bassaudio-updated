/**
 * Created by scarboni on 21.12.2020
 */

const ref = require("ref-napi");
const ffi = require("ffi-napi");

class callbackBuilder {
  constructor(id, ffiFunDeclaration) {
    this.id = id;
    this.ffiFunDeclaration = ffiFunDeclaration;
    return this;
  }
  generateNewObject(callback) {
    if (!callback) return null;
    return ffi.Callback(...this.ffiFunDeclaration, callback);
  }
}

function setCallbacks(bass) {
  var callbacks = {};

  //   DWORD CALLBACK StreamProc(
  //     HSTREAM handle,
  //     void *buffer,
  //     DWORD length,
  //     void *user
  // );

  callbacks.StreamProc = [
    "void",
    ["int", ref.types.void, "int", ref.types.void],
  ];

  //   void CALLBACK DownloadProc(
  //     const void *buffer,
  //     DWORD length,
  //     void *user
  // );

  callbacks.DownloadProc = ["void", ["long", "long", ref.types.void]];

  //   void CALLBACK SyncProc(
  //     HSYNC handle,
  //     DWORD channel,
  //     DWORD data,
  //     void *user
  // );

  callbacks.SyncProc = ["void", ["int", "int", "int", ref.types.void]];

  //   BOOL CALLBACK RecordProc(
  //     HRECORD handle,
  //     const void *buffer,
  //     DWORD length,
  //     void *user
  // );

  callbacks.RecordProc = [
    "void",
    ["int", ref.types.void, "int", ref.types.void],
  ];

  //   void CALLBACK EncodeProc(
  //     HENCODE handle,
  //     DWORD channel,
  //     const void *buffer,
  //     DWORD length,
  //     void *user
  // );
  callbacks.EncodeProc = [
    "void",
    ["int", "int", ref.types.void, "int", ref.types.void],
  ];

  //   void CALLBACK EncodeNotifyProc(
  //     HENCODE handle,
  //     DWORD status,
  //     void *user
  // );
  callbacks.EncodeNotifyProc = ["void", ["int", "int", ref.types.void]];

  for (let prop in callbacks) {
    bass[prop] = new callbackBuilder(prop, callbacks[prop]);
  }
}

exports = module.exports = setCallbacks;
