
<style type="text/css">
   .control-label {
      width: 100%;
   }
   .form-control {
      float: left;
      width: 50%;
   }
</style>

<form id="frm-configuracion" class="form-horizontal" method="post" onsubmit="return false;" >
   <h2 class="text-center">Seleccione las Zonas de Atención:</h2>
   <hr><div class="text-center">
      <button type="submit" class="btn btn-primary" >Continuar</button>
   </div><hr>
   <div class="container" ><div class="row">
      <div class="col-md-10">
        <div id="div-listado-zonatencion" class="row text-center"></div>
      </div>
      <div class="col-md-2">
        <div class="">
      <div class="row text-center">
         <div class=" form-group-sm">
            <label class="control-label requiredField" for="anchoPantalla">
            Ancho de la Pantalla <span class="asteriskField">*</span>
            </label>
            <input class="form-control" id="anchoPantalla" name="anchoPantalla" type="number" required />px
         </div>
         <div class=" form-group-sm">
            <label class="control-label requiredField" for="altoPantalla">
            Alto de la Pantalla <span class="asteriskField">*</span>
            </label>
            <input class="form-control" id="altoPantalla" name="altoPantalla" type="number" required />px
         </div>
      </div>
      <div class="row text-center">
         <div class=" form-group-sm">
            <label class="control-label requiredField" for="altoPantalla">
            Modulos para mostrar en el carrusel <span class="asteriskField">*</span>
            </label>
            <input class="form-control" id="modulosEnVista" name="modulosEnVista" type="number" required /> ms
         </div>
         <div class=" form-group-sm">
            <label class="control-label requiredField" for="altoPantalla">
            Modulos que se mueven <span class="asteriskField">*</span>
            </label>
            <input class="form-control" id="pasosEnVista" name="pasosEnVista" type="number" required /> ms
         </div>
      </div>
      <div class="row text-center">
         <div class=" form-group-sm">
            <label class="control-label requiredField" for="altoPantalla">
            Tiempo entre consultas <span class="asteriskField">*</span>
            </label>
            <input class="form-control" id="tiempoConsulta" name="tiempoConsulta" type="number" required /> ms
         </div>
         <div class=" form-group-sm">
            <label class="control-label requiredField" for="altoPantalla">
            Tiempo Presentación por Turno<span class="asteriskField">*</span>
            </label>
            <input class="form-control" id="tiempoTurno" name="tiempoTurno" type="number" required /> ms
         </div>
         <div class=" form-group-sm">
            <label class="control-label requiredField" >
            Recordar Configuración<span class="asteriskField">*</span>
            </label>
            <label> SI <input type="radio" id="recordarConfiguracionSI" name="recordarConfiguracion" value="SI" checked /></label>
            <label> NO <input type="radio" id="recordarConfiguracionNO" name="recordarConfiguracion" value="NO" /></label>
         </div>
      </div>
      </div>
      </div>
   </div></div>
</form>

<script>
$( document ).ready(function() {
   
   // limpiarDatosEnNavegador();
   
   valoresFormularioConfig(
      window.screen.availWidth, window.screen.availHeight, 
      1000, 4000, 4, 4
   );
   
   var configGuardada = valorEnNavegador("recordarConfiguracion");
   if( configGuardada == "SI" ){
      valoresFormularioConfig(
         valorEnNavegador("anchoPantalla"), 
         valorEnNavegador("altoPantalla"), 
         valorEnNavegador("tiempoConsulta"), 
         valorEnNavegador("tiempoTurno"), 
         valorEnNavegador("modulosEnVista"), 
         valorEnNavegador("pasosEnVista")
      );
      
      var datosSerializado = "anchoPantalla=" + valorEnNavegador("anchoPantalla") 
            +"&altoPantalla=" + valorEnNavegador("altoPantalla") 
            +"&tiempoConsulta=" + valorEnNavegador("tiempoConsulta") 
            +"&tiempoTurno=" + valorEnNavegador("tiempoTurno") 
            +"&modulosEnVista=" + valorEnNavegador("modulosEnVista") 
            +"&pasosEnVista=" + valorEnNavegador("pasosEnVista") 
            +"";
      
      var PuestosTrabajo = JSON.parse(valorEnNavegador("puestos") );
      console.log(PuestosTrabajo);
      for (var i in PuestosTrabajo) {
         datosSerializado += "&puestosSeleccionados[]="+PuestosTrabajo[i];
         console.log(PuestosTrabajo[i]);
         console.log( '#puestoSeleccionado' + PuestosTrabajo[i] );
         console.log( $('#puestoSeleccionado' + PuestosTrabajo[i] ).html() );
         $('#puestoSeleccionado' + PuestosTrabajo[i] ).prop('checked', true);
      }
      console.log( datosSerializado );
      abrirInterfaceMonitoreo(datosSerializado);
   }
      
  $("#frm-configuracion").submit(function(){
    if( $('input[type=checkbox]:checked').length ) {
      var config = $(this).serializeArray();
      for (var i in config) {
         guardarEnNavegador( config[i].name, config[i].value );
      }
      var puesto = [];
      $.each( $('input[type=checkbox]:checked'), function( i, val ) {
         puesto[i] = val.value;
      });
      guardarEnNavegador( "puestos", JSON.stringify( puesto ) );
      console.log( $(this).serialize() );
      abrirInterfaceMonitoreo($(this).serialize());
    }else{
      alertaInformacion("Debes seleccionar al menos una zona de atencion.")
    }
  });
  cargarSedes();
});

function valoresFormularioConfig(anchoPantalla, altoPantalla, tiempoConsulta, tiempoTurno, modulosEnVista, pasosEnVista){
   $("#anchoPantalla").val( anchoPantalla );
   $("#altoPantalla").val( altoPantalla );
   $("#tiempoConsulta").val( tiempoConsulta );
   $("#tiempoTurno").val( tiempoTurno );
   $("#modulosEnVista").val( modulosEnVista );
   $("#pasosEnVista").val( pasosEnVista );
}

</script>