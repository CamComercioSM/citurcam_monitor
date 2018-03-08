<?php

class ApiSicam {

   //const URL = 'https://api.ccsm.org.co/api.php';
   const URL = 'https://sicam32-jpllinas.c9users.io/api/';
   const USERNAME = 'ccsm_monitor_turnos';
   const PASSWORD = 'kpaC6DdtRBWj82k';
   
   private $conexionApi = null;

    /**
     *
     * @param <array> $postFields
     * @return SimpleXMLElement
     * @desc this connects but also sends and retrieves 
           the information returned in XML
     */
    public function conectar($postFields = null){
        $estadoConexion = false;
        
        // session_start();
        // if (isset($_SESSION['API_CONEXION'])){
        //     $estadoConexion = $_SESSION['API_CONEXION'];
        // }
        // session_write_close();
        
        // if($estadoConexion) return $estadoConexion;
        
        $this->conexionApi = curl_init();
        curl_setopt($this->conexionApi, CURLOPT_URL, self::URL."conectar");
        curl_setopt($this->conexionApi, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($this->conexionApi, CURLOPT_USERPWD, self::USERNAME.":".self::PASSWORD);
        curl_setopt($this->conexionApi, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        $output = curl_exec($this->conexionApi);
        $respuesta = json_decode($output);
        if (json_last_error() === JSON_ERROR_NONE) {
            if($respuesta->RESPUESTA == 'EXITO'){
                session_start();
                $estadoConexion = $_SESSION['API_CONEXION'] = true;
                session_write_close();
                $info = curl_getinfo($this->conexionApi);
            }   
        }
        return $estadoConexion;
  }
  
  public function desconectar(){
      return curl_close($this->conexionApi);
  }
  
  public function ejecutar($componente,$controlador,$operacion, array $parametros = null){
    
    curl_setopt($this->conexionApi, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($this->conexionApi, CURLOPT_RETURNTRANSFER, true);
    $urlCompleta = self::URL.$componente."/".$controlador."/".$operacion;
    if(!is_null($parametros)){
        foreach($parametros as $parametro){
            $urlCompleta .= "/".$parametro;
        }
    }
    curl_setopt($this->conexionApi, CURLOPT_URL, $urlCompleta);
    $resultado =curl_exec($this->conexionApi);
    print_r($resultado);
    //var_dump(json_decode($result, true));
    
  }

}

$Api = new ApiSicam();