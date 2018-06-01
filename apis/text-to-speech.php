<?php
// header('Content-Type: application/json; charset=utf-8');
$data_string = '{ "input": { "text": "'.$_GET['texto'].'" }, "voice": { "languageCode": "es-419", "name": "es-ES-Standard-A", "ssmlGender": "FEMALE" }, "audioConfig": { "audioEncoding": "MP3" } }';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,"https://texttospeech.googleapis.com/v1beta1/text:synthesize?fields=audioContent&key=AIzaSyCRwQEhgwaUw7fSancdh0FShk4RyYbCZcc&alt=json");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
    'Content-Type: application/json',                                                                                
    'Content-Length: ' . strlen($data_string))                                                                       
);                                                    
$server_output = curl_exec ($ch);
curl_close ($ch);
$respuesta = json_decode( $server_output );
// file_put_contents('audio.mp3', base64_decode($respuesta->audioContent));
echo '<audio src="data:audio/mpeg;base64,'.($respuesta->audioContent).'"  autoplay="autoplay" controls volume="100" ></audio>';