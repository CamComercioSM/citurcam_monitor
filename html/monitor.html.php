<?php
// print_r($_POST);
$velocidad = intval( isset($_POST['tiempoPasosCarrusel']) ? $_POST['tiempoPasosCarrusel'] : 5080 ); //En segundos
$pausa = intval( isset($_POST['tiempoEntrePasos']) ? $_POST['tiempoEntrePasos'] : 1080 ); //En segundos
$tiempoConsulta = intval( isset($_POST['tiempoConsulta']) ? $_POST['tiempoConsulta'] : 1080 ); //En segundos
$tiempoPresentacion = intval( isset($_POST['tiempoTurno']) ? $_POST['tiempoTurno'] : 5080 ); //En segundos
$AreasTrabajo = ( isset($_POST['puestosSeleccionados']) ? $_POST['puestosSeleccionados'] : null );
$altoPantalla = intval( isset($_POST['altoPantalla']) ? $_POST['altoPantalla'] : 1080 );
$anchoPantalla = intval( isset($_POST['anchoPantalla']) ? $_POST['anchoPantalla'] : 1920 );
$modulosEnVista = intval( isset($_POST['modulosEnVista']) ? $_POST['modulosEnVista'] : 1 );
$pasosEnVista = intval( isset($_POST['pasosEnVista']) ? $_POST['pasosEnVista'] : 1 );
$altoTurnosLlamando = intval( $altoPantalla * 0.2 );
$anchoTurnosLlamando = intval( ($anchoPantalla * 0.9) / 4 );
$altoTurnosAtendiendo = intval( $altoPantalla * 0.2 );
$anchoTurnosAtendiendo = intval( ($anchoPantalla * 0.9) / 4 );

$tamanoLetrasNombreTurno = intval( isset($_POST['tamanoLetrasNombreTurno']) ? $_POST['tamanoLetrasNombreTurno'] : 100 );
$tamanoLetrasNombreModulo = intval( isset($_POST['tamanoLetrasNombreModulo']) ? $_POST['tamanoLetrasNombreModulo'] : 125 );
$tamanoLetrasTurnoModulo = intval( isset($_POST['tamanoLetrasTurnoModulo']) ? $_POST['tamanoLetrasTurnoModulo'] : 125 );
$tamanoLetrasCodigoModulo = intval( isset($_POST['tamanoLetrasCodigoModulo']) ? $_POST['tamanoLetrasCodigoModulo'] : 150 );

?>
<style type="text/css">

  .area-publicidad {
    float: right;
    width: 65%;
  }

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
  
  
  .llamando-turnos {
    float: left;
    width: 35%;
  }
  .llamando-turnos #nombre-turno-llamando {
    min-height: <?= $altoPantalla*0.2 ?>px;
    max-height: <?= $altoPantalla*0.2 ?>px;
    padding:3px;
    font-size: <?= $tamanoLetrasNombreTurno ?>%;
  }
  .llamando-turnos #codigo-modulo-llamando {
    min-height: <?= $altoPantalla*0.1 ?>px;
    font-size: <?= $tamanoLetrasNombreModulo ?>%;
  }
  
  .turno-atendiendo  {
    
  }
  .turno-atendiendo .nombre-turno {
    background: transparent;
    background-image: url(img/fondo-nombre-llamando.png);
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    
    width: 60%;
    height: <?= $altoTurnosAtendiendo ?>px;
    vertical-align: middle;
    padding: 20px 10px 10px 10px;
    
    font-size: <?= $tamanoLetrasTurnoModulo ?>%;
    font-weight: bold;
    line-height: 0.75em;
    
    word-wrap: break-word;
    overflow: hidden;
  }
  .turno-atendiendo .modulo-turno {
    color: white;
    background: transparent;
    background-image: url(img/atras-modulo.png);
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    
    width: 40%;
    height: <?= $altoTurnosAtendiendo ?>px;
    vertical-align: middle;
    padding: 29px 15px;
    
    font-size: <?= $tamanoLetrasCodigoModulo ?>%;
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
<div class="row" style="margin-right: 0px;">
  <div style="float:right;"><a href="javascript:void(0);" target="_self" onclick="cambiarModoCONFIGURACION()">configuración <i class="fa fa-cog"></i></a></div>
  <div class="llamando-turnos" style="height:<?= $altoPantalla*0.75 ?>px;width:<?= $anchoPantalla*0.39 ?>px;">
    <div style="height:<?= $altoPantalla*0.1 ?>px" >
        <div class="text-center" style="float:left;width:40%;">
            <img src="img/logo-retina.png" style="height:<?= $altoPantalla*0.075 ?>px" />
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
            <img src="img/titulo-turno.png" style="height:<?= $altoPantalla*0.1 ?>px" />
        </div>
        <div class="animated pulse infinite text-center " style="padding: 5px;overflow: hidden; word-wrap: break-word;">
            <div id="codigo-turno-llamando" style="display: none;" >XXXXXX</div>
            <div id="nombre-turno-llamando" style=""></div>
        </div>
        <div>
            <img src="img/titulo-modulo.png" style="height:<?= $altoPantalla*0.1 ?>px" />
        </div>
        <div class="animated pulse infinite text-center" style="">
            <div id="codigo-modulo-llamando" style=""></div>
        </div>
    </div>
  </div>
  <div class="area-publicidad" style="height:<?= $altoPantalla*0.65 ?>px;width:<?= $anchoPantalla*0.60 ?>px;">
    <div id="area-publicidad" class="owl-carousel dots-on-item owl-theme">
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
          <li data-target="#myCarousel" data-slide-to="3"></li>
        </ol>
        <div class="carousel-inner">
          <div class="item active">
            <img src="img/promo/PANTALLA1-min.png" width="<?= $anchoPantalla*0.90 ?>px" height="<?= $altoPantalla*0.90 ?>px">
          </div>
          <div class="item">
            <img src="img/promo/PANTALLA2-min.png" width="<?= $anchoPantalla*0.90 ?>px" height="<?= $altoPantalla*0.90 ?>px">
          </div>
          <div class="item">
            <img src="img/promo/PANTALLA3-min.png" width="<?= $anchoPantalla*0.90 ?>px" height="<?= $altoPantalla*0.90 ?>px">
          </div>
          <div class="item">
            <img src="img/promo/PANTALLA4-min.png" width="<?= $anchoPantalla*0.90 ?>px" height="<?= $altoPantalla*0.90 ?>px">
          </div>
        </div>
        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#myCarousel" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <!--<iframe width="100%" height="<?= $altoPantalla*0.72 ?>px"  frameborder="0" 
      allow="autoplay; encrypted-media" allowfullscreen
      style="width:100%;height:<?= $altoPantalla*0.72 ?>px;object-fit: fill;" 
      src="/video/player.php" ></iframe>-->
  </div>
</div>
<hr />
<div class="row" style="margin: 0px;">
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

<script type="text/javascript">
TIEMPO_PAUSA_PASOS = "<?php echo $pausa ?>"  ;
VELOCIDAD_CARRUSEL = "<?php echo $velocidad ?>"  ;
TIEMPO_CONSULTA = "<?php echo $tiempoConsulta ?>"  ;
TIEMPO_PRESENTACION = "<?php echo $tiempoPresentacion ?>"  ;
CANTIDAD_MODULOS_MOSTRANDO = "<?php echo $modulosEnVista ?>";
PASOS_MODULOS_MOSTRANDO = "<?php echo $pasosEnVista ?>";

ZonasAtencion = [
  <?php foreach($AreasTrabajo as $AreaTrabajo): ?>
    "<?= $AreaTrabajo ?>",
  <?php endforeach; ?>
 ];
anchoModulo  = "<?php echo $anchoTurnosAtendiendo ?>"  ;
altoModulo = "<?php echo $altoTurnosAtendiendo ?>";
jQuery(function( $ ) {
  iniciarPresentacionTurnos("<?= $anchoTurnosAtendiendo ?>", "<?= $altoTurnosAtendiendo ?>", "<?= $tiempoConsulta ?>", "<?= $tiempoPresentacion ?>" );
  cambiarModoMONITOR();
});
</script>

