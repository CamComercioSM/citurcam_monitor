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
</head>
<body>
    
    <button onclick="probando();"> probar </button>
    
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript">
    var _apisicam = _apisicam || {};
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
        c.async = true;
        c.src = 'https://sicam32-jpllinas.c9users.io/api/clientes/javascript/?'+_apisicam.clavePublica+':'+_apisicam.clavePrivada;
        s.parentNode.insertBefore(c, s);
    })(document);
</script>

<script type="text/javascript" >
function probando(){
    var datosConsulta = [];
    datosConsulta["sede"] = 1;
    datosConsulta["area"] = 1;
    datosConsulta["modulos"] = null;
    ApiSicam.ejecutar(
        'atencionpublico/TurnosApp/mostrarLlamando', 
        datosConsulta, 
        accionDespuesRespuesta
    ); 
    function accionDespuesRespuesta(datos){
        console.log(datos);
        alert(" " + JSON.stringify(datos) + " ");
    }
}
</script> 







</body>
</html>
