<?php
// print_r($_POST);
$velocidad = intval(isset($_POST['tiempoPasosCarrusel']) ? $_POST['tiempoPasosCarrusel'] : 5080); //En segundos
$pausa = intval(isset($_POST['tiempoEntrePasos']) ? $_POST['tiempoEntrePasos'] : 1080); //En segundos
$tiempoConsulta = intval(isset($_POST['tiempoConsulta']) ? $_POST['tiempoConsulta'] : 1080); //En segundos
$tiempoPresentacion = intval(isset($_POST['tiempoTurno']) ? $_POST['tiempoTurno'] : 5080); //En segundos
$AreasTrabajo = ( isset($_POST['puestosSeleccionados']) ? $_POST['puestosSeleccionados'] : null );
$altoPantalla = intval(isset($_POST['altoPantalla']) ? $_POST['altoPantalla'] : 1080);
$anchoPantalla = intval(isset($_POST['anchoPantalla']) ? $_POST['anchoPantalla'] : 1920);
$modulosEnVista = intval(isset($_POST['modulosEnVista']) ? $_POST['modulosEnVista'] : 1);
$pasosEnVista = intval(isset($_POST['pasosEnVista']) ? $_POST['pasosEnVista'] : 1);
$altoTurnosLlamando = intval($altoPantalla * 0.20);
$anchoTurnosLlamando = intval(($anchoPantalla * 0.9) / 4);
$altoTurnosAtendiendo = intval($altoPantalla * 0.14);
$anchoTurnosAtendiendo = intval(($anchoPantalla * 0.9) / 4);

$tamanoLetrasNombreTurno = intval(isset($_POST['tamanoLetrasNombreTurno']) ? $_POST['tamanoLetrasNombreTurno'] : 120);
$tamanoLetrasNombreModulo = intval(isset($_POST['tamanoLetrasNombreModulo']) ? $_POST['tamanoLetrasNombreModulo'] : 165);
$tamanoLetrasTurnoModulo = intval(isset($_POST['tamanoLetrasTurnoModulo']) ? $_POST['tamanoLetrasTurnoModulo'] : 150);
$tamanoLetrasCodigoModulo = intval(isset($_POST['tamanoLetrasCodigoModulo']) ? $_POST['tamanoLetrasCodigoModulo'] : 150);
?>
<style type="text/css">

    .area-publicidad {
        float: right;
        width: 55%;
    }

    .borde-izq {
        float: left;
        width: <?= $anchoTurnosAtendiendo / 4 ?>px;
        height: <?= $altoTurnosAtendiendo ?>px;
    }
    .borde-der {
        float: right;
        width: <?= $anchoTurnosAtendiendo / 4 ?>px;
        height: <?= $altoTurnosAtendiendo ?>px;
    }
    .borde-der img, .borde-izq img {
        width: <?= $anchoTurnosAtendiendo / 4 ?>px;
        height: <?= $altoTurnosAtendiendo ?>px;
    }


    .llamando-turnos {
        float: left;
        width: 35%;
    }
    .llamando-turnos #nombre-turno-llamando {
        min-height: <?= $altoPantalla * 0.2 ?>px;
        max-height: <?= $altoPantalla * 0.2 ?>px;
        padding:3px;
        font-size: <?= $tamanoLetrasNombreTurno ?>%;
    }
    .llamando-turnos #codigo-modulo-llamando {
        min-height: <?= $altoPantalla * 0.1 ?>px;
        font-size: <?= $tamanoLetrasNombreModulo ?>%;
        margin-top: 30px;
        line-height: 100%;
    }

    .turno-atendiendo  {
        width: 49%;
        float: left;
    }
    .turno-atendiendo .nombre-turno {
        background: transparent;
        background-position: center center;
        background-repeat: no-repeat;

        height: <?= $altoTurnosAtendiendo ?>px;
        vertical-align: middle;
        padding: 30px 10px 10px 10px;

        font-size: <?= $tamanoLetrasTurnoModulo ?>%;
        font-weight: bold;
        line-height: 0.75em;

        word-wrap: break-word;
        overflow: hidden;

        border-left: thin black solid;
        border-bottom: thin black solid;
    }
    .turno-atendiendo .modulo-turno {
        color: white;
        background: transparent;
        background-size: 100% auto ;
        background-position: center center;
        background-repeat: no-repeat;

        height: <?= $altoTurnosAtendiendo ?>px;
        vertical-align: middle;
        padding: 20px 10px;

        font-size: <?= $tamanoLetrasCodigoModulo ?>%;
        line-height: 1em;
        text-align: center;
        word-wrap: break-word;
        white-space: pre-line;
        overflow: hidden;
        text-overflow: none;


        border-left: thin black solid!important;
        border-bottom: thin black solid!important;

    }
    .turno-atendiendo .modulo-turno::first-word {
        content: "-----------";
    }
    .flip-clock-meridium {
        float: right!important;
    }



    #carrusel-turnospendientes {
        position: absolute;
        top: <?= $altoPantalla - 120 ?>px;
        /*        border: thin black solid;
                height: 120px;*/
        width: 100%;
        background: white;
        z-index: -1;
    }


    .turno-pendiente {

    }
    .turno-pendiente .nombre-turno {
        background: transparent;
        width: 45%;
        height: <?= $altoTurnosAtendiendo ?>px;
        vertical-align: middle;
        text-align: center;
        padding: 20px 10px 10px 10px;

        font-size: 52px;
        font-weight: bold;
        line-height: 0.75em;

        word-wrap: break-word;
        overflow: hidden;

        border: black thin solid;
        -webkit-border-top-right-radius: 10px;
        -webkit-border-bottom-right-radius: 30px;
        -moz-border-radius-topright: 10px;
        -moz-border-radius-bottomright: 30px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 30px;

        z-index: 9999;

    }
    .turno-pendiente .modulo-turno {
        color: white;
        background: #0033cc;
        background-image: url(img/fondo-turno-llamando.png);
        background-position-y: bottom;

        width: 55%;
        height: <?= $altoTurnosAtendiendo ?>px;

        padding: 20px 5px;
        font-size: <?= $tamanoLetrasCodigoModulo ?>%;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;

        word-wrap: break-word;
        white-space: pre-line;
        overflow: hidden;
        text-overflow: none;

        border: black thin solid;
        -webkit-border-top-left-radius: 30px;
        -webkit-border-bottom-left-radius: 10px;
        -moz-border-radius-topleft: 30px;
        -moz-border-radius-bottomleft: 10px;
        border-top-left-radius: 30px;
        border-bottom-left-radius: 10px;

    }
    .turno-pendiente .modulo-turno.CAJA {
        padding: 20px 5px;
        font-size: 27px;
        line-height: 27px;
    }
    .turno-pendiente .modulo-turno.PQRS {
        padding: 20px 5px;
        font-size: 52px;
        line-height: 52px;
    }
    .turno-pendiente .modulo-turno::first-word {
        content: "-----------";
    }

    .cambio {
        color: black;
        font-size: 150%;
        background-color: rgba(255,255,255,0.9);
        transition: all 2s ease-in 150ms;
        transform: scale(1,1);
    }
    .cambio_aumenta {
        color: red;
        font-size: 300%;
        background-color: rgba(255,255,255,0.8);
        transform: scale(2,2);
    }

    .titulo_turnospendientes {
        position: absolute;
        top: <?= $altoPantalla - 170 ?>px;
        width: 100%;
        background: white;
        text-shadow: #969696 1px 3px 0, #EEEEEE 1px 13px 5px;
        z-index: -1;
    }
</style>
<style type="text/css">

    .posicion-estrella {
        width: 800px;
        margin: auto;
        position: absolute;
        top: 50%;
        transform: scale(0);
        left: 25%;
    }

    .scale-up-center {
        -webkit-animation: scale-up-center 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        animation: scale-up-center 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }
    /* ----------------------------------------------
 * Generated by Animista on 2020-1-8 11:38:29
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

    /**
     * ----------------------------------------
     * animation scale-up-center
     * ----------------------------------------
     */
    @-webkit-keyframes scale-up-center {
        0% {
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
        }
        70% {
            -webkit-transform: scale(2.5);
            transform: scale(2.5);
        }
        100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
    }
    @keyframes scale-up-center {
        0% {
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
        }
        70% {
            -webkit-transform: scale(2.5);
            transform: scale(2.5);
        }
        100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
    }


</style>

<div class="row" style="margin-right: 0px;">
    <div style="float:right;"><a href="javascript:void(0);" target="_self" onclick="cambiarModoCONFIGURACION()">configuración <i class="fa fa-cog"></i></a></div>
    <div class="llamando-turnos" style="height:<?= $altoPantalla ?>px;width:<?= $anchoPantalla * 0.40 ?>px;">
        <div style="height:<?= $altoPantalla * 0.1 ?>px" >
            <div class="text-center" style="float:left;width:40%;">
                <img src="img/logo-retina.png" style="height:<?= $altoPantalla * 0.075 ?>px" />
            </div>
            <div id="reloj" class="clock" style="z-index: -1;margin:0em;float: right;width:59%;"></div>
            <script src="js/vendor/flipclock.js"></script>
            <script type="text/javascript">
        var clock;
        $(document).ready(function () {
                clock = $('#reloj').FlipClock({
                        clockFace: 'TwentyFourHourClock',
                        language: 'es',
                        showSeconds: false
                });
        });
            </script>
        </div>
        <hr class="clear clearfix clear-fix" /> 
        <div style="margin-top: -10px;line-height: 1em;">
            <div>
                <img src="img/titulo-turno.png" style="height:<?= $altoPantalla * 0.1 ?>px" />
            </div>
            <div class="animated pulse infinite text-center " style="padding: 5px;overflow: hidden; word-wrap: break-word;">
                <div id="codigo-turno-llamando" style="display: none;" >XXXXXX</div>
                <div id="nombre-turno-llamando" style=""></div>
            </div>
            <div>
                <img src="img/titulo-modulo.png" style="height:<?= $altoPantalla * 0.1 ?>px" />
            </div>
            <div class="animated pulse infinite text-center" style="">
                <div id="codigo-modulo-llamando" style=""></div>
            </div>
        </div>
    </div>
    <div class="area-publicidad" style="height:<?= $altoPantalla ?>px;width:<?= $anchoPantalla * 0.60 ?>px;">
        <!--<img src="img/whatsapp_escribenos_con_numero_sip.gif" style="position: absolute; top: 10px; right: 10px; width: 25%; " />--> 
        <div style="position: absolute;top: 15px;right: 5px;background-color: white;text-align: center;font-size: 300%;font-weight: bold; border: outset;height: 60px; width:<?= $anchoPantalla * 0.60 ?>px;  " class="animate animated infinite pulse" >Turnos En Atención</div>
        <ul id="tabla_atendiendo" class=" turnos-atendiendo" style="list-style: none;top:<?= $altoPantalla * 0.62 ?>px;" ></ul>
    </div>
</div>
<div id="carrusel-turnospendientes"  class="row" style="margin: 0px;">    
    <div class="borde-izq">
        <img src="img/border-turnos-izq.png" />
    </div>
    <div class="borde-der">
        <img src="img/border-turnos-der.png" />
    </div>
    <div class="carrusel">
        <div id="container">
            <div id="carousel" class="turnos-atendiendo"></div>
        </div>
    </div>
</div>
<div class="text-center titulo_turnospendientes" ><marquee><h1 style="margin: 0px;" class=" animate animated infinite pulse">Turnos Pendientes por Atender.</h1></marquee></div>


<script type="text/javascript">
    //hablar("Bienvenidos al Monitor del Sistema de Citas y Turnos de la Cámara de Comercio de Santa Marta para el Magdalena. ¡Creciendo Contigo!");

    TIEMPO_PAUSA_PASOS = "<?php echo $pausa ?>";
    VELOCIDAD_CARRUSEL = "<?php echo $velocidad ?>";
    TIEMPO_CONSULTA = "<?php echo $tiempoConsulta ?>";
    TIEMPO_PRESENTACION = "<?php echo $tiempoPresentacion ?>";
    CANTIDAD_MODULOS_MOSTRANDO = "<?php echo $modulosEnVista ?>";
    PASOS_MODULOS_MOSTRANDO = "<?php echo $pasosEnVista ?>";

    ZonasAtencion = [
<?php foreach ($AreasTrabajo as $AreaTrabajo): ?>
                "<?= $AreaTrabajo ?>",
<?php endforeach; ?>
    ];
    anchoModulo = "<?php echo $anchoTurnosAtendiendo ?>";
    altoModulo = "<?php echo $altoTurnosAtendiendo ?>";
    jQuery(function ($) {
            iniciarPresentacionTurnos("<?= $anchoTurnosAtendiendo ?>", "<?= $altoTurnosAtendiendo ?>", "<?= $tiempoConsulta ?>", "<?= $tiempoPresentacion ?>");
            cambiarModoMONITOR();
    });

    var topinicial = $("#tabla_atendiendo").position().top;
    var altoespacionombres = $("#tabla_atendiendo").height();
    setInterval(function () {
            var top = $("#tabla_atendiendo").position().top;
            var newtop = top - 1;

            if (Math.abs(newtop) <= (altoespacionombres - <?= $altoPantalla * 0.5 ?>)) {

                    $("#tabla_atendiendo").css('top', newtop + 'px');
            } else {

                    $("#tabla_atendiendo").css('top', topinicial + 'px');
            }
            altoespacionombres = $("#tabla_atendiendo").height();
    }, 23);


</script>
<!--<div id="player"></div>-->

<!--<script>    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: 'KjDS54IGGoM',
            playerVars: {'autoplay': 1, 'controls': 0, 'origin': 'https://monitor.citurcam.ccsm.org.co/'},
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // 4. The API will call this function when the video player is ready. 
    function onPlayerReady(event) {
        event.target.setLoop(true);
        event.target.setVolume(7);
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
//          setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }
</script>-->


<!--<iframe width="100%" height="100" src="https://www.youtube.com/embed/zvSXOBnbxHI?controls=0&autoplay=1&volumen=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->

<img id="estrella" src="img/mariposa.png" class="posicion-estrella" /> 
<img id="estrella-afiliados" src="img/mariposa-afiliados.png" class="posicion-estrella" />
<!--<audio controls autoplay> <source src="snd/timbre_turnos.mp3" type="audio/mpeg"></audio>
<audio id="musica-ambiental" controls autoplay volume="0.1" ><source src="https://radio.stereoscenic.com/asp-s" type="audio/mpeg"></audio>-->
<audio id="musica-ambiental" controls autoplay volume="0.1" ><source src="https://libs.tiendasicam32.net/audios/navidad_2021.mp3" type="audio/mpeg"></audio>
<script>

    let vid = document.getElementById("musica-ambiental");
    vid.volume = 0.1;
    window.addEventListener('load', function () {
            let vid = document.getElementById("musica-ambiental");
            vid.volume = 0.1;
    });
</script>

