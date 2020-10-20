// Type definitions for ref-array-napi
// Project: https://github.com/Janealter/ref-array-napi
// Definitions by: goooseman <https://github.com/goooseman>
// Used definitions by: Paul Loyd <https://github.com/loyd>
// TypeScript Version: 3.7

import ref = require('ref-napi');

interface ArrayTypeInstance<T> {
  [i: number]: T;
  length: number;
  toArray(): T[];
  toJSON(): T[];
  inspect(): string;
  buffer: Buffer;
  ref(): Buffer;
}

interface ArrayType<T> extends ref.Type {
  BYTES_PER_ELEMENT: number;
  fixedLength: number;
  /** The reference to the base type. */
  type: ref.Type;

  /**
   * Accepts a Buffer instance that should be an already-populated with data
   * for the ArrayType. The "length" of the Array is determined by searching
   * through the buffer's contents until an aligned NULL pointer is encountered.
   */
  untilZeros(buffer: Buffer): ArrayTypeInstance<T>;

  new (length?: number): ArrayTypeInstance<T>;
  new (data: number[], length?: number): ArrayTypeInstance<T>;
  new (data: Buffer, length?: number): ArrayTypeInstance<T>;
  (length?: number): ArrayTypeInstance<T>;
  (data: number[], length?: number): ArrayTypeInstance<T>;
  (data: Buffer, length?: number): ArrayTypeInstance<T>;
}

/**
 * The array type meta-constructor.
 * The returned constructor's API is highly influenced by the WebGL
 * TypedArray API.
 */
declare const ArrayType: {
  <T>(type: ref.Type, length?: number): ArrayType<T>;
  <T>(type: string, length?: number): ArrayType<T>;
};

export = ArrayType;
