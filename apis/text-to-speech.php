<?php
// header('Content-Type: application/json; charset=utf-8');
//$data_string = '{ "input": { "text": "'.$_GET['texto'].'" }, "voice": { "languageCode": "es-419", "name": "es-ES-Standard-A", "ssmlGender": "FEMALE" }, "audioConfig": { "audioEncoding": "MP3" } }';
$data_string = '{ "audioConfig": { "audioEncoding": "LINEAR16", "effectsProfileId": [ "wearable-class-device" ], "pitch": "-0.40", "speakingRate": "1.07" }, "input": { "text": "'.$_GET['texto'].'" }, "voice": { "languageCode": "es-ES", "name": "es-ES-Standard-A" } }';
$ch = curl_init();
//curl_setopt($ch, CURLOPT_URL,"https://texttospeech.googleapis.com/v1beta1/text:synthesize?fields=audioContent&key=AIzaSyCRwQEhgwaUw7fSancdh0FShk4RyYbCZcc&alt=json");
curl_setopt($ch, CURLOPT_URL,"https://texttospeech.googleapis.com/v1beta1/text:synthesize?fields=audioContent&key=AIzaSyCRwQEhgwaUw7fSancdh0FShk4RyYbCZcc&alt=json");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
    'Content-Type: application/json',                                                                                
    'Content-Length: ' . strlen($data_string))                                                                       
);                                                    
$server_output = curl_exec ($ch);
//print_r($server_output);
curl_close ($ch);
$respuesta = json_decode( $server_output );
//file_put_contents('audio.mp3', base64_decode($respuesta->audioContent));
?> 
<!--<video id="sonidoEspanola" controls autoplay>-->
<!--    <source autoplay="true" type="audio/mpeg" src="data:audio/mpeg;base64,<?=$respuesta->audioContent?>" >-->
<!--</video>    -->
<?php
echo '<audio id="sonidoEspanola" type="audio/mpeg" src="data:audio/mpeg;base64,'.($respuesta->audioContent).'"  autoplay controls ></audio>';
// echo '<script type="text/javascript" >';
// echo 'sonidoEspanola.load();';
// echo 'setTimeout( function(){ sonidoEspanola.play(); }, 5000 );';
// echo '</script>';
// echo '<script type="text/javascript" >';
// echo 'document.getElementById("sonidoEspanola").play(); ';
// echo '</script>';
?>
<script type="text/javascript" >
document.getElementById("sonidoEspanola").addEventListener('canplaythrough', reproducirsonido, false);
function reproducirsonido() {
  console.log( document.getElementById("sonidoEspanola") );
  try {
      document.getElementById("sonidoEspanola").play();
  }
  catch(e) {
      try {
      document.getElementById("sonidoEspanola").play();
  }
  catch(e) {
  try {
      document.getElementById("sonidoEspanola").play();
  }
  catch(e) {
  try {
      document.getElementById("sonidoEspanola").play();
  }
  catch(e) {
  
  }
  }
  }
  
  }
}

</script>