<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Monitor de Turnos - Cámara de Comercio de Santa Marta para el Magdalena</title>
        <meta name="description" content="Monitor de Turnos">
        <meta name="author" content="Cámara de Comercio de Santa Marta para el Magdalena">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="css/flipclock.css">
        <link href="css/style.css" rel="stylesheet">



        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/jsrsasign-latest-all-min.js" type="text/javascript"></script>
        <script src="js/auth_script.js" type="text/javascript"></script>
        <script src="js/flipclock.js"></script>
        <script src="js/scripts.js"></script>
    </head>
    <body style="padding-top: 20px;">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4">  
                    <div id="proximo_turno" >
                        <?php include('./html/sig-turno.php'); ?>                        
                    </div>
                    <hr />
                    <div id="atendiendo_turno" >
                        <?php include('./html/atiende-turno.php'); ?>                        
                    </div>
                </div>               
                <div class="col-md-8" style="z-index: -1;">
                    <img alt="Logo" src="https://www.ccsm.org.co/images/logo314.png"  style="z-index: -1;max-width: 100%;width: 270px;" />
                    <div id="reloj" class="clock"  style="z-index: -1;margin:0em;float: right;width: auto;"></div>
                    <hr />
                    <div class="media"  style="z-index: -1;">                        
                        <iframe width="100%" height="500"  style="z-index: -1;"
                                src="https://www.youtube.com/embed/videoseries?list=PLy0Q2cGnTqFs06X1YANLubH8BtWjOwDUj&autoplay=1&loop=1" 
                                frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript">
            var clock;
            $(document).ready(function () {
                clock = $('#reloj').FlipClock({
                    clockFace: 'TwelveHourClock',
                    language: 'es'
                });
            });
        </script>
    </body>
</html>