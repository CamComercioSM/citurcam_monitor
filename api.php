<?php

require('libs/ApiSicam.clase.php');
if( $Api->conectar() ){
    switch ($_POST['operacion']) {
        
        case 'turnosLlamando':
            $Api->ejecutar( 'atencionpublico', 'TurnosApp', 'mostrarLlamando', array( "1") );
            break;
        
        case 'turnosAtendiendo':
            $Api->ejecutar( 'atencionpublico', 'TurnosApp', 'mostrarAtendiendo', array( "1") );
            break;
            
        case 'modulosActivos':
            $Api->ejecutar( 'atencionpublico', 'TurnosApp', 'mostrarModulosAtencionActivosPorSede', array( "1") );
            break;
            
            
        default:
            break;
    }
    $Api->desconectar();
}
    
    