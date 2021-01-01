/**
 * Created by scarboni on 21.12.2020
 */

const ref = require("ref-napi");
const ffi = require("ffi-napi");

class callbackBuilder {
  constructor(id, ffiFunDeclaration, libid) {
    this.id = id;
    this.ffiFunDeclaration = ffiFunDeclaration;
    this.libid = libid;
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

  callbacks.StreamProc = ["void", ["int", "pointer", "int", "pointer"]];
  callbacks.StreamProc.libid = "bass";

  //   void CALLBACK DownloadProc(
  //     const void *buffer,
  //     DWORD length,
  //     void *user
  // );

  callbacks.DownloadProc = ["void", ["pointer", "long", "pointer"]];
  callbacks.DownloadProc.libid = "bass";

  //   void CALLBACK SyncProc(
  //     HSYNC handle,
  //     DWORD channel,
  //     DWORD data,
  //     void *user
  // );

  callbacks.SyncProc = ["void", ["int", "int", "int", "pointer"]];
  callbacks.SyncProc.libid = "bass";

  //   BOOL CALLBACK RecordProc(
  //     HRECORD handle,
  //     const void *buffer,
  //     DWORD length,
  //     void *user
  // );

  callbacks.RecordProc = ["void", ["int", "pointer", "int", "pointer"]];
  callbacks.RecordProc.libid = "bass";

  //   void CALLBACK EncodeProc(
  //     HENCODE handle,
  //     DWORD channel,
  //     const void *buffer,
  //     DWORD length,
  //     void *user
  // );
  callbacks.EncodeProc = ["void", ["int", "int", "pointer", "int", "pointer"]];
  callbacks.EncodeProc.libid = "bassenc";

  //   void CALLBACK EncodeNotifyProc(
  //     HENCODE handle,
  //     DWORD status,
  //     void *user
  // );
  callbacks.EncodeNotifyProc = ["void", ["int", "int", "pointer"]];
  callbacks.EncodeNotifyProc.libid = "bassenc";

  for (let prop in callbacks) {
    bass[prop] = new callbackBuilder(
      prop,
      callbacks[prop],
      callbacks[prop].libid
    );
  }
}

exports = module.exports = setCallbacks;
