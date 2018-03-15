<?php
require('libs/ApiSicam.clase.php');
switch ($_POST['operacion']) {
    
    case 'turnosLlamando':
        echo $Api->ejecutar( 'atencionpublico', 'TurnosApp', 'mostrarLlamando', array( "1") );
        break;
    
    case 'turnosAtendiendo':
        echo $Api->ejecutar( 'atencionpublico', 'TurnosApp', 'mostrarAtendiendo', array( "1") );
        break;
        
    case 'modulosActivos':
        echo $Api->ejecutar( 'atencionpublico', 'TurnosApp', 'mostrarModulosAtencionActivosPorSede', array( "1") );
        break;
        
    default:
        break;
}