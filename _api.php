<<<<<<<< HEAD:_api.php
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
========
<?php
session_start();
class TurnosControlador {

    public static function siguiente($sedeID) {
        $ObjTurnos = Turnos::getTurnosLlamandoPorSede($sedeID);
        echo json_encode(array('success' => 'Se completó la consulta.', 'turnos' => $ObjTurnos));
    }

    public static function atendiendo($sedeID) {
        $ObjTurnos = Turnos::getTurnosAtendiendoPorSede($sedeID);
        echo json_encode(array('success' => 'Se completó la consulta.', 'turnos' => $ObjTurnos));
    }

}

spl_autoload_register(function ($nombre_clase) {
    include '/home/ccsm/sicam32/api.sicam/app/modelos/' . $nombre_clase . '.php';
});
//include '/home/ccsm/sicam32/api.sicam/app/controladores/Turnos.php';
$datos = explode("/", $_GET["url"]);
$nombreContolador = ucfirst($datos[3]) . "Controlador";
$Controlador = new $nombreContolador();
$Controlador->$datos[4]($datos[6]);

session_write_close();
>>>>>>>> ed9082a55855cf91464fd4f49d55a49089e917eb:api.php
