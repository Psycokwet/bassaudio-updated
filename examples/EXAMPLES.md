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

**[single_track_with_addons](https://github.com/Psycokwet/bassaudio-updated/blob/master/examples/single_track_with_addons.js)**

Play a single track of music, show the relevant vu metter, working for flac, and other addons...
Depending on usage, it may not make a lot a differencies, but for example, il you compare for a .flac, between this example, and the one above, without the addons, you may observe a difference in position exactitude.
single_track output :
volume:  100
vumeter : left: 126 / right: 154.00192260742188
position : 0.991904761904762 / 170
vumeter : left: 462 / right: 362.0070495605469
vumeter : left: 510 / right: 749.0077819824219
position : 1.9919954648526077 / 170
volume:  20
vumeter : left: 2759 / right: 1971.0420989990234
vumeter : left: 1364 / right: 1346.0208129882812

single_track_with_addons output :
volume:  100
vumeter : left: 126 / right: 154.00192260742188
position : 0.992312925170068 / 170.24
vumeter : left: 462 / right: 362.0070495605469
vumeter : left: 510 / right: 749.0077819824219
volume:  20
position : 8 / 170.24
vumeter : left: 2759 / right: 1971.0420989990234
vumeter : left: 1394 / right: 1346.0212707519531

Both reading the exact same .flac file.

Usages :

```
node .\single_track_with_addons.js path/to/music.mp3
```

Example :

```
node .\single_track_with_addons.js 'Gerudo Valley.flac'
```

**[microphone](https://github.com/Psycokwet/bassaudio-updated/blob/master/examples/microphone.js)**

Capture the default microphone input and play it directly on the default speaker, show the relevant vu metter

Usages :

```
node .\microphone.js
```

**[Encoder](https://github.com/Psycokwet/bassaudio-updated/blob/master/examples/encoder.js)**

Play a single track of music, encode it and stream it to icecast/shoutcast/shoutcast2 server of your choice

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
