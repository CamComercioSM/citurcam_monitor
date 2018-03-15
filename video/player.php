<video id="videoPlayer" style="width: 100%;height: 97%;object-fit: cover;" 
        src="/video/Ponte_Las_Pilas_Renueva_tu_Matrcula_Mercantil_antes_de_31_de_Marzo(youtube.com).mp4" />
<script type="text/javascript">
var nextVideo = ["/video/ccms_plantilla_marzo_2018.mp4.mp4","/video/Ponte_Las_Pilas_Renueva_tu_Matrcula_Mercantil_antes_de_31_de_Marzo(youtube.com).mp4"];
var videoPlayer = document.getElementById('videoPlayer');
videoPlayer.autoplay = true;
var vActual = 0;
videoPlayer.onended = function(){
    videoPlayer.volume = 0.5;
    videoPlayer.src = nextVideo[vActual];
    vActual++;
    if(vActual >= nextVideo.length) vActual = 0;
}
</script>
