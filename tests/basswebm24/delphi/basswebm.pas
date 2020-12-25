{
  BASSWEBM 2.4 Delphi unit
  Copyright (c) 2018-2019 Un4seen Developments Ltd.

  See the BASSWEBM.CHM file for more detailed documentation
}

unit BassHLS;

interface

{$IFDEF MSWINDOWS}
uses BASS, Windows;
{$ELSE}
uses BASS;
{$ENDIF}

const
  // Additional error codes returned by BASS_ErrorGetCode
  BASS_ERROR_NOTAUDIO          = 17;
  BASS_ERROR_WEBM_TRACK        = 8000;

  // Additional tag types
  BASS_TAG_WEBM                = $15000; // file tags : series of null-terminated UTF-8 strings
  BASS_TAG_WEBM_TRACK          = $15001; // track tags : series of null-terminated UTF-8 strings

  // Additional attributes
  BASS_ATTRIB_WEBM_TRACK       = $16000;
  BASS_ATTRIB_WEBM_TRACKS      = $16001;

const
{$IFDEF MSWINDOWS}
  basswebmdll = 'basswebm.dll';
{$ENDIF}
{$IFDEF LINUX}
  basswebmdll = 'libbasswebm.so';
{$ENDIF}
{$IFDEF MACOS}
  basswebmdll = 'libbasswebm.dylib';
{$ENDIF}

function BASS_WEBM_StreamCreateFile(mem:BOOL; fl:pointer; offset,length:QWORD; flags,track:DWORD): HSTREAM; {$IFDEF MSWINDOWS}stdcall{$ELSE}cdecl{$ENDIF}; external basswebmdll;
function BASS_WEBM_StreamCreateURL(url:PChar; flags:DWORD; proc:DOWNLOADPROC; user:Pointer; track:DWORD): HSTREAM; {$IFDEF MSWINDOWS}stdcall{$ELSE}cdecl{$ENDIF}; external basswebmdll;
function BASS_WEBM_StreamCreateFileUser(system,flags:DWORD; var procs:BASS_FILEPROCS; user:Pointer; track:DWORD): HSTREAM; {$IFDEF MSWINDOWS}stdcall{$ELSE}cdecl{$ENDIF}; external basswebmdll;

implementation

end.