<?php
$tiempoConsulta = 10; //En segundos
$tiempoPresentacion = 5; //En segundos
$Sede = 1;
$altoPantalla = 1080;
$anchoPantalla = 1920;


$altoTurnosAtendiendo = round( $altoPantalla * 0.2 );
$anchoTurnosAtendiendo = ($anchoPantalla * 0.9) / 4 ;

?>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Monitor de Turnos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link type="text/css" rel="stylesheet" href="css/bootstrap-theme.min.css">
        <link type="text/css" rel="stylesheet" href="css/animate.css">
        <link type="text/css" rel="stylesheet" href="css/rcarousel.css" />
        <link type="text/css" rel="stylesheet" href="css/main.css">

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
            padding: 10px;
            
            word-wrap: break-word;
          }
          
          .turno-atendiendo .modulo-turno {
            background: transparent;
            background-image: url(/img/atras-modulo.png);
            background-size: 100% 100%;
            background-position: center center;
            background-repeat: no-repeat;
            
            width: 40%;
            height: <?= $altoTurnosAtendiendo ?>px;
            vertical-align: middle;
            padding: 35px 15px;
            
            font-size-adjust: 0.58;
            text-align: center;
            word-wrap: break-word;
            
          }
        </style>
    </head>
    <body>
      
        <div class="row" style="margin-right: 0px;" > 
          <div class="col-md-4 llamando-turnos" style="height:<?= $altoPantalla*0.7 ?>px" >
            <div class="text-center" style="padding-top: 10px;" ><img src="/img/logo-retina.png"  style="height:<?= $altoPantalla*0.075 ?>px" /></div>
            <hr />
            <div><img src="/img/titulo-turno.png"  style="height:<?= $altoPantalla*0.1 ?>px" /></div>
            <div class="animated pulse infinite text-center " style="min-height: 30%;" >
              <!--<span id="codigo-turno-llamando" style="font-size: 50%;" >XXXXXX</span><br />-->
              <span id="nombre-turno-llamando" ></span>
            </div>
            <div><img src="/img/titulo-modulo.png"  style="height:<?= $altoPantalla*0.1 ?>px" /></div>
            <div class="animated pulse infinite text-center" style="min-height: 30%;">
              <span id="codigo-modulo-llamando" ></span>
            </div>
          </div>
          <div class="col-md-8 area-publicidad">
            <iframe width="100%" height="<?= $altoPantalla*0.7 ?>px" 
              src="https://www.youtube.com/embed/videoseries?list=PLy0Q2cGnTqFv-Ct3OOX6B4JeLEL3adSeV&loop=1&autoplay=1" 
              frameborder="0" allow="autoplay; encrypted-media" allowfullscreen ></iframe>
          </div>
        </div>
        <hr />
        <div class="row">
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
        mostrarModulosAtencionActivos(<?= $anchoTurnosAtendiendo ?>, <?= $altoTurnosAtendiendo ?>, 
          function(){
            mostrarTurnoLlamando( <?= $tiempoConsulta*1000 ?>);
            mostrarSiguienteLlamando();
          }
        );
        setInterval(mostrarSiguienteLlamando, <?= $tiempoPresentacion*1000 ?> );
        setInterval( mostrarDatosTurnoLlamando, <?= $tiempoConsulta*1000 ?> );
			});
		</script>
      
    </body>
</html>
