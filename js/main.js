
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
    mostrarDatosTurnoLlamando();
}
function mostrarModulosAtencionActivos(anchoModulo, altoModulo) {
    var jqxhr = $.ajax({
        method: "POST",
        url: "api.php",
        dataType: "html",
        data: {operacion: "modulosActivos", sedeID: SEDE, areaID: AREA_TRABAJO}
    }).done(function (data) {
        // console.log( "Modulos de Atencion" );
        // console.log( data );
        data = JSON.parse(data);
        if (data.RESPUESTA === 'EXITO') {
            arrancarCarruselTurnos(anchoModulo, altoModulo, data);
            setInterval(buscarTurnosLLamando, tiempoConsultarTurnoLlamando);
            // 			buscarTurnosAtendiendo();
        }
    })
            .fail(function (data) {
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
        method: "POST",
        url: "api.php",
        dataType: "html",
        data: {operacion: "turnosLlamando", sedeID: SEDE, areaID: AREA_TRABAJO}
    }).done(function (data) {
        console.log("Siguiente");
        // console.log( data );
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
                mostrarDatosTurnoLlamando();
            }
        }
        console.log("EN LISTA");
        console.log(TurnosLlamando);
        setTimeout(buscarTurnosLLamando, tiempoConsultarTurnoLlamando);
    }).fail(function (data) {
        console.clear();
        console.log("Falló la consulta. Contactar con el Centro TICS.");
        console.log(data);
        // setTimeout( function(){ location.reload() }, 3000);
    });
}
function mostrarDatosTurnoLlamando() {

    console.log("mostra en panel");
    if (TurnosLlamando.length > 0) {
        console.log(" SI ");
        beep();
        if (TurnosLlamando[mostrando].nombre && TurnosLlamando[mostrando].apellido) {
            $("#nombre-turno-llamando").html(TurnosLlamando[mostrando].nombre + " " + TurnosLlamando[mostrando].apellido);
        }
        $("#codigo-modulo-llamando").html(TurnosLlamando[mostrando].modulo);

        cargarDatosTurnoLlamandoAlCarrusel(
                TurnosLlamando[mostrando].moduloID,
                TurnosLlamando[mostrando].modulo,
                TurnosLlamando[mostrando].nombre,
                TurnosLlamando[mostrando].apellido
                );
        mostrando++;
        if (mostrando >= TurnosLlamando.length)
            mostrando = 0;
    } else {
        console.log(" NO ");
        mostrando = 0;
        $("#nombre-turno-llamando").html("");
        $("#codigo-modulo-llamando").html("");
    }

    setTimeout(mostrarDatosTurnoLlamando, tiempoMostrarTurnoLlamando);
}
function cargarDatosTurnoLlamandoAlCarrusel(moduloID, moduloCODIGO, turnoNOMBRE, turnoAPELLIDO) {
    var nombreCompleto = turnoNOMBRE + " " + turnoAPELLIDO;
    var data = carrusel.data("data");
    for (var i in data.paths) {
        var elemCarrusel = data.paths[i][0];
        if (elemCarrusel.id == 'modulo-id-' + moduloID + '') {
            $("#carousel #modulo-turno-" + moduloID).html(nombreCompleto);
            $div = $(elemCarrusel);
            $div.find('#modulo-turno-' + moduloID).html(nombreCompleto);
        }
    }
}

// function buscarTurnosAtendiendo(){
//         var jqxhr = $.ajax({
//         method: "POST",
//         url: "api.php",
//         dataType : "json",
//         data: { operacion: "turnosLlamando" }
//       }).done(function(data) {
//         console.clear();  
//         console.log( "Siguiente" );
//         console.log( data );
//         // data = JSON.parse(data);
//         TurnosLlamando = new Array();
//         if(data.RESPUESTA === 'EXITO'){
//             var TurnosRecibidos = data.DATOS;
//             if(TurnosRecibidos.length){
//                 for (var i in TurnosRecibidos) {

//                     var Turno = [];
//                     Turno["id"] = TurnosRecibidos[i].turnoID;
//                     Turno["codigo"] = TurnosRecibidos[i].turnoCODIGO;
//                     Turno["nombre"] = TurnosRecibidos[i].Persona.personaNOMBRES;
//                     Turno["apellido"] = TurnosRecibidos[i].Persona.personaAPELLIDOS;
//                     Turno["identificacion"] = TurnosRecibidos[i].Persona.personaIDENTIFICACION;
//                     Turno["moduloID"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionID;
//                     Turno["modulo"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionTITULO;

//                     TurnosLlamando.push( Turno ); 


//                     // console.log(TurnosRecibidos[i].Persona.personaNOMBRES + " " + TurnosRecibidos[i].Persona.personaAPELLIDOS);
//                     // console.log(TurnosRecibidos[i].Persona.personaIDENTIFICACION);
//                     // console.log(TurnosRecibidos[i].ModuloAtencion.moduloAtencionCODIGO);
//                     // console.log(TurnosRecibidos[i].TipoCliente.tipoClienteCODIGO);
//                     // console.log(TurnosRecibidos[i].TipoCliente.tipoClienteTITULO);
//                 }
//             }
//         }

//         clearTimeout(tiempoTurnoLlamando);
//         tiempoTurnoLlamando = setTimeout(mostrarTurnoLlamando, tiempo );

//       }).fail(function(data) {
//         console.clear();  
//         console.log( "Falló la consulta. Contactar con el Centro TICS." );
//         console.log( data );
//         // setTimeout( function(){ location.reload() }, 3000);
//       });
// }
















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



















