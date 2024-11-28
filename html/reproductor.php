<div  id="modal-saludo" class="modal fade " tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="margin:auto; width: 100vw; height: 100vh; " >
    <div class="modal-dialog modal-lg" role="document"  style="margin:auto; width: 100vw; height: 100vh; " >
        <div id="saludo" class="modal-content"  style="margin:auto; width: 100vw; height: 100vh; " >
      <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
            <div id="player"   style="margin:auto; width: 100vw; height: 100vh; "></div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function () {
            $('#modal-saludo').modal('show');
    });
    // 2. This code loads the IFrame Player API code asynchronously.

    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                    origin: "https://monitor.citurcam.com/",
                    height: '100vh',
                    width: '100%',
                    videoId: '5BtFJXWWplY',
                    playerVars: {
                            'origin': "https://monitor.citurcam.com/",
                            'playsinline': 1,
                            'controls': 0
                    },
                    events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                    }
            });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
            player.setVolume(10);
            event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.PLAYING && !done) {
                    setTimeout(stopVideo, 12500);
                    done = true;
            }
    }
    function stopVideo() {
            player.stopVideo();
            $('#modal-saludo').modal('hide');
            $('#modal-saludo').html("");
    }
</script>