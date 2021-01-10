<div align="center">
  <h1>Examples</h1>
  Easy starters to use the package
</div>

<hr />

**[Single_track](https://github.com/Psycokwet/bassaudio-updated/blob/master/examples/single_track.js)**

Play a single track of music, show the relevant vu metter

Usages :

```
node .\single_track.js path/to/music.mp3
```

Example :

```
node .\single_track.js 'Gerudo Valley.mp3'
```

**[microphone](https://github.com/Psycokwet/bassaudio-updated/blob/master/examples/microphone.js)**

Capture the default microphone input and play it directly on the default speaker, show the relevant vu metter

Usages :

```
node .\microphone.js
```

**[microphone](https://github.com/Psycokwet/bassaudio-updated/blob/master/examples/encoder.js)**

Play a single track of music, encode it and stream it to icecast/shoutcast/shoutcast2 server of you choice

Usages :

```
node .\encoder.js path/to/music.mp3 address:port/PUB username:password
```

Example Icecast :

```
node .\encoder.js 'Gerudo Valley.mp3' sv6.myserver.com:8000/mountPoint MySuperPassword
```

Example ShoutCast :

```
node .\encoder.js 'Gerudo Valley.mp3' sv6.myserver.com:8000 MySuperPassword
```

Example ShoutCast2 :

```
node .\encoder.js 'Gerudo Valley.mp3' sv6.myserver.com:8000,1 MyUserName:MySuperPassword
```
