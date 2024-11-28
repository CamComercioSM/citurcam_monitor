<?php
require('libs/ApiSicam.clase.php');
switch ($_POST['operacion']) {
    
    case 'mostrarTurnosPendientesTiposServicios':
        
        break;
    
    case 'turnosLlamando':
        echo $Api->ejecutar( 'atencionpublico', 'TurnosApp', 'mostrarLlamando', array( $_POST['sedeID'], $_POST['areaID'] ) );
        break;
    
    case 'turnosAtendiendo':
        echo $Api->ejecutar( 'atencionpublico', 'TurnosApp', 'mostrarAtendiendo', array( $_POST['sedeID'], $_POST['areaID']  ) );
        break;
        
    case 'modulosActivos':
        echo $Api->ejecutar( 'atencionpublico', 'TurnosApp', 'mostrarModulosAtencionActivosPorSede', array( $_POST['sedeID'], $_POST['areaID']  ) );
        break;
        
    default:
        break;
}