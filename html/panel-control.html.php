
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
      <div class="row text-center">
         <div class=" form-group-sm">
            <label class="control-label requiredField" for="altoPantalla">
            Nombre de Persona Llamando<span class="asteriskField">*</span>
            </label>
            <input class="form-control" id="tamanoLetrasNombreTurno" name="tamanoLetrasNombreTurno" type="number" required />%
         </div>
         <div class=" form-group-sm">
            <label class="control-label requiredField" for="altoPantalla">
            Nombre del Modulo Llamando<span class="asteriskField">*</span>
            </label>
            <input class="form-control" id="tamanoLetrasNombreModulo" name="tamanoLetrasNombreModulo" type="number" required />%
         </div>
         <div class=" form-group-sm">
            <label class="control-label requiredField" for="altoPantalla">
            Nombre de Persona en Modulo<span class="asteriskField">*</span>
            </label>
            <input class="form-control" id="tamanoLetrasTurnoModulo" name="tamanoLetrasTurnoModulo" type="number" required />%
         </div>
         <div class=" form-group-sm">
            <label class="control-label requiredField" for="altoPantalla">
            Nombre del Modulo en Carrusel<span class="asteriskField">*</span>
            </label>
            <input class="form-control" id="tamanoLetrasCodigoModulo" name="tamanoLetrasCodigoModulo" type="number" required />%
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
      1000, 4000, 4, 4, 100, 125, 125, 150
   );
   
   var configGuardada = valorEnNavegador("recordarConfiguracion");
   if( configGuardada == "SI" ){
      valoresFormularioConfig(
         valorEnNavegador("anchoPantalla"), 
         valorEnNavegador("altoPantalla"), 
         valorEnNavegador("tiempoConsulta"), 
         valorEnNavegador("tiempoTurno"), 
         valorEnNavegador("modulosEnVista"), 
         valorEnNavegador("pasosEnVista"), 
         valorEnNavegador("tamanoLetrasNombreTurno"), 
         valorEnNavegador("tamanoLetrasNombreModulo"), 
         valorEnNavegador("tamanoLetrasTurnoModulo"), 
         valorEnNavegador("tamanoLetrasCodigoModulo")
      );
      
      var datosSerializado = "anchoPantalla=" + valorEnNavegador("anchoPantalla") 
            +"&altoPantalla=" + valorEnNavegador("altoPantalla") 
            +"&tiempoConsulta=" + valorEnNavegador("tiempoConsulta") 
            +"&tiempoTurno=" + valorEnNavegador("tiempoTurno") 
            +"&modulosEnVista=" + valorEnNavegador("modulosEnVista") 
            +"&pasosEnVista=" + valorEnNavegador("pasosEnVista") 
            +"&tamanoLetrasNombreTurno=" + valorEnNavegador("tamanoLetrasNombreTurno") 
            +"&tamanoLetrasNombreModulo=" + valorEnNavegador("tamanoLetrasNombreModulo") 
            +"&tamanoLetrasTurnoModulo=" + valorEnNavegador("tamanoLetrasTurnoModulo") 
            +"&tamanoLetrasCodigoModulo=" + valorEnNavegador("tamanoLetrasCodigoModulo") 
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
   }else{
      hablar("Bienvenidos al Monitor del Sistema de Citas y Turnos de la Cámara de Comercio de Santa Marta para el Magdalena. ¡Creciendo Contigo!");
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
      // abrirInterfaceMonitoreo($(this).serialize());
      window.location.reload();
    }else{
      alertaInformacion("Debes seleccionar al menos una zona de atencion.")
    }
  });
  cargarSedes();
});

function valoresFormularioConfig(
   anchoPantalla, altoPantalla, tiempoConsulta, tiempoTurno, modulosEnVista, pasosEnVista, 
   tamanoLetrasNombreTurno, tamanoLetrasNombreModulo, tamanoLetrasTurnoModulo, tamanoLetrasCodigoModulo
){
   $("#anchoPantalla").val( anchoPantalla );
   $("#altoPantalla").val( altoPantalla );
   $("#tiempoConsulta").val( tiempoConsulta );
   $("#tiempoTurno").val( tiempoTurno );
   $("#modulosEnVista").val( modulosEnVista );
   $("#pasosEnVista").val( pasosEnVista );
   
   $("#tamanoLetrasNombreTurno").val( tamanoLetrasNombreTurno );
   $("#tamanoLetrasNombreModulo").val( tamanoLetrasNombreModulo );
   $("#tamanoLetrasTurnoModulo").val( tamanoLetrasTurnoModulo );
   $("#tamanoLetrasCodigoModulo").val( tamanoLetrasCodigoModulo );
}

</script>