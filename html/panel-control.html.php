<form id="frm-configuracion" class="form-horizontal" method="post" onsubmit="return false;" >
   <h2 class="text-center">Seleccione las Zonas de Atención:</h2>
   <hr><div class="text-center"><button type="submit" class="btn btn-primary" >Continuar</button></div><hr>
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
      </div>
      </div>
      </div>
   </div></div>
</form>

<script>
$( document ).ready(function() {
  $("#anchoPantalla").val( window.screen.availWidth );
  $("#altoPantalla").val( window.screen.availHeight );
  $("#tiempoConsulta").val( 1000 );
  $("#tiempoTurno").val( 4000 );
  $("#modulosEnVista").val( 4 );
  $("#pasosEnVista").val( 4 );
  $("#frm-configuracion").submit(function(){
    if( $('input[type=checkbox]:checked').length ) {
      abrirInterfaceMonitoreo();
    }else{
      alertaInformacion("Debes seleccionar al menos una zona de atencion.")
    }
  });
  cargarSedes();
});

</script>