<html>
<head>
  <meta charset="utf-8">
  <title>Html5 local file api tut</title>
  <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  
  <link href="//cdnjs.cloudflare.com/ajax/libs/foundation/5.3.3/css/foundation.min.css" rel="stylesheet" />
  
</head>
<body>

<div id="reproductor" >
    <div id="preview" ></div>
    <div id="data-vid" ></div>
    <video id="reproductor-video" width="200" height="200"  style="border: thin black solid;" 
        autoplay autobuffer playsinline controls ></video>
</div>   

<input type="file" id="the-video-file-field" multiple >

<script type="text/javascript" >

var listadoArchivos = [
    "C:\\Users\\coord.desarrollo\\Videos"
];

$("#the-video-file-field").change(function() {
    var file;
    for( var i in this.files){
        if( this.files[i].type ){
            console.log(this.files[i].type);
            file = this.files[i];
            renderVideo(file);
        }
    }
});  

var siguiente = 0;
var archivos = new Array();
function controlReproducion(){
    var videoPlayer = document.getElementById('reproductor-video');
    videoPlayer.onended = function(){
        var nextVideo = archivos[siguiente];
        videoPlayer.src = nextVideo;
        siguiente++;
        if(siguiente >= archivos.length){
            siguiente = 0;
        }
    }
}


function renderVideo(file) {
    var reader = new FileReader();
    reader.onload = function(event) {
        the_url = event.target.result
        archivos.push(event.target.result);
        $('#data-vid').append("")
        $('#reproductor-video').append("<source src='" + the_url + "' type='video/mp4'>");
        
        console.log("______________________________________");
        console.log("archivos cargados");
        console.log(archivos);
    }
    reader.readAsDataURL(file);
    
}
    
$( document ).ready(function() {
    controlReproducion();    
}); 
</script>
    
    
    


    
  <!--<script type="text/javascript" src="/js/reproductor.js"></script>-->
</body>
</html>