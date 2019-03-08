<?php
$tiempoConsulta = 1; //En segundos
$tiempoPresentacion = 4; //En segundos
$Sede = 1;
$AreaTrabajo = 1;
$altoPantalla = 1080;
$anchoPantalla = 1920;
$altoTurnosAtendiendo = round( $altoPantalla * 0.2 );
$anchoTurnosAtendiendo = ($anchoPantalla * 0.9) / 4 ;
?>
<!DOCTYPE html>
<html>
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <title>Monitor de Turnos</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="css/bootstrap.min.css">
      <link type="text/css" rel="stylesheet" href="css/bootstrap-theme.min.css">
      <link type="text/css" rel="stylesheet" href="css/fuentes.css">
      <link type="text/css" rel="stylesheet" href="css/animate.css">
      <link type="text/css" rel="stylesheet" href="css/rcarousel.css" />
      <link type="text/css" rel="stylesheet" href="css/main.css">
      <link type="text/css" rel="stylesheet" href="css/flipclock.css">
      <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
      <style type="text/css">
        .borde-izq {
          float: left;
          width: <?= $anchoTurnosAtendiendo / 3.3 ?>px;
  		    height: <?= $altoTurnosAtendiendo ?>px;
        }
        .borde-der {
          float: right;
          width: <?= $anchoTurnosAtendiendo / 3.3 ?>px;
  		    height: <?= $altoTurnosAtendiendo ?>px;
        }
        .borde-der img, .borde-izq img {
          width: <?= $anchoTurnosAtendiendo / 3.3 ?>px;
  		    height: <?= $altoTurnosAtendiendo ?>px;
        }
        .turno-atendiendo .nombre-turno {
          background: transparent;
          background-image: url(/img/fondo-nombre-llamando.png);
          background-size: 100% 100%;
          background-position: center center;
          background-repeat: no-repeat;
          
          width: 60%;
          height: <?= $altoTurnosAtendiendo ?>px;
          vertical-align: middle;
          padding: 20px 10px 10px 10px;
          
          font-size: 1.3em;
          font-weight: bold;
          line-height: 0.75em;
          
          word-wrap: break-word;
          overflow: hidden;
        }
        .turno-atendiendo .modulo-turno {
          color: white;
          background: transparent;
          background-image: url(/img/atras-modulo.png);
          background-size: 100% 100%;
          background-position: center center;
          background-repeat: no-repeat;
          
          width: 40%;
          height: <?= $altoTurnosAtendiendo ?>px;
          vertical-align: middle;
          padding: 45px 15px;
          
          font-size: 1.6em;
          line-height: 1em;
          text-align: center;
          word-wrap: break-word;
          white-space: pre-line; 
          overflow: hidden;
          text-overflow: none;
          
        }
        .turno-atendiendo .modulo-turno::first-word {
          content: "-----------";
        }
        .flip-clock-meridium {
          float: right!important;
        }
      </style>
  </head>
  <body>
  <div class="row" style="margin-right: 0px;" > 
    <div class="col-md-4 llamando-turnos" style="height:<?= $altoPantalla*0.7 ?>px;" >
      <div style="height:<?= $altoPantalla*0.1 ?>px" />
        <div class="text-center" style="float:left;width:40%;" ><img src="/img/logo-retina.png"  style="height:<?= $altoPantalla*0.075 ?>px" /></div>
        <div id="reloj" class="clock"  style="z-index: -1;margin:0em;float: right;width:59%;"></div>
      </div>
      <hr class="clear clearfix clear-fix" />
      <div style="margin-top: -10px;line-height: 1em;" >
        <div><img src="/img/titulo-turno.png"  style="height:<?= $altoPantalla*0.1 ?>px" /></div>
        <div class="animated pulse infinite text-center " style="height: 30%; padding: 5px;overflow: hidden; word-wrap: break-word;" >
          <!--<span id="codigo-turno-llamando" style="font-size: 50%;" >XXXXXX</span><br />-->
          <div id="nombre-turno-llamando" style="padding:3px;min-height: <?= $altoPantalla*0.2 ?>px;max-height: <?= $altoPantalla*0.2 ?>px" ></div>
        </div>
        <div><img src="/img/titulo-modulo.png"  style="height:<?= $altoPantalla*0.1 ?>px" /></div>
        <div class="animated pulse infinite text-center" style="min-height: 30%; font-size: 1.4em">
          <div id="codigo-modulo-llamando" style="min-height: <?= $altoPantalla*0.1 ?>px"  ></div>
        </div>
      </div>
    </div>
    <div class="col-md-8 area-publicidad" style="" >
      <!--<iframe width="100%" height="<?= $altoPantalla*0.7 ?>px" -->
      <!--  src="https://www.youtube.com/embed/videoseries?list=PLy0Q2cGnTqFv-Ct3OOX6B4JeLEL3adSeV&vq=small&loop=1&autoplay=1"-->
      <!--  frameborder="0" allow="autoplay; encrypted-media" allowfullscreen ></iframe>-->
      <iframe width="100%" height="<?= $altoPantalla*0.7 ?>px" style="width:100%;height:<?= $altoPantalla*0.7 ?>px;object-fit: fill;"
        src="/video/player.php"
        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen ></iframe>
    </div>
  </div>
  <hr />
  <div class="row" style="margin: 0px;">
  	<div class="borde-izq">
  	  <img src="/img/border-turnos-izq.png"/>
  	</div>
  	<div class="borde-der">
  	  <img src="/img/border-turnos-der.png" />
  	</div>
  	<div class="carrusel">
  		<div id="container" >
  			<div id="carousel" class="turnos-atendiendo" ></div>
  		</div>
  	</div>
  </div>
  
  
  <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
  <script src="js/vendor/bootstrap.min.js"></script>
  <script src="js/plugins.js"></script>
  
  <script type="text/javascript" src="/js/vendor/jquery.ui.core.js"></script>
  <script type="text/javascript" src="/js/vendor/jquery.ui.widget.js"></script>
  <script type="text/javascript" src="/js/vendor/jquery.ui.rcarousel.js"></script>
  <script src="/js/main.js"></script>
  <script type="text/javascript">
  jQuery(function( $ ) {
    iniciarMonitorDeTurnos(
      <?= $anchoTurnosAtendiendo ?>, <?= $altoTurnosAtendiendo ?>, <?= $tiempoConsulta*1000 ?>, <?= $tiempoPresentacion*1000 ?>
    );
  });
  </script>
  
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
    
  </body>
</html>