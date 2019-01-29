<audio id="myAudioElement" controls></audio>
<script type="text/javascript" >
    var audio = document.getElementById('myAudioElement') || new Audio();
    //console.log(audio);
    var xhr = new XMLHttpRequest();
    xhr.onload = function(evt) {
        
      var blob = new Blob([xhr.response], {type: 'audio/mp3'});
      //console.log(blob);
      var objectUrl = window.URL.createObjectURL(blob);
      audio.src = objectUrl;
      // Release resource when it's loaded
      audio.onload = function(evt) {
        window.URL.revokeObjectUrl(objectUrl);
      };
      audio.play();
    };
    var data = JSON.stringify({text:'en la juega careverga'});
    xhr.open('POST', encodeURI('test-speech.php'), true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'blob';
    xhr.send(data);
</script>