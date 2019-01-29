/* global $ */
/* global ApiSicam */
var audioElementBeep = document.createElement('audio');
audioElementBeep.setAttribute('type', "audio/mpeg");
audioElementBeep.setAttribute('src', '/snd/Jetsons-doorbell.mp3');
//audioElementBeep.volumen = 0.5;
function cambiarModoMONITOR(){
  $("#pnl-control-vistas").addClass('hover');
  $("body").css('overflow','hidden');
}
function cambiarModoCONFIGURACION(){
  $("#pnl-control-vistas").removeClass('hover');
  $("body").css('overflow','auto');
}
function turnoEncontrado() {
    // if(audioElementBeep.ended){
    audioElementBeep.volume = 0.35;
    audioElementBeep.play();
    // }
}
function calcularTiempoHablar(){
    if( TurnosLlamando.length > 0){
        var calculo = ( TIEMPO_PARA_HABLAR_MAX - (TIEMPO_PARA_HABLAR_MIN * Math.log( TurnosLlamando.length ) ) + ( TurnosLlamando.length / (TIEMPO_PARA_HABLAR_MAX)  ) );
        //console.log( "tiempo para hbalar calculado : "  );
        //console.log( 1000 * calculo );
        if( calculo <= TIEMPO_PARA_HABLAR_MIN ){
            return 1000*TIEMPO_PARA_HABLAR_MIN;
        }
        return 1000 * ( calculo );
    }
    return 1000*TIEMPO_PARA_HABLAR_MIN;
}


var TIEMPO_PARA_HABLAR = 11000;
var TIEMPO_PARA_HABLAR_MAX = 11;
var TIEMPO_PARA_HABLAR_MIN = 5;
var TIEMPO_PAUSA_PASOS = 3500;
var VELOCIDAD_CARRUSEL = 1500;
var TIEMPO_CONSULTA = 5000;
var TIEMPO_PRESENTACION = 5000;
var CANTIDAD_MODULOS_MOSTRANDO = 4;
var PASOS_MODULOS_MOSTRANDO = 2;

var ZonasAtencion = 6;
var carrusel = null;
var mostrando = 0;
var diciendo = 0;
var tiempoMostrarTurnoLlamando;
var ModulosActivos = new Array();
var TurnosLlamando = new Array();
var TurnosAtendiendo = new Array();
var tiempoConsultarTurnoLlamando;

var contadorRecarga = 0;
var tiempoRecarga = 15; //Minutos
// Inicializar el panel de monitores los turnos
function inciarMonitorTurnosCCSM(){
    $( "#areaTrabajo" ).load( "html/panel-control.html.php", function() {});
}
function cargarInterfaceMonitoreo(datosConfiguracion){
    ////console.log( datosConfiguracion );
    $.post( 
        "html/monitor.html.php", 
        datosConfiguracion
    ).done(function( data ) {
        $( "#areaTrabajo2" ).html( data );
        setInterval( function(){ contadorRecarga++; if( contadorRecarga == tiempoRecarga ){ window.location.reload(); }  }, 60000 );
    });
}

function guardarEnNavegador( nombreVariable, valorVariable){
    if( window.localStorage ){
        return localStorage.setItem( nombreVariable, valorVariable);
    }else{
        alert("no se pudo guardar en el navegador")
    }
}

function valorEnNavegador( nombreVariable ){
    if( window.localStorage ){
        return localStorage.getItem(nombreVariable);
    }else{
        alert("no se pudo guardar en el navegador")
    }
}

function borrarValorEnNavegador( nombreVariable ){
    if( window.localStorage ){
        return localStorage.removeItem(nombreVariable);
    }else{
        alert("no se pudo guardar en el navegador")
    }
}

function limpiarDatosEnNavegador(){
    if( window.localStorage ){
        return localStorage.clear();
    }else{
        alert("no se pudo guardar en el navegador")
    }
}


function panelVistaSedeZonaAtencion( Sede, Zona ){
  var html = '';
  
  html += '<div class="col-sm-4 col-md-3 col-lg-3 col-xs-6"><label class=" " style="width: 100%; cursor: pointer;" >';
  html += '<div class="thumbnail"> <img src="img/gente.jpg" alt="Thumbnail Image 1" class="img-responsive" style="width: 100%;height: 60px;" />';
  html += '<div class="caption">';
  html += '<h4>' + Zona.puestoTrabajoTITULO + '</h4>';
  html += '<p>Sede: ' + Sede.sedeTITULO + '<br />Modulos de Atención: ' + Zona.puestoTrabajoNUMMODULOSATENCION + '</p>';
  html += '<p><input type="checkbox" class=" check_zonasatencion_sedes" id="puestoSeleccionado' + Zona.puestoTrabajoID + '" name="puestosSeleccionados[]" value="' + Zona.puestoTrabajoID + '">Seleccionar este</p>';
  html += '</div>';
  html += '</div>';
  html += '</label></div>';
  
  return html;
}
function abrirInterfaceMonitoreo( datosSerializado ){
    cargarInterfaceMonitoreo( datosSerializado );
}
function cargarSedes(){
  bloqueoCargando();    
  var datosConsulta = [];
  ApiSicam.ejecutar(
      'atencionpublico/TurnosApp/datosSedesZonasAtencion', 
      datosConsulta, 
      cargarDatosZonasAtencion
  ); 
  function cargarDatosZonasAtencion(datos){
    $.each(datos, function(i, Sede) {
        if( Sede.ZonasAtencion.length ){
          $.each(Sede.ZonasAtencion, function(i, Zona) {
            $("#div-listado-zonatencion").append( panelVistaSedeZonaAtencion( Sede, Zona ) );
          });
        }
        desbloqueoCargando();
    });
  }
}

function iniciarPresentacionTurnos() {
    mostrarModulosAtencionActivos();
    mostrarDatosPanelTurnoLlamando();
    cambiarDatosPanelTurnoLlamando();
    decirDatosTurnoLlamando();
    cambiarDecirDatosTurnoLlamando();
    mostrarDatosTurnoLlamandoEnCarrusel();
    mostrarDatosTurnoAtendiendoEnCarrusel();
}

function mostrarModulosAtencionActivos() {
    var datosConsulta= ZonasAtencion;
    ApiSicam.ejecutar(
      'atencionpublico/TurnosApp/mostrarModulosZonasAtencion', 
      datosConsulta, 
      recibirDatosYArrancarCarrusel
    ); 
  
}

function recibirDatosYArrancarCarrusel (datos){
  if(datos){
  
    $.each(datos, function(i, modulo) {
        var Modulo = [];
        Modulo["id"] = modulo.moduloAtencionID;
        Modulo["codigo"] = modulo.moduloAtencionCODIGO;
        Modulo["nombre"] = modulo.moduloAtencionTITULO;
        ModulosActivos.push(Modulo);
        $("#carousel").append(
          '<div id="modulo-id-' + modulo.moduloAtencionID+ '" class="table turno-atendiendo">'
          + '<div id="modulo-turno-' + modulo.moduloAtencionID + '" class="col-xs-8 nombre-turno " ></div>'
          + '<div id="modulo-codigo-' + modulo.moduloAtencionID + '" class="col-xs-4 modulo-turno " style="background-image: url(/img/fondo-turno-llamando.png);" >' + modulo.moduloAtencionTITULO + '</div>'
          + '</div>'
        );
        
    });
    
    var pasos = PASOS_MODULOS_MOSTRANDO;
    if (ModulosActivos.length < pasos) {
        pasos = ModulosActivos.length;
    }
    
    if (ModulosActivos.length){
      if( pasos > CANTIDAD_MODULOS_MOSTRANDO ){
        ////console.log('pintando carrusel  ' + CANTIDAD_MODULOS_MOSTRANDO);
        carrusel = $("#carousel").rcarousel({
            width: parseInt(anchoModulo), 
            height: parseInt(altoModulo),
            step: parseInt(2), 
            visible: parseInt(CANTIDAD_MODULOS_MOSTRANDO),
            speed: parseInt(VELOCIDAD_CARRUSEL),
            animated: true,
            auto: {
                enabled: true,
                interval: parseInt(TIEMPO_PAUSA_PASOS),
                direction: "next"
            }
        });
      }else{
        ////console.log('menor a lo programado ' + pasos);
        carrusel = $("#carousel").rcarousel({
          width: parseInt(anchoModulo), 
          height: parseInt(altoModulo),
          step: parseInt(2), 
          visible: parseInt(pasos),
          speed: parseInt(VELOCIDAD_CARRUSEL),
          animated: true,
          auto: {
              enabled: true,
              interval: parseInt(TIEMPO_PAUSA_PASOS),
              direction: "next"
          }
        });
      }
      
      buscarTurnosLLamando();
      buscarTurnosAtendiendo();
    }
    
  }else{
    return false;
  }
  return true;
}

function mostrarDatosPanelTurnoLlamando() {
    if (TurnosLlamando.length > 0) {
        if( TurnosLlamando[mostrando] ){
            if (TurnosLlamando[mostrando].nombre && TurnosLlamando[mostrando].apellido) {
                $("#nombre-turno-llamando").html(TurnosLlamando[mostrando].nombre + " " + TurnosLlamando[mostrando].apellido);
                $("#codigo-modulo-llamando").html(TurnosLlamando[mostrando].modulo);
            }else{
                $("#nombre-turno-llamando").html(TurnosLlamando[mostrando].cedula);
                $("#codigo-modulo-llamando").html(TurnosLlamando[mostrando].modulo);
            }
        }
    } else {
        mostrando = 0;
        $("#nombre-turno-llamando").html("");
        $("#codigo-modulo-llamando").html("");
    }
    setTimeout(mostrarDatosPanelTurnoLlamando, TIEMPO_CONSULTA);
}
function cambiarDatosPanelTurnoLlamando(){
    if (TurnosLlamando.length > 0) { turnoEncontrado(); }
    mostrando++;  if (mostrando >= TurnosLlamando.length) mostrando = 0;
    setTimeout(cambiarDatosPanelTurnoLlamando, TIEMPO_PRESENTACION);
}
function decirDatosTurnoLlamando() {
    if (TurnosLlamando.length > 0) {
        if( TurnosLlamando[diciendo] ){
            if (TurnosLlamando[diciendo].nombre && TurnosLlamando[diciendo].apellido) {
                hablar( 
                    primeraMayuscula(TurnosLlamando[diciendo].nombre) + " " + 
                    primeraMayuscula(TurnosLlamando[diciendo].apellido) + 
                    ". " + primeraMayuscula(TurnosLlamando[diciendo].modulo) + "."
                );
            }else{
                // hablar( 
                //     "Atención: Cédula " + TurnosLlamando[diciendo].cedula + ". Repito: Cédula " + TurnosLlamando[diciendo].cedula + 
                //     ". Por favor, ir al módulo " + TurnosLlamando[diciendo].modulo 
                // );
            }
        }
    } else {
        diciendo = 0;
        hablar(" " );
    }
    setTimeout(decirDatosTurnoLlamando, calcularTiempoHablar() );
    //console.log("hablar "+ diciendo );
}
function cambiarDecirDatosTurnoLlamando(){
    if (TurnosLlamando.length > 0) { }
    diciendo++;  if (diciendo >= TurnosLlamando.length) diciendo = 0;
    setTimeout(cambiarDecirDatosTurnoLlamando, TIEMPO_PRESENTACION*2);
    //console.log("cambiar  "+ diciendo );
}
function mostrarDatosTurnoLlamandoEnCarrusel() {
    if (TurnosLlamando.length > 0) {
        for (var i in TurnosLlamando) {
            cargarDatosTurnoAlCarrusel(
                TurnosLlamando[i].moduloID, 
                TurnosLlamando[i].modulo, 
                TurnosLlamando[i].nombre, TurnosLlamando[i].apellido
            );        
        }
    } 
    setTimeout(mostrarDatosTurnoLlamandoEnCarrusel, TIEMPO_CONSULTA);
}
function mostrarDatosTurnoAtendiendoEnCarrusel() {
    if (TurnosAtendiendo.length > 0) {
        for (var i in TurnosAtendiendo) {
            cargarDatosTurnoAlCarrusel(
                TurnosAtendiendo[i].moduloID, 
                TurnosAtendiendo[i].modulo, 
                TurnosAtendiendo[i].nombre, TurnosAtendiendo[i].apellido
            );        
        }
    } 
    setTimeout(mostrarDatosTurnoAtendiendoEnCarrusel, TIEMPO_CONSULTA);
}

//Llamados cuando el monitor ya arrancó
function buscarTurnosLLamando() {
    var datosConsulta= ZonasAtencion;
    ApiSicam.ejecutar(
      'atencionpublico/TurnosApp/mostrarLlamandoZonasAtencion', 
      datosConsulta, 
      recibirDatosTurnoLlamandoyCargar
    );
}

function recibirDatosTurnoLlamandoyCargar( Turnos ){
    
            //console.log( Turnos );     
    TurnosLlamando = new Array();
    if (Turnos && Turnos.length) {
        var TurnosRecibidos = Turnos;
        if (TurnosRecibidos.length) {
            for (var i in TurnosRecibidos) {
                var Turno = [];
                Turno["id"] = TurnosRecibidos[i].turnoID;
                Turno["codigo"] = TurnosRecibidos[i].turnoCODIGO;
                Turno["nombre"] = TurnosRecibidos[i].Persona.personaNOMBRES;
                Turno["apellido"] = TurnosRecibidos[i].Persona.personaAPELLIDOS;
                Turno["identificacion"] = TurnosRecibidos[i].Persona.personaIDENTIFICACION;
                Turno["moduloID"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionID;
                Turno["modulo"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionDESCRIPCION;
                TurnosLlamando.push(Turno);
            } 
            //console.log( TurnosLlamando );               
        }
        mostrarDatosPanelTurnoLlamando();
    }
    buscarTurnosLLamando();
}



//Llamados cuando el monitor ya arrancó
function buscarTurnosAtendiendo() {
    var datosConsulta= ZonasAtencion;
    ApiSicam.ejecutar(
      'atencionpublico/TurnosApp/mostrarAtendiendoZonasAtencion', 
      datosConsulta, 
      recibirDatosTurnoAtendiendoyCargar
    );
}

function recibirDatosTurnoAtendiendoyCargar( Turnos ){
    
    TurnosAtendiendo = new Array();
    if (Turnos && Turnos.length) {
        var TurnosRecibidos = Turnos;
        if (TurnosRecibidos.length) {
            for (var i in TurnosRecibidos) {
                var Turno = [];
                Turno["id"] = TurnosRecibidos[i].turnoID;
                Turno["codigo"] = TurnosRecibidos[i].turnoCODIGO;
                Turno["nombre"] = TurnosRecibidos[i].Persona.personaNOMBRES;
                Turno["apellido"] = TurnosRecibidos[i].Persona.personaAPELLIDOS;
                Turno["identificacion"] = TurnosRecibidos[i].Persona.personaIDENTIFICACION;
                Turno["moduloID"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionID;
                Turno["modulo"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionDESCRIPCION;
                TurnosAtendiendo.push(Turno);
            } 
            //console.log( TurnosAtendiendo );               
        }
    }
    buscarTurnosAtendiendo();
}




function cargarDatosTurnoAlCarrusel(moduloID, moduloCODIGO, turnoNOMBRE, turnoAPELLIDO) {
    var nombreCompleto = turnoNOMBRE + " " + turnoAPELLIDO;
    var data = carrusel.data("data");
    for (var i in data.paths) {
        var elemCarrusel = data.paths[i][0];
        if (elemCarrusel.id == 'modulo-id-' + moduloID + '') {
            $("#carousel #modulo-turno-" + moduloID).html(nombreCompleto);
        }
    }
}

function hablar(textoParaDecir){
    if(textoParaDecir != ""){
    $.get( 
        "apis/text-to-speech.php", 
        { texto: textoParaDecir },
        function ( respuesta ){
          $("#codigoOculto").html(respuesta);
        }
      );
    }
}

function primeraMayuscula(texto){
    texto = texto.toLowerCase();
    return texto.charAt(0).toUpperCase() + texto.substr(1)
}




//turnoEncontrado();  