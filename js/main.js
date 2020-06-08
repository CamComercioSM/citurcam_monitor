/* global $ */
/* global ApiSicam */
var audioElementBeep = document.createElement('audio');
audioElementBeep.setAttribute('type', "audio/mpeg");
audioElementBeep.setAttribute('src', '../snd/timbre_turnos.mp3');
var audioElementWSP = document.createElement('audio');
audioElementWSP.setAttribute('type', "audio/mpeg");
audioElementWSP.setAttribute('src', '../snd/whatsapp_whistle.mp3');
var audioElementBRILLO = document.createElement('audio');
audioElementBRILLO.setAttribute('type', "audio/mpeg");
audioElementBRILLO.setAttribute('src', '../snd/brillo.mp3');
//audioElementBeep.volumen = 0.5;
function cambiarModoMONITOR() {
    $("#pnl-control-vistas").addClass('hover');
    $("body").css('overflow', 'hidden');
}
function cambiarModoCONFIGURACION() {
    $("#pnl-control-vistas").removeClass('hover');
    $("body").css('overflow', 'auto');
}
function turnoEncontrado() {
    // if(audioElementBeep.ended){
    audioElementBeep.volumen = 0.40;
    audioElementBeep.play();
//    audioElementWSP.play();

    // }
}
function calcularTiempoHablar() {
    if (TurnosLlamando.length > 0) {
        var calculo = (TIEMPO_PARA_HABLAR_MAX - (TIEMPO_PARA_HABLAR_MIN * Math.log(TurnosLlamando.length)) + (TurnosLlamando.length / (TIEMPO_PARA_HABLAR_MAX)));
        ////console.log( "tiempo para hbalar calculado : "  );
        ////console.log( 1000 * calculo );
        if (calculo <= TIEMPO_PARA_HABLAR_MIN) {
            return 1000 * TIEMPO_PARA_HABLAR_MIN;
        }
        return 1000 * (calculo);
    }
    return 1000 * TIEMPO_PARA_HABLAR_MIN;
}


var TIEMPO_PARA_HABLAR = 6000;
var TIEMPO_PARA_HABLAR_MAX = 10;
var TIEMPO_PARA_HABLAR_MIN = 7;
var TIEMPO_PAUSA_PASOS = 3500;
var VELOCIDAD_CARRUSEL = 1500;
var TIEMPO_CONSULTA = 4000;
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
var tiempoRecarga = 999; //Minutos
// Inicializar el panel de monitores los turnos
function inciarMonitorTurnosCCSM() {
    $("#areaTrabajo").load("html/panel-control.html.php", function () {
        desbloqueoCargando();
    });
}
function cargarInterfaceMonitoreo(datosConfiguracion) {
    //////console.log( datosConfiguracion );
    $.post(
        "html/monitor.html.php",
        datosConfiguracion
        ).done(function (data) {
        $("#areaTrabajo2").html(data);
//        setInterval(function () {
//            contadorRecarga++;
//            if (contadorRecarga == tiempoRecarga) {
//                window.location.reload();
//            }
//        }, 60000);
    });
}

function guardarEnNavegador(nombreVariable, valorVariable) {
    if (window.localStorage) {
        return localStorage.setItem(nombreVariable, valorVariable);
    } else {
        alert("no se pudo guardar en el navegador")
    }
}

function valorEnNavegador(nombreVariable) {
    if (window.localStorage) {
        return localStorage.getItem(nombreVariable);
    } else {
        alert("no se pudo guardar en el navegador")
    }
}

function borrarValorEnNavegador(nombreVariable) {
    if (window.localStorage) {
        return localStorage.removeItem(nombreVariable);
    } else {
        alert("no se pudo guardar en el navegador")
    }
}

function limpiarDatosEnNavegador() {
    if (window.localStorage) {
        return localStorage.clear();
    } else {
        alert("no se pudo guardar en el navegador")
    }
}


function panelVistaSedeZonaAtencion(Sede, Zona) {
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
function abrirInterfaceMonitoreo(datosSerializado) {
    cargarInterfaceMonitoreo(datosSerializado);
}
function cargarSedes() {
    bloqueoCargando();
    var datosConsulta = [];
    ApiSicam.ejecutar(
        'tienda-apps/TurnosApp/datosSedesZonasAtencion',
        datosConsulta,
        cargarDatosZonasAtencion
        );
    function cargarDatosZonasAtencion(datos) {
        $.each(datos, function (i, Sede) {
            if (Sede.ZonasAtencion.length) {
                $.each(Sede.ZonasAtencion, function (i, Zona) {
                    $("#div-listado-zonatencion").append(panelVistaSedeZonaAtencion(Sede, Zona));
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
    mostrarTurnosPendientesTiposServicios();
}

function mostrarModulosAtencionActivos() {
    var datosConsulta = ZonasAtencion;
    ApiSicam.ejecutar(
        'tienda-apps/TurnosApp/mostrarModulosZonasAtencion',
        datosConsulta,
        recibirDatosYMostrarTabla
        );

}

function recibirDatosYMostrarTabla(datos) {
    if (datos) {

        $.each(datos, function (i, modulo) {
            var Modulo = [];
            Modulo["id"] = modulo.moduloAtencionID;
            Modulo["codigo"] = modulo.moduloAtencionCODIGO;
            Modulo["nombre"] = modulo.moduloAtencionTITULO;
            ModulosActivos.push(Modulo);
            $("#tabla_atendiendo").append(
                '<li id="modulo-id-' + modulo.moduloAtencionID + '" class="table turno-atendiendo">'
                + '<table style="width:100%"><tr><td>'
                + '<div id="modulo-codigo-' + modulo.moduloAtencionID + '" class="modulo-turno " style="background-image: url(img/fondo-turno-llamando.png);" >' + modulo.moduloAtencionTITULO + '</div>'
                + '</td></tr><tr><td>'
                + '<div id="modulo-turno-' + modulo.moduloAtencionID + '" class="nombre-turno " ></div>'
                + '</td></tr></table>'
                + '</li>'
                );

        });
        buscarTurnosLLamando();
        buscarTurnosAtendiendo();
    } else {
        return false;
    }
    return true;
}


var PendientesTiposServicios = [];
function mostrarTurnosPendientesTiposServicios() {
    var datosConsulta = ZonasAtencion;
    ApiSicam.ejecutar(
        'tienda-apps/TurnosApp/mostrarTurnosPendientesTiposServicios',
        datosConsulta,
        recibirDatosYArrancarCarrusel
        );

}

function recibirDatosYArrancarCarrusel(datos) {
    //console.log(datos);
    if (datos) {


        //console.log('leyendo datos desde el servidor  de turnos pendientes');

        $.each(datos, function (i, datos) {
            var TiposServicios = [];
            TiposServicios["id"] = datos.turnoTipoServicioID;
            TiposServicios["codigo"] = datos.turnoTipoServicioCODIGO;
            TiposServicios["nombre"] = datos.turnoTipoServicioTITULO;
            TiposServicios["pendientes"] = datos.Pendientes;
            PendientesTiposServicios.push(TiposServicios);
            //console.log(TiposServicios);
            $("#carousel").append(
                '<div id="tiposervicio-id-' + datos.turnoTipoServicioID + '" class="table turno-pendiente">'
                + '<div id="tiposervicio-codigo-' + datos.turnoTipoServicioID + '" class="col-xs-6 modulo-turno ' + datos.turnoTipoServicioCODIGO + '"  >' + datos.turnoTipoServicioTITULO + '</div>'
                + '<div id="tiposervicio-turno-' + datos.turnoTipoServicioID + '" class="col-xs-6 nombre-turno " >' + datos.Pendientes + '</div>'
                + '</div>'
                );

        });
        var pasos = PASOS_MODULOS_MOSTRANDO;
        if (PendientesTiposServicios.length < pasos) {
            pasos = PendientesTiposServicios.length;
        }

        if (PendientesTiposServicios.length) {
            if (pasos > CANTIDAD_MODULOS_MOSTRANDO) {
                //////console.log('pintando carrusel  ' + CANTIDAD_MODULOS_MOSTRANDO);
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
            } else {
                //////console.log('menor a lo programado ' + pasos);
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

            buscarDatosTurnosPendientesTiposServicios();
            mostrarDatosTurnoPendientesEnCarrusel();
        }

    } else {
        return false;
    }
    return true;
}

function buscarDatosTurnosPendientesTiposServicios() {
    var datosConsulta = ZonasAtencion;
    ApiSicam.ejecutar(
        'tienda-apps/TurnosApp/mostrarTurnosPendientesTiposServicios',
        datosConsulta,
        cargarDatosTurnoPendientesEnCarrusel
        );

}

function cargarDatosTurnoPendientesEnCarrusel(datos) {
//    console.log(datos);
    if (datos) {


//        console.log('leyendo datos desde el servidor  de turnos pendientes');

        PendientesTiposServicios = new Array();
        $.each(datos, function (i, datos) {
            var TiposServicios = [];
            TiposServicios["id"] = datos.turnoTipoServicioID;
            TiposServicios["codigo"] = datos.turnoTipoServicioCODIGO;
            TiposServicios["nombre"] = datos.turnoTipoServicioTITULO;
            TiposServicios["pendientes"] = datos.Pendientes;
            PendientesTiposServicios.push(TiposServicios);
            //console.log(TiposServicios);
        });

    } else {
        return false;
    }
    setTimeout(buscarDatosTurnosPendientesTiposServicios, 1579);
    return true;
}

function mostrarDatosTurnoPendientesEnCarrusel() {
//    console.log('leyendo el buffer de turnos pendientes');
    if (PendientesTiposServicios.length > 0) {
        for (var i in PendientesTiposServicios) {
//            console.log(PendientesTiposServicios[i]);
            cargarDatosTurnoAlCarrusel(
                PendientesTiposServicios[i].id,
                PendientesTiposServicios[i].codigo,
                PendientesTiposServicios[i].nombre,
                PendientesTiposServicios[i].pendientes
                );
        }
    }
    setTimeout(mostrarDatosTurnoPendientesEnCarrusel, TIEMPO_CONSULTA);
}

function cargarDatosTurnoAlCarrusel(turnoID, turnoCODIGO, turnoNOMBRE, turnoPENDIENTES) {
    var data = carrusel.data("data");
    for (var i in data.paths) {
        var elemCarrusel = data.paths[i][0];
        if (elemCarrusel.id == 'tiposervicio-id-' + turnoID + '') {
            var antes = $("#tiposervicio-id-" + turnoID + " #tiposervicio-turno-" + turnoID + " #tiposervicio-pendiente-" + turnoID + " ").html();
            //console.log(antes);
            if (turnoPENDIENTES == antes) {
                $("#tiposervicio-id-" + turnoID + " #tiposervicio-turno-" + turnoID + "").html("<div id='tiposervicio-pendiente-" + turnoID + "' class=' cambio ' >" + turnoPENDIENTES + "</div>");
            } else {
                $("#tiposervicio-id-" + turnoID + " #tiposervicio-turno-" + turnoID + "").html("<div id='tiposervicio-pendiente-" + turnoID + "' class='animated rubberBand cambio_aumenta' >" + turnoPENDIENTES + "</div>");
            }

        }
    }
}


function mostrarDatosPanelTurnoLlamando() {
    if (TurnosLlamando.length > 0) {
        if (TurnosLlamando[mostrando]) {
            if (TurnosLlamando[mostrando].nombre && TurnosLlamando[mostrando].apellido) {
                $("#nombre-turno-llamando").html(TurnosLlamando[mostrando].codigo + " " + TurnosLlamando[mostrando].nombre + " " + TurnosLlamando[mostrando].apellido);
                $("#codigo-modulo-llamando").html(TurnosLlamando[mostrando].modulo);
                //console.log("Llamando......")
                //console.log(TurnosLlamando[mostrando].nombre + " " + TurnosLlamando[mostrando].apellido);
                //console.log(TurnosLlamando[mostrando].modulo);
            } else {
                $("#nombre-turno-llamando").html(TurnosLlamando[mostrando].codigo);
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
function cambiarDatosPanelTurnoLlamando() {
    if (TurnosLlamando.length > 0) {
        turnoEncontrado();
    }
    mostrando++;
    if (mostrando >= TurnosLlamando.length)
        mostrando = 0;
    setTimeout(cambiarDatosPanelTurnoLlamando, TIEMPO_PRESENTACION);
}
function decirDatosTurnoLlamando() {
    //console.log(TurnosLlamando);
    if (TurnosLlamando.length > 0) {
        if (TurnosLlamando[diciendo]) {

            $textoHablar = primeraMayuscula(TurnosLlamando[diciendo].codigo) + ". " + primeraMayuscula(TurnosLlamando[diciendo].modulo) + ".";
            if (TurnosLlamando[diciendo].nombre && TurnosLlamando[diciendo].apellido) {
                $textoHablar =
                    primeraMayuscula(TurnosLlamando[diciendo].codigo) + ". " +
                    primeraMayuscula(TurnosLlamando[diciendo].nombre) + " " +
                    primeraMayuscula(TurnosLlamando[diciendo].apellido) +
                    ". " + primeraMayuscula(TurnosLlamando[diciendo].modulo) + ".";
            } else {
                // hablar( 
                //     "Atención: Cédula " + TurnosLlamando[diciendo].cedula + ". Repito: Cédula " + TurnosLlamando[diciendo].cedula + 
                //     ". Por favor, ir al módulo " + TurnosLlamando[diciendo].modulo 
                // );            
            }

            if (TurnosLlamando[diciendo].tipoClienteID == 2) {
                $textoHablar += " Afiliado.";
                TurnoEspecialAfiliados();
            } else if (TurnosLlamando[diciendo].turnoPrioridadID > 1) {
                $textoHablar += " Turno Prioritario.";
                TurnoEspecial();
            }


            hablar($textoHablar);

        }
    } else {
        diciendo = 0;
        //hablar("");
    }
    setTimeout(decirDatosTurnoLlamando, calcularTiempoHablar());
    ////console.log("hablar "+ diciendo );
}
function TurnoEspecial() {
    $("#estrella").addClass('scale-up-center');
    setTimeout(function () {
        $("#estrella").removeClass('scale-up-center');
    }, 1234)
    audioElementBRILLO.volumen = 0.9;
    audioElementBRILLO.play();
}
function TurnoEspecialAfiliados() {
    $("#estrella-afiliados").addClass('scale-up-center');
    setTimeout(function () {
        $("#estrella-afiliados").removeClass('scale-up-center');
    }, 1234)
    audioElementBRILLO.volumen = 0.9;
    audioElementBRILLO.play();
}

function cambiarDecirDatosTurnoLlamando() {
    if (TurnosLlamando.length > 0) {
    }
    diciendo++;
    if (diciendo >= TurnosLlamando.length)
        diciendo = 0;
    setTimeout(cambiarDecirDatosTurnoLlamando, TIEMPO_PRESENTACION * 2);
    ////console.log("cambiar  "+ diciendo );
}
function mostrarDatosTurnoLlamandoEnCarrusel() {
//    if (TurnosLlamando.length > 0) {
//        for (var i in TurnosLlamando) {
//            cargarDatosTurnoAlCarrusel(
//                    TurnosLlamando[i].moduloID,
//                    TurnosLlamando[i].modulo,
//                    TurnosLlamando[i].nombre, TurnosLlamando[i].apellido
//                    );
//        }
//    }
//    setTimeout(mostrarDatosTurnoLlamandoEnCarrusel, TIEMPO_CONSULTA);
}
function mostrarDatosTurnoAtendiendoEnCarrusel() {
    if (TurnosAtendiendo.length > 0) {
        for (var i in TurnosAtendiendo) {
            cargarDatosTurnoALaTabla(
                TurnosAtendiendo[i].moduloID,
                TurnosAtendiendo[i].modulo,
                TurnosAtendiendo[i].nombre, TurnosAtendiendo[i].apellido, TurnosAtendiendo[i].codigo
                );
        }
    }
    setTimeout(mostrarDatosTurnoAtendiendoEnCarrusel, TIEMPO_CONSULTA);
}

//Llamados cuando el monitor ya arrancó
function buscarTurnosLLamando() {
    var datosConsulta = ZonasAtencion;
    ApiSicam.ejecutar(
        'tienda-apps/TurnosApp/mostrarLlamandoZonasAtencion',
        datosConsulta,
        recibirDatosTurnoLlamandoyCargar
        );
}

function recibirDatosTurnoLlamandoyCargar(Turnos) {

    ////console.log( Turnos );     
    TurnosLlamando = new Array();
    if (Turnos && Turnos.length) {
        var TurnosRecibidos = Turnos;
        if (TurnosRecibidos.length) {
            for (var i in TurnosRecibidos) {
                var Turno = [];
                Turno["id"] = TurnosRecibidos[i].turnoID;
                Turno["codigo"] = TurnosRecibidos[i].turnoCODIGOCORTO;
                Turno["nombre"] = TurnosRecibidos[i].Persona.personaNOMBRES;
                Turno["apellido"] = TurnosRecibidos[i].Persona.personaAPELLIDOS;
                Turno["identificacion"] = TurnosRecibidos[i].Persona.personaIDENTIFICACION;
                Turno["moduloID"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionID;
                Turno["modulo"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionDESCRIPCION;
                Turno["turnoPrioridadID"] = TurnosRecibidos[i].Prioridades.turnoPrioridadID;
                Turno["turnoPrioridadTITULO"] = TurnosRecibidos[i].Prioridades.turnoPrioridadTITULO;
                Turno["tipoClienteID"] = TurnosRecibidos[i].TipoCliente.tipoClienteID;
                Turno["tipoClienteTITULO"] = TurnosRecibidos[i].TipoCliente.tipoClienteTITULO;
                TurnosLlamando.push(Turno);
            }
            ////console.log( TurnosLlamando );               
        }
        mostrarDatosPanelTurnoLlamando();
    }
    buscarTurnosLLamando();
}



//Llamados cuando el monitor ya arrancó
function buscarTurnosAtendiendo() {
    var datosConsulta = ZonasAtencion;
    ApiSicam.ejecutar(
        'tienda-apps/TurnosApp/mostrarAtendiendoZonasAtencion',
        datosConsulta,
        recibirDatosTurnoAtendiendoyCargar
        );
}

function recibirDatosTurnoAtendiendoyCargar(Turnos) {
    TurnosAtendiendo = new Array();
    if (Turnos && Turnos.length) {
        var TurnosRecibidos = Turnos;
        if (TurnosRecibidos.length) {
            for (var i in TurnosRecibidos) {
                var Turno = [];
                Turno["id"] = TurnosRecibidos[i].turnoID;
                Turno["codigo"] = TurnosRecibidos[i].turnoCODIGOCORTO;
                Turno["nombre"] = TurnosRecibidos[i].Persona.personaNOMBRES;
                Turno["apellido"] = TurnosRecibidos[i].Persona.personaAPELLIDOS;
                Turno["identificacion"] = TurnosRecibidos[i].Persona.personaIDENTIFICACION;
                Turno["moduloID"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionID;
                Turno["modulo"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionDESCRIPCION;
                TurnosAtendiendo.push(Turno);
            }
            ////console.log( TurnosAtendiendo );               
        }
    }
    buscarTurnosAtendiendo();
}




function cargarDatosTurnoALaTabla(moduloID, moduloCODIGO, turnoNOMBRE, turnoAPELLIDO, turnoCODIGO) {
    var nombreCompleto = turnoNOMBRE + " " + turnoAPELLIDO;
    var datos = $("#tabla_atendiendo li");

    $.each(datos, function (i, modulo) {

        if (modulo.id == 'modulo-id-' + moduloID + '') {
            $("#tabla_atendiendo #modulo-turno-" + moduloID).html('<span style="font-size:200%">' + turnoCODIGO + '</span>');
        }

    });


}


function hablar(textoParaDecir, idPersona = idAleatorio()) {
    if (textoParaDecir != "") {
        var respuesta = $.ajax({
            type: "POST",
            url: "apis/text-to-speech.php",
            data: {texto: textoParaDecir, persona: idPersona},
            async: true,
            cache: false,
            timeout: 4567
        }).done(function (respuesta) {
            reproducirRespuestaAPI(respuesta);
        }).responseText;
        // var audioElementBeep = document.createElement('audio');
        // audioElementBeep.setAttribute('type', "audio/mpeg");
        // audioElementBeep.setAttribute('src', 'data:audio/mpeg;base64,'+audioB64);
        // audioElementBeep.play();
        // reproducirRespuestaAPI(respuesta);
}
}


function reproducirRespuestaAPI(respuesta) {
    if (respuesta) {
        var datos = JSON.parse(respuesta);
        // vozAsistente.setAttribute('src', audioB64 );
        // setTimeout(function() { reproducirVOZ(); }, 123);

        var repro = $('#sonidoEspanola' + datos.id + '');
        if (repro.length) {
            reproducirVOZ(datos.id);
        } else {
            $("#codigoOculto").append(
                '<video id="sonidoEspanola' + datos.id + '" controls="" autoplay="autoplay" volume="1" name="media"><source src="' + datos.audio + '" type="audio/mpeg"></video>'
                );
            // setTimeout(function() {
            reproducirVOZ(datos.id);
            // }, 3000);
        }

    }
}

function idAleatorio() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var reproduciendo = false;
function reproducirVOZ(idGenerado) {
    var media = document.getElementById("sonidoEspanola" + idGenerado);
    const playPromise = media.play();
    media.volume = 1;
    if (playPromise !== null) {
//        playPromise.catch((error) => {
//            if (error) {
        reproducirVOZ();
//            }
//        });
    } else {
        if (reproduciendo) {
            reproducirVOZ();
        } else {
            reproduciendo = true;
            media.volume = 1;
            media.play();
            reproduciendo = false;
        }
    }
}

function __hablar(textoParaDecir) {
    if (textoParaDecir != "") {
        $.get(
            "apis/text-to-speech.php",
            {texto: textoParaDecir},
            function (respuesta) {
                $("#codigoOculto").html(respuesta);
            }
        );
    }
}

function primeraMayuscula(texto) {
    texto = texto.toLowerCase();
    return texto.charAt(0).toUpperCase() + texto.substr(1)
}




//turnoEncontrado();  