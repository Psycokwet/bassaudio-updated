**Un4Seen Bass Audio Library Wrapper**
[Bass Audio library](http://www.un4seen.com) is the best audio library to play, edit, convert, stream etc. 
this wrapper wraps most of the "audio playback" features using [ffi](https://www.npmjs.com/package/ffi) , [ref](https://www.npmjs.com/package/ref) , [ref-struct](https://www.npmjs.com/package/ref-struct) .
ffi enables to call c library methods, properties , callbacks etc. 

**Warning** Please put the required bass audio library files to root
folder (dll files for windows, so files for *nix, dylib files for macos)

Download the required dll files from
[http://www.un4seen.com](http://www.un4seen.com). 
i did not include the required files in this module..

Read full documentation of bass from its original help. 
i Will only write same simple examples.

**Features:**
- BASS_Init
- BASS_GetVersion
- BASS_StreamCreateFile
- BASS_StreamCreateURL
- BASS_StreamFree
- BASS_ChannelPlay
- BASS_ChannelStop
- BASS_ChannelPause
- BASS_ChannelGetPosition
- BASS_ChannelSetPosition
- BASS_ChannelGetLength
- BASS_ChannelBytes2Seconds
- BASS_ChannelSeconds2Bytes
- BASS_ChannelGetLevel
- BASS_ChannelRemoveSync
- BASS_ChannelIsActive
- BASS_ChannelSetAttribute
- BASS_ChannelGetAttribute
- BASS_ChannelSetSync
- BASS_ChannelSlideAttribute
- BASS_ChannelIsSliding
- BASS_ChannelGetDevice
- BASS_ChannelSetDevice
- BASS_StreamFree
- BASS_SetDevice
- BASS_SetVolume
- BASS_Start
- BASS_Stop
- BASS_Pause
- BASS_GetInfo
- BASS_ErrorGetCode
- BASS_Free
- BASS_GetCPU
- BASS_GetDevice
- BASS_GetDeviceInfo
- BASS_ChannelGetTags

**Extra:** 
SYNCPROC also implemented

**Installation**
Install with npm :
`npm install bassaudio`

**Examples**


**basic load and play file** 
```javascript
var bass=require('bassaudio'); 
var basslib=new bass();
 
 //get all sound cards
 var cards=basslib.getDevices();
 console.log('total found sound cards:' + cards.length)
 //lets print first sound card's info, find out more inside source code..
 //first item in array '[0]' is "no sound" , then use the item [1]
 //you will see that card isInitialized will be false, because we did not init it yet..
 var card=cards[1];
 console.log(card.name + ' is enabled:' + card.enabled + ' ,IsDefault:' + card.IsDefault + ' , IsInitialized:' + card.IsInitialized + ' ,typeSpeakers:' + card.typeSpeakers)
 
// [device],[freq],[flags] , -1 is default sound card
var result=basslib.BASS_Init(-1,44100,basslib.BASS_Initflags.BASS_DEVICE_STEREO)
if(!result){
  console.log('error init sound card:' + basslib.BASS_ErrorGetCode())
}

console.log("first card is init?:" + basslib.getDevice(1).IsInitialized)

// isMemoryFile,filename,offset,length,flags, returns pointer of file
var chan=basslib.BASS_StreamCreateFile(0,'c:\\mp3\\test.mp3',0,0,0)
if(basslib.BASS_ErrorGetCode()!=basslib.BASS_ErrorCode.BASS_OK){
  console.log('error opening file:' + basslib.BASS_ErrorGetCode())
}

//lets play
//channel,restart   , returns  (also there are stop , pause commands) 
var success=basslib.BASS_ChannelPlay(chan,-1)
if(!success){
  console.log('error playing file:' + basslib.BASS_ErrorGetCode())
}
```

**Get Duration**
```javascript
//get the duration, bass returns the total bytes of the channel pointer, then we must convert it to seconds :) 
var durationInBytes= basslib.BASS_ChannelGetLength(chan,0)
var durationInSeconds=basslib.BASS_ChannelBytes2Seconds(chan,durationInBytes)
```

**Get Volume of channel**
```javascript
//get the volume
//first get the byte position of volume from attribute
var volume=0;
basslib.BASS_ChannelGetAttribute(chan,basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL,volume);
```
**Set Volume**
```javascript
//lets set to 0.3
basslib.BASS_ChannelSetAttribute(chan,basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL,0.3)
```

**Get current Position of playback**
```javascript
var positionInBytes= basslib.BASS_ChannelGetPosition(chan,0);
//now convert it to seconds
var position=basslib.BASS_ChannelBytes2Seconds(chan,positionInBytes);
```

**Set Position**
```javascript
//first get the byte position of desired seconds (ex:to last 10 seconds
var Last10SecondsBytePos=basslib.BASS_ChannelSeconds2Bytes(chan,durationInSeconds-10);
basslib.BASS_ChannelSetPosition(chan,Last10SecondsBytePos);
```

**Is channel is playing?**
```javascript
var result=basslib.BASS_ChannelIsActive(chan)
if(result==basslib.BASS_ChannelIsActiveAttribs.BASS_ACTIVE_PLAYING){
  console.log('channel is playing')
}

```

**sliding**
```javascript
//Lets slide volume to 0 in 3 seconds (3000 milliseconds)
basslib.BASS_ChannelSlideAttribute(chan,basslib.BASS_ChannelAttributes.BASS_ATTRIB_VOL,0,3000)
```

**callback**
```javascript
//lets make a callback when position reaches to 20. seconds.
var Pos20SecondsBytePos=basslib.BASS_ChannelSeconds2Bytes(chan,20);
var proc20SecondsID=basslib.BASS_ChannelSetSync(chan,basslib.BASS_ChannelSyncTypes.BASS_SYNC_POS,Pos20SecondsBytePos,function(handle,channel,data,user){
   if(handle==proc20SecondsID){ 
      console.log('position reached to the 20 seconds..')
   }
})

//lets get the event when the position reaches to end
var procTOENDID=basslib.BASS_ChannelSetSync(chan,basslib.BASS_ChannelSyncTypes.BASS_SYNC_END,0,function(handle,channel,data,user){
   if(handle==procTOENDID){ 
      console.log('playback finished..')
   }
})
```

**vumeter**
```javascript
//lets get vumeter :)
 var levels=basslib.BASS_ChannelGetLevel(chan);
 //its a 64 bit value, lets get lo and hiwords
 var rightlevel=basslib.toFloat64(levels)[0]
var leftlevel=basslib.toFloat64(levels)[1]
```

**close the file**
```javascript
if(basslib.BASS_ChannelIsActive(chan)==basslib.BASS_ChannelIsActiveAttribs.BASS_ACTIVE_PLAYING){
  //stop the channel
  basslib.BASS_ChannelStop(chan);
  }

  var result=basslib.BASS_StreamFree(chan)
  if(!result){
    console.log('stream free error:' + basslib.BASS_ErrorGetCode())
  }
```  

  **change sound card**
```javascript
  //first check if this sound card is initialized
  var soundCardIndex=1;
  var info=basslib.getDevice(soundCardIndex);
  if(!info.enabled){
    console.log('this device is not enabled')
  }
  if(!info.IsInitialized){
        var result= basslib.BASS_Init(soundCardIndex,44100,basslib.BASS_Initflags.BASS_DEVICE_STEREO);
        if(result!=basslib.BASS_ErrorCode.BASS_OK){
          console.log('error init sound card:' + basslib.BASS_ErrorGetCode())
        }
  }
  var success=basslib.BASS_ChannelSetDevice(chan,soundCardIndex)
  if(!success){
      console.log('error init sound card:' + basslib.BASS_ErrorGetCode())
   }
 ``` 
   
 **Free the memory from bass**  
```javascript
   basslib.BASS_Free();
```



**Whats Next?**
- adding mixer addon
- adding encoder addon


**NOTICE**
i only added methods, properties what i needed.. add yours to the code or send me mail.. 