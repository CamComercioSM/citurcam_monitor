<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Monitor del sistema de Citas y Turnos de la CamComercioSM | CiTurCam</title>
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  
  <!-- jQuery library -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
  
  <!-- Latest compiled JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>    
  <!--<script src="js/vendor/bootstrap.min.js"></script>-->
  
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link type="text/css" rel="stylesheet" href="css/bootstrap-theme.min.css">
  <link type="text/css" rel="stylesheet" href="css/fuentes.css">
  <link type="text/css" rel="stylesheet" href="css/animate.css">
  <link type="text/css" rel="stylesheet" href="css/rcarousel.css" />
  <link type="text/css" rel="stylesheet" href="css/main.css">
  <link type="text/css" rel="stylesheet" href="css/flipclock.css">
  <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
  <script src="js/vendor/owl.carousel/dist/owl.carousel.min.js"></script>

  
  
  <!--//Integración con SICAM-->
  <script type="text/javascript">
    var tituloSistema = " CiTurCam - Citas y Turnos de la Camara de Comercio de Santa Marta para el Magdalena" ;                                      
    var urlSistema = "";
    var URL_SICAM = "https://si.sicam32.net/";
    var _apisicam = _apisicam || {};
    _apisicam.apiURL = 'https://api.sicam32.net/';
    // _apisicam.apiURL = 'https://sicam32-jpllinas.c9users.io/api/';
    _apisicam.clavePublica = 'm8mcJFLAGT5ba%2FP%2BUNITJv3jf9%2FU4zDM2DERnNFpMjGhC1xXlFAPleRAorZVikJA';
    _apisicam.clavePrivada = 'l6LHlDIvNrsuFtLDZx0ti80%2BZltejZmFVokVWczuEuU%3D';
    window.apisicam || (function(d) {
        var s, c, o = apisicam = function() {
            o._.push(arguments)
        };
        o._ = [];
        s = d.getElementsByTagName('script')[0];
        c = d.createElement('script');
        c.type = 'text/javascript'; 
        c.charset = 'utf-8';
        c.async = false;
        c.src = _apisicam.apiURL + 'clientes/javascript/index.php?'+_apisicam.clavePublica+':'+_apisicam.clavePrivada;
        s.parentNode.insertBefore(c, s);
    })(document);
  </script>   
  <script type="text/javascript" src="https://si.sicam32.net/libs/js/utilidades.js"></script>
  <script type="text/javascript" src="https://si.sicam32.net/libs/js/pantalla.js"></script>
  <script type="text/javascript" src="https://si.sicam32.net/libs/js/sonidos.js"></script>
  <script type="text/javascript" src="https://si.sicam32.net/libs/js/funciones.js"></script>
</head>
<body>
  <div id="pnl-control-vistas" class="flip-container" ontouchstart="this.classList.toggle('hover');">
  	<div class="flipper">
  		<div class="front">
        <div id="areaTrabajo" ></div>
        <hr>
        <footer class="text-center">
          <div class="container">
            <div class="row">
              <div class="col-xs-12">
                <p>Copyright © Cámara de Comercio de Santa Marta para el Magdalena.</p>
              </div>
            </div>
          </div>
        </footer>    
      </div>
  		<div class="back">      
  		  <div id="areaTrabajo2" ></div>
      </div>
  	</div>
  </div>
  
  <div id="cargando"></div>
  <div id="codigoOculto" style="display:none;" >
    <audio controls>
  <source src="snd/Jetsons-doorbell.mp3" type="audio/mpeg">
</audio>
  </div>
  <script src="https://unpkg.com/sweetalert2"></script>
  <script type="text/javascript" src="js/plugins.js"></script>
  <script type="text/javascript" src="/js/vendor/jquery.ui.core.js"></script>
  <script type="text/javascript" src="/js/vendor/jquery.ui.widget.js"></script>
  <script type="text/javascript" src="/js/vendor/jquery.ui.rcarousel.js"></script>
  <script type="text/javascript" src="js/main.js"></script>
  <script type="text/javascript" >
  bloqueoCargando();
  $(window).on('load',function() {
      inciarMonitorTurnosCCSM();
      desbloqueoCargando();
  });

  </script> 
</body>
</html>
