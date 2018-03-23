
var audioElementBeep = document.createElement('audio');
audioElementBeep.setAttribute('src', '/snd/Jetsons-doorbell.mp3');
//audioElementBeep.volumen = 0.5;
function beep() {
    // if(audioElementBeep.ended){
    audioElementBeep.play();
    // }
}


var SEDE = 1;
var AREA_TRABAJO = 6;


var carrusel = null;
var mostrando = 0;
var tiempoMostrarTurnoLlamando;
var ModulosActivos = new Array();
var TurnosLlamando = new Array();
var tiempoConsultarTurnoLlamando;

function iniciarMonitorDeTurnos(anchoModulo, altoModulo, tiempoConsulta, tiempoPresentacion) {
    tiempoMostrarTurnoLlamando = tiempoPresentacion;
    tiempoConsultarTurnoLlamando = tiempoConsulta
    mostrarModulosAtencionActivos(anchoModulo, altoModulo);
    mostrarDatosPanelTurnoLlamando();
    cambiarDatosPanelTurnoLlamando();
    mostrarDatosTurnoLlamandoEnCarrusel();
}
function mostrarModulosAtencionActivos(anchoModulo, altoModulo) {
    var jqxhr = $.ajax({
        async:false,
        method: "POST",
        url: "api.php",
        dataType: "html",
        data: {operacion: "modulosActivos", sedeID: SEDE, areaID: AREA_TRABAJO}
    }).done(function (data) {
        data = JSON.parse(data);
        if (data.RESPUESTA === 'EXITO') {
            arrancarCarruselTurnos(anchoModulo, altoModulo, data);
            buscarTurnosLLamando();
            buscarTurnosAtendiendo();
        }
    }).fail(function (data) {
        console.log("Falló la consulta. Contactar con el Centro TICS.");
        console.log(data);
        // setTimeout( function(){ location.reload() }, 3000);
    });

}

function arrancarCarruselTurnos(anchoModulo, altoModulo, data) {
    var Things = data.DATOS;
    for (var i = 0; i < Things.length; i++) {
        var Modulo = [];
        Modulo["id"] = Things[i].moduloAtencionID;
        Modulo["codigo"] = Things[i].moduloAtencionCODIGO;
        Modulo["nombre"] = Things[i].moduloAtencionTITULO;
        ModulosActivos.push(Modulo);
        $("#carousel").append(
                '<div id="modulo-id-' + Modulo["id"] + '" class="table turno-atendiendo">'
                + '<div id="modulo-turno-' + Modulo["id"] + '" class="col-xs-8 nombre-turno " >LIBRE</div>'
                + '<div id="modulo-codigo-' + Modulo["id"] + '" class="col-xs-4 modulo-turno " style="background-image: url(/img/fondo-turno-llamando.png);" >' + Modulo["nombre"] + '</div>'
                + '</div>'
                );
    }
    var pasos = 4;
    if (ModulosActivos.length < pasos) {
        pasos = ModulosActivos.length;
    }

    carrusel = $("#carousel").rcarousel({
        width: anchoModulo, height: altoModulo,
        step: 4, visible: pasos,
        speed: 5000,
        auto: {
            enabled: true,
            interval: 1357,
            direction: "next"
        }
    });
}
function buscarTurnosLLamando() {
    var jqxhr = $.ajax({
        async:true,
        method: "POST",
        url: "api.php",
        dataType: "html",
        data: {operacion: "turnosLlamando", sedeID: SEDE, areaID: AREA_TRABAJO}
    }).done(function (data) {
        data = JSON.parse(data);
        TurnosLlamando = new Array();
        if (data.RESPUESTA === 'EXITO') {
            var TurnosRecibidos = data.DATOS;
            if (TurnosRecibidos.length) {
                for (var i in TurnosRecibidos) {
                    var Turno = [];
                    Turno["id"] = TurnosRecibidos[i].turnoID;
                    Turno["codigo"] = TurnosRecibidos[i].turnoCODIGO;
                    Turno["nombre"] = TurnosRecibidos[i].Persona.personaNOMBRES;
                    Turno["apellido"] = TurnosRecibidos[i].Persona.personaAPELLIDOS;
                    Turno["identificacion"] = TurnosRecibidos[i].Persona.personaIDENTIFICACION;
                    Turno["moduloID"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionID;
                    Turno["modulo"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionTITULO;
                    TurnosLlamando.push(Turno);
                }                
            }
            mostrarDatosPanelTurnoLlamando();
        }
        buscarTurnosLLamando();
    }).fail(function (data) {
        // console.clear();
        console.log("Falló la consulta. Contactar con el Centro TICS.");
        console.log(data);
        // setTimeout( function(){ location.reload() }, 3000);
    });
}
function mostrarDatosPanelTurnoLlamando() {
    // console.log(TurnosLlamando);
    if (TurnosLlamando.length > 0) {
        if (TurnosLlamando[mostrando].nombre && TurnosLlamando[mostrando].apellido) {
            $("#nombre-turno-llamando").html(TurnosLlamando[mostrando].nombre + " " + TurnosLlamando[mostrando].apellido);
            $("#codigo-modulo-llamando").html(TurnosLlamando[mostrando].modulo);
        }else{
            $("#nombre-turno-llamando").html("");
            $("#codigo-modulo-llamando").html("");
        }
    } else {
        mostrando = 0;
        $("#nombre-turno-llamando").html("");
        $("#codigo-modulo-llamando").html("");
    }
    setTimeout(mostrarDatosPanelTurnoLlamando, tiempoConsultarTurnoLlamando);
}
function cambiarDatosPanelTurnoLlamando(){
    if (TurnosLlamando.length > 0) { beep(); }
    mostrando++;  if (mostrando >= TurnosLlamando.length) mostrando = 0;
    setTimeout(cambiarDatosPanelTurnoLlamando, tiempoMostrarTurnoLlamando);
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
    setTimeout(mostrarDatosTurnoLlamandoEnCarrusel, tiempoConsultarTurnoLlamando);
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

function buscarTurnosAtendiendo(){
        var jqxhr = $.ajax({
        async:true,
        method: "POST",
        url: "api.php",
        dataType : "html",
        data: { operacion: "turnosAtendiendo", sedeID: SEDE, areaID: AREA_TRABAJO }
      }).done(function(data) {
            // console.log( data );
        data = JSON.parse(data); 
        // console.log( "atendiendo" );
        TurnosAtendiendo = new Array();
        if(data.RESPUESTA === 'EXITO'){
            var TurnosRecibidos = data.DATOS;
            // console.log( ModulosActivos );
            // console.log( TurnosRecibidos );
            var moduloAtencionID,  moduloAtencionTITULO,  personaNOMBRES,  personaAPELLIDOS;
            for (var j in ModulosActivos) {
                moduloAtencionID = ModulosActivos[j].id;
                moduloAtencionTITULO = ModulosActivos[j].nombre;
                personaNOMBRES = " ESPERANDO "; 
                personaAPELLIDOS = " TURNO ";
                if(TurnosRecibidos.length){
                    for (var i in TurnosRecibidos) {
                        if(TurnosRecibidos[i].ModuloAtencion.moduloAtencionID == moduloAtencionID ){
                            // console.log(ModulosActivos[j]);
                            // console.log(TurnosRecibidos[i]);
                            personaNOMBRES = TurnosRecibidos[i].Persona.personaNOMBRES; 
                            personaAPELLIDOS = TurnosRecibidos[i].Persona.personaAPELLIDOS;
                        }
                    }
                }
                cargarDatosTurnoAlCarrusel(
                    moduloAtencionID, 
                    moduloAtencionTITULO, 
                    personaNOMBRES, 
                    personaAPELLIDOS
                );    
            }
        }else{
            for (var j in ModulosActivos) {
                cargarDatosTurnoAlCarrusel(
                    ModulosActivos[j].id, 
                    ModulosActivos[j].nombre, 
                    " ESPERANDO ", " TURNO "
                );    
            }
        }
        buscarTurnosAtendiendo();
      }).fail(function(data) {
        console.log( "Falló la consulta. Contactar con el Centro TICS." );
        console.log( data );
        setTimeout( function(){ location.reload() }, 30000);
      });
}
















// function mostrarSiguienteLlamando(){
//     mostrando++;
//     if(mostrando >= TurnosLlamando.length) mostrando = 0;
// }












// function mostrarTurnoAtendiendo(){
//     var jqxhr = $.ajax({
//         method: "POST",
//         url: "api.php",
//         dataType : "json",
//         data: { operacion: "turnosAtendiendo" }
//       }).done(function(data) {
//         console.log(data);
//         if(data.RESPUESTA === 'EXITO'){
//             var Things = data.DATOS;
//             for (var i = Things.length - 1; i >= 0; i--) {
//                 console.log(Things[i].turnoCODIGO);
//                 console.log(Things[i].Persona.personaNOMBRES);
//                 console.log(Things[i].Persona.personaAPELLIDOS);
//                 console.log(Things[i].Persona.personaIDENTIFICACION);
//                 console.log(Things[i].ModuloAtencion.moduloAtencionCODIGO);
//                 console.log(Things[i].ModuloAtencion.moduloAtencionCODIGOTITULO);
//                 console.log(Things[i].TipoCliente.tipoClienteCODIGO);
//                 console.log(Things[i].TipoCliente.tipoClienteTITULO);
//             }
//         }
//       })
//       .fail(function(data) {
//         console.log( "Falló la consulta. Contactar con el Centro TICS." );
//         console.log( data );
//         setTimeout( function(){ location.reload() }, 3000);
//       });

// }



// function mostrarTurnoLlamando(tiempo){


// }



















