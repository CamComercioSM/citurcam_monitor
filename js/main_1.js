var URL_SICAM = 'https://si.sicam32.net/';
var audioElementBeep = document.createElement('audio');
audioElementBeep.setAttribute('type', "audio/mpeg");
audioElementBeep.setAttribute('src', 'snd/timbre_turnos2022.mp3');
var timbreEncontradoCargado = false;
audioElementBeep.addEventListener("loadeddata", (event) => {
    timbreEncontradoCargado = true;
    registroAccionesConsola("timbre de turno encontrado cargado");
});
var audioElementWSP = document.createElement('audio');
audioElementWSP.setAttribute('type', "audio/mpeg");
audioElementWSP.setAttribute('src', 'snd/whatsapp_whistle.mp3');
var timbreSilbidoCargado = false;
audioElementWSP.addEventListener("loadeddata", (event) => {
    timbreSilbidoCargado = true;
    registroAccionesConsola("timbre de silbido encontrado cargado");
});
var audioElementBRILLO = document.createElement('audio');
audioElementBRILLO.setAttribute('type', "audio/mpeg");
audioElementBRILLO.setAttribute('src', 'snd/brillo.mp3');
var timbreAfiliadosCargado = false;
audioElementBRILLO.addEventListener("loadeddata", (event) => {
    timbreAfiliadosCargado = true;
    registroAccionesConsola("timbre de silbido encontrado cargado");
});
var audiofallaInternet = document.createElement('audio');
audiofallaInternet.setAttribute('type', "audio/mpeg");
audiofallaInternet.setAttribute('src', 'snd/fallainternet.mp3');
var timbrefallaInternet = false;
audiofallaInternet.addEventListener("loadeddata", (event) => {
    timbrefallaInternet = true;
    registroAccionesConsola("timbre de falla de internet encontrado cargado");
});
var audiocaidaInternet = document.createElement('audio');
audiocaidaInternet.setAttribute('type', "audio/mpeg");
audiocaidaInternet.setAttribute('src', 'snd/caidainternet.mp3');
var timbrecaidaInternet = false;
audiocaidaInternet.addEventListener("loadeddata", (event) => {
    timbrecaidaInternet = true;
    registroAccionesConsola("timbre de caida de internet encontrado cargado");
});
//audioElementBeep.volumen = 0.5;
var contadorTimbre = 0;
var maximoTimbres = 2;
var ultimosTurnosLlamando = null;
function turnoEncontrado(TurnosLlamando = []) {
    if (ultimosTurnosLlamando == null) {
        ultimosTurnosLlamando = TurnosLlamando;
    }
    //console.log("antes-....................");
    //console.log(contadorTimbre);
    //console.log(maximoTimbres);
    // if(audioElementBeep.ended){        
    if (TurnosLlamando.length == ultimosTurnosLlamando.length) {
        for (var i = 0, max = TurnosLlamando.length; i < max; i++) {
            //console.log(ultimosTurnosLlamando[i]);
            let turnoAntes = ultimosTurnosLlamando[i];
            let turnoAhora = TurnosLlamando[i];
            //console.log("comparando-....................");
            //console.log(turnoAntes);
            //console.log(turnoAhora);
            if (turnoAhora["id"] !== turnoAntes["id"]) {
                contadorTimbre = 0;
            }
        }
    } else {
        contadorTimbre = 0;
    }
    //console.log("desúes-....................");
    //console.log(contadorTimbre);
    //console.log(maximoTimbres);
//    console.log(audioElementBeep);
    if (timbreEncontradoCargado) {
        if (contadorTimbre < maximoTimbres) {
            sonarTimbreTurnoEncontrado();
            contadorTimbre++;
        }
    }
    //console.log(contadorTimbre);
    ultimosTurnosLlamando = TurnosLlamando;
    //console.log(ultimosTurnosLlamando);
    //console.log(TurnosLlamando);
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
var TurnosHablando = new Array();
var TurnosAtendiendo = new Array();
var tiempoConsultarTurnoLlamando;
var contadorRecarga = 0;
var tiempoRecarga = 60; //Minutos
// Inicializar el panel de monitores los turnos
function inciarMonitorTurnosCCSM() {
    registroAccionesConsola("buscando la pagina del panel de control");
    $("#areaTrabajo").load("html/panel-control.html", function () {
        registroAccionesConsola("cargado el PANEL de CONTROL");
        desbloqueoCargando();
    });
}
function cambiarModoMONITOR() {
    $("#pnl-control-vistas").addClass('hover');
    $("body").css('overflow', 'hidden');
    registroAccionesConsola("cambiado a  MODO MONITOR");
}
function cambiarModoCONFIGURACION() {
    $("#pnl-control-vistas").removeClass('hover');
    $("body").css('overflow', 'auto');
    registroAccionesConsola("cambiado a  MODO CONFIGURACION");
}

function cargarInterfaceMonitoreo(datosConfiguracion) {
////console.log( datosConfiguracion );
    $.post(
            "html/monitor.html.php",
            datosConfiguracion
            ).done(function (data) {
        $("#areaTrabajo2").html(data);
        setInterval(function () {
            contadorRecarga++;
            if (contadorRecarga == tiempoRecarga) {
                window.location.reload();
                contadorRecarga = 0;
            }
        }, 30000);
    });
}
function panelVistaSedeZonaAtencion(Sede, Zona) {
    var html = '';
    html += '<div class="col-sm-4 col-md-3 col-lg-3 col-xs-6" style="max-height: 320px;" ><label class=" " style="width: 100%; height: 320px; cursor: pointer;" >';
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
}
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
                    + '<div id="modulo-codigo-' + modulo.moduloAtencionID + '" class="modulo-turno " style="background-image: url(img/fondo-turno-llamando.png);" >' + modulo.moduloAtencionTITULO + ' - ' + modulo.puestoTrabajoTITULO + '</div>'
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
////console.log(datos);
    if (datos) {
////console.log('leyendo datos desde el servidor  de turnos pendientes');
        $.each(datos, function (i, datos) {
            var TiposServicios = [];
            TiposServicios["id"] = datos.turnoTipoServicioID;
            TiposServicios["codigo"] = datos.turnoTipoServicioCODIGO;
            TiposServicios["nombre"] = datos.turnoTipoServicioTITULO;
            TiposServicios["pendientes"] = datos.Pendientes;
            PendientesTiposServicios.push(TiposServicios);
            ////console.log(TiposServicios);
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
            } else {
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
//    ////console.log(datos);
    if (datos) {
//        ////console.log('leyendo datos desde el servidor  de turnos pendientes');
        PendientesTiposServicios = new Array();
        $.each(datos, function (i, datos) {
            var TiposServicios = [];
            TiposServicios["id"] = datos.turnoTipoServicioID;
            TiposServicios["codigo"] = datos.turnoTipoServicioCODIGO;
            TiposServicios["nombre"] = datos.turnoTipoServicioTITULO;
            TiposServicios["pendientes"] = datos.Pendientes;
            PendientesTiposServicios.push(TiposServicios);
            ////console.log(TiposServicios);
        });
    } else {
        return false;
    }
    setTimeout(buscarDatosTurnosPendientesTiposServicios, 1579);
    return true;
}
function mostrarDatosTurnoPendientesEnCarrusel() {
//    ////console.log('leyendo el buffer de turnos pendientes');
    if (PendientesTiposServicios.length > 0) {
        for (var i in PendientesTiposServicios) {
//            ////console.log(PendientesTiposServicios[i]);
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
            ////console.log(antes);
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
                ////console.log("Llamando......")
                ////console.log(TurnosLlamando[mostrando].nombre + " " + TurnosLlamando[mostrando].apellido);
                ////console.log(TurnosLlamando[mostrando].modulo);
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
        turnoEncontrado(TurnosLlamando);
    }
    mostrando++;
    if (mostrando >= TurnosLlamando.length)
        mostrando = 0;
    setTimeout(cambiarDatosPanelTurnoLlamando, TIEMPO_PRESENTACION);
}
function decirDatosTurnoLlamando() {
////console.log(TurnosLlamando);
    if (TurnosLlamando.length > 0) {
        if (TurnosLlamando[diciendo]) {
            let textoHablar = primeraMayuscula(TurnosLlamando[diciendo].codigo) + ". " + primeraMayuscula(TurnosLlamando[diciendo].modulo) + ".";
            if (TurnosLlamando[diciendo].nombre && TurnosLlamando[diciendo].apellido) {
                textoHablar =
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
                textoHablar += " Afiliado. ";
                TurnoEspecialAfiliados();
            } else if (TurnosLlamando[diciendo].turnoPrioridadID > 1) {
                textoHablar += " Turno Prioritario.";
                TurnoEspecial();
            }
            TurnoEspecialAfiliados();
            hablar(textoHablar, TurnosLlamando[diciendo].codigo);
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
    sonarTimbreBrillo();
}
function TurnoEspecialAfiliados() {
    $("#estrella-afiliados").addClass('scale-up-center');
    setTimeout(function () {
        $("#estrella-afiliados").removeClass('scale-up-center');
    }, 1234)
    sonarTimbreBrillo();
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
////console.log("Llamando....");
////console.log(TurnosRecibidos[i]);
                var Turno = [];
                Turno["id"] = TurnosRecibidos[i].turnoID;
                Turno["codigo"] = TurnosRecibidos[i].turnoCODIGOCORTO;
                Turno["nombre"] = TurnosRecibidos[i].personaNOMBRES;
                Turno["apellido"] = TurnosRecibidos[i].personaAPELLIDOS;
                Turno["identificacion"] = TurnosRecibidos[i].personaIDENTIFICACION;
                Turno["moduloID"] = TurnosRecibidos[i].moduloAtencionID;
                Turno["modulo"] = TurnosRecibidos[i].moduloAtencionDESCRIPCION;
                Turno["turnoPrioridadID"] = TurnosRecibidos[i].turnoPrioridadID;
                Turno["turnoPrioridadTITULO"] = TurnosRecibidos[i].turnoPrioridadTITULO;
                Turno["tipoClienteID"] = TurnosRecibidos[i].tipoClienteID;
                Turno["tipoClienteTITULO"] = TurnosRecibidos[i].tipoClienteTITULO;
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
////console.log("Atendiendo....");
////console.log(TurnosRecibidos[i]);
                var Turno = [];
                Turno["id"] = TurnosRecibidos[i].turnoID;
                Turno["codigo"] = TurnosRecibidos[i].turnoCODIGOCORTO;
                Turno["nombre"] = TurnosRecibidos[i].personaNOMBRES;
                Turno["apellido"] = TurnosRecibidos[i].personaAPELLIDOS;
                Turno["identificacion"] = TurnosRecibidos[i].personaIDENTIFICACION;
                Turno["moduloID"] = TurnosRecibidos[i].moduloAtencionID;
                Turno["modulo"] = TurnosRecibidos[i].moduloAtencionDESCRIPCION;
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
// Busca el primer elemento con la edad indicada, sino devuelve -1
function buscarLlamadasTurnoHablando(array, codigoTURNO) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.turno === codigoTURNO) {
            element.llamada += 1;
            return element.llamada;
        }
    }
    TurnosHablando.push({"turno": codigoTURNO, "llamada": 0});
    return 0;
}
//
////
////////
////////////
var reproduciendo = false;
var maximoHablar = 3;
function idAleatorio() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function hablar(textoParaDecir, idPersona = idAleatorio()) {
//    console.log("persona -> ");
//    console.log(idPersona);    
    registroAccionesConsola("solicitando MP3 de la española " + idPersona);
    if (textoParaDecir != "") {
        let llamadasAlTurno = buscarLlamadasTurnoHablando(TurnosHablando, idPersona);
        console.log("validar llamando -> ");
        console.log(TurnosHablando);
        console.log(llamadasAlTurno);
        if (llamadasAlTurno < maximoHablar) {
            registroAccionesConsola("enviando peticion MP3 de la española " + idPersona);
            var respuesta = $.ajax({
                type: "POST",
                url: "apis/text-to-speech.php",
                data: {texto: textoParaDecir, persona: idPersona},
                sync: true,
                cache: true,
                timeout: 34567
            }).done(function (respuesta) {
                registroAccionesConsola("recibiendo MP3 de la española " + idPersona);
                reproducirRespuestaAPI(respuesta);
            }).responseText;
        }
    }
    console.log("veces llamando -> ");
    console.log(TurnosHablando);
}


var reproductoresVOZ = [];
function reproducirRespuestaAPI(respuesta) {
    if (respuesta) {
        var datos = JSON.parse(respuesta);
        // vozAsistente.setAttribute('src', audioB64 );
        // setTimeout(function() { reproducirVOZ(); }, 123);
//        var repro = $('#sonidoEspanola' + datos.id + '');        
        if (reproductoresVOZ.length) {
            var reproductor = reproductoresVOZ[datos.id];
            console.log(reproductor);
//            reproducirVOZ(datos.id);
        } else {
            registroAccionesConsola("creando el reproductor MP3 de la española " + datos.id);
////            $("#codigoOculto").append(
////                    '<video id="sonidoEspanola' + datos.id + '" controls="" autoplay="true" volume="1" name="media" muted="true"><source src="' + datos.audio + '" type="audio/mpeg"></video>'
////                    );
//            console.log(reproductoresVOZ);
            reproductoresVOZ[datos.id] = document.createElement('audio');
            reproductoresVOZ[datos.id].setAttribute('id', "sonidoEspanola" + datos.id);
            reproductoresVOZ[datos.id].setAttribute('src', datos.audio);
            reproductoresVOZ[datos.id].autoplay = true;
            reproductoresVOZ[datos.id].muted = true;
            reproductoresVOZ[datos.id].addEventListener("loadeddata", (event) => {
                registroAccionesConsola("iniciando reproduccion de la voz de la española");
                reproducirVOZ(datos.id);
            });
            console.log(reproductoresVOZ);
        }
    }
}

function reproducirVOZ(idGenerado) {
    registroAccionesConsola("cargando MP3 de la española " + idGenerado);
    //var media = document.getElementById("sonidoEspanola" + idGenerado);
    var media = reproductoresVOZ[idGenerado];
//    console.log("objeto reproductor generado");
    if (media) {
        media.volume = 1;
        media.muted = false;
        const playPromise = media.play();
//        console.log(playPromise);
        const promise2 = playPromise.then(
                function () {
                    if (!reproduciendo) {
                        reproduciendo = true;
                        registroAccionesConsola("REPRODUCIENDO MP3 de la española nuevamente " + idGenerado + "");
                        reproduciendo = false;
                    }
                },
                function () {
                    playPromise.catch((error) => {
                        if (error) {
                            registroAccionesConsola("intentando cargar MP3 de la española nuevamente " + idGenerado);
                            setTimeout(function () {
                                reproducirVOZ(idGenerado);
                            }, 1234);
                        }
                    });
                }
        );


//        if (playPromise !== null) {
//            playPromise.catch((error) => {
//                if (error) {
//                    registroAccionesConsola("intentando cargar MP3 de la española nuevamente " + idGenerado);
//                    setTimeout(function () {
//                        reproducirVOZ(idGenerado);
//                    }, 1234);
//                }
//            });
//        } else {
////            if (!reproduciendo) {
//            registroAccionesConsola("REPRODUCIENDO MP3 de la española nuevamente " + idGenerado + "");
//            reproduciendo = true;
//            media.volume = 1;
//            media.muted = false;
//            media.play();
//            reproduciendo = false;
////            }
//        }
    }
}



////
////
/////
////
function reiniciarMonitorTurnos() {
    hablar("Se ha está reiniciando el monitor. Vamos a recargar!!!!");
    bloqueoCargando();
    setTimeout(function () {
        limpiarDatosEnNavegador();
        cargarDatosPorDefecto();
        window.location.reload();
    }, 4321);
}
function recargarMonitorTurnos() {
    hablar("Estamos recargando el monitor de turnos. Por favor, esperanos unos segundos!!!!");
    bloqueoCargando();
    setTimeout(function () {
        window.location.reload();
    }, 4321);
}
function configuracionBasicaMonitorTurnos() {
    hablar("Se cargarón los datos básicos para la configuración!");
    bloqueoCargando();
    setTimeout(function () {
        limpiarDatosEnNavegador();
        cargarDatosPorDefecto();
    }, 4321);
}
function guardarConfiguracionMonitorTurnos(datosConfig) {
    hablar("Estamos guardando la nueva configuración para el monitor de turnos. Por favor, espera unos segundos!!!!");
    bloqueoCargando();
    setTimeout(function () {


        var config = datosConfig;
        for (var i in config) {
            guardarEnNavegador(config[i].name, config[i].value);
        }
        var puesto = [];
        $.each($('input[type=checkbox]:checked'), function (i, val) {
            puesto[i] = val.value;
        });
        guardarEnNavegador("puestos", JSON.stringify(puesto));
        //console.log( $(this).serialize() );
        // abrirInterfaceMonitoreo($(this).serialize());


    }, 4321);
}
function guardarConfiguracionMonitorTurnosYarrancar(datosConfig) {
    hablar("Estamos guardando la nueva configuración para el monitor de turnos. Por favor, espera unos segundos!!!!");
    bloqueoCargando();
    setTimeout(function () {


        var config = datosConfig;
        for (var i in config) {
            guardarEnNavegador(config[i].name, config[i].value);
        }
        var puesto = [];
        $.each($('input[type=checkbox]:checked'), function (i, val) {
            puesto[i] = val.value;
        });
        guardarEnNavegador("puestos", JSON.stringify(puesto));
        //console.log( $(this).serialize() );
        // abrirInterfaceMonitoreo($(this).serialize());


        window.location.reload();
    }, 4321);
}
function validarSiHayConfiguracionGuardada() {
    var configGuardada = valorEnNavegador("recordarConfiguracion");
    if (configGuardada == "SI") {
//          hablar("Bienvenidos a la Cámara de Comercio de Santa Marta para el Magdalena. ¡Creciendo Contigo!");
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
                + "&altoPantalla=" + valorEnNavegador("altoPantalla")
                + "&tiempoConsulta=" + valorEnNavegador("tiempoConsulta")
                + "&tiempoTurno=" + valorEnNavegador("tiempoTurno")
                + "&modulosEnVista=" + valorEnNavegador("modulosEnVista")
                + "&pasosEnVista=" + valorEnNavegador("pasosEnVista")
                + "&tamanoLetrasNombreTurno=" + valorEnNavegador("tamanoLetrasNombreTurno")
                + "&tamanoLetrasNombreModulo=" + valorEnNavegador("tamanoLetrasNombreModulo")
                + "&tamanoLetrasTurnoModulo=" + valorEnNavegador("tamanoLetrasTurnoModulo")
                + "&tamanoLetrasCodigoModulo=" + valorEnNavegador("tamanoLetrasCodigoModulo")
                + "";

        var PuestosTrabajo = JSON.parse(valorEnNavegador("puestos"));
        //console.log(PuestosTrabajo);
        for (var i in PuestosTrabajo) {
            datosSerializado += "&puestosSeleccionados[]=" + PuestosTrabajo[i];
            //console.log(PuestosTrabajo[i]);
            //console.log( '#puestoSeleccionado' + PuestosTrabajo[i] );
            //console.log( $('#puestoSeleccionado' + PuestosTrabajo[i] ).html() );
            $('#puestoSeleccionado' + PuestosTrabajo[i]).prop('checked', true);
        }
        //console.log( datosSerializado );
        abrirInterfaceMonitoreo(datosSerializado);
    } else {
        hablar("Bienvenidos al Monitor del Sistema de Citas y Turnos de la Cámara de Comercio de Santa Marta para el Magdalena. ¡Creciendo Contigo!");
    }
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
        registroAccionesConsola('limpiando datos de la configuracion');
        return localStorage.clear();
    } else {
        alert("no se pudo guardar en el navegador")
    }
}
///
////
////
////
////


function sonarTimbreTurnoEncontrado() {
    reproducirAudio(document.getElementById("timbreTurnos"));
}
function sonarTimbreBrillo() {
    reproducirAudio(document.getElementById("timbreBrillo"));
}
function sonarAvisoCaidaInternet() {
    reproducirAudio(document.getElementById("vozCaidaInternet"));
}
function reproducirAudio(MEDIA) {

    if (MEDIA) {
        MEDIA.volume = 1;
        MEDIA.muted = false;
        MEDIA.loop = false;
        const playPromise = MEDIA.play();
//        console.log(playPromise);
        const promise2 = playPromise.then(
                function () {
                    registroAccionesConsola("REPRODUCIENDO MP3 " + MEDIA.id);
                },
                function () {
                    playPromise.catch((error) => {
                        if (error) {
                            registroAccionesConsola("FALLO REPRODUCCION DE MP3 " + MEDIA.id);
                            setTimeout(function () {
                                registroAccionesConsola("NUEVO INTENTO REPRODUCCION DE MP3 " + MEDIA.id);
                                reproducirAudio(MEDIA)
                            }, 1234);
                        }
                    });
                }
        );
    }
}




////
/////
///////
/////
function avisoExito(texto) {
    audiocaidaInternet.play();
    return Swal.fire({
        title: 'Bien hecho!',
        icon: 'success',
        html: texto,
        showConfirmButton: false,
        timer: 5432
    });
}
function avisoCaidaInternet(texto) {
    audiofallaInternet.play();
    document.getElementById("avisoCaidaInternet").play();
    return Swal.fire({
        icon: 'error',
        title: 'Se cayó el INTERNET.',
        html: texto
    });
}
function avisoInformacion(texto) {
    return Swal.fire({
        title: '¡Atento!',
        icon: 'info',
        html: texto,
        showCloseButton: true
    });
}

function primeraMayuscula(texto) {
    ////console.log(texto);
    texto = texto.toLowerCase();
    return texto.charAt(0).toUpperCase() + texto.substr(1);
}
function registroAccionesConsola(TXT = "") {
    let fecha = new Date();
    var objDiv = document.getElementById('terminal');
    objDiv.innerHTML += (('[' + fecha.toLocaleTimeString() + '] <b>' + TXT) + "</b>.<br /> ");
    objDiv.scrollTop = objDiv.scrollHeight;
}

if (typeof zIndex === 'undefined') {
    function zIndex() {
        var allElems = document.getElementsByTagName ? document.getElementsByTagName("*") : document.all; // or test for that too
        var maxZIndex = 0;
        for (var i = 0; i < allElems.length; i++) {
            var elem = allElems[i];
            var cStyle = null;
            if (elem.currentStyle) {
                cStyle = elem.currentStyle;
            } else if (document.defaultView && document.defaultView.getComputedStyle) {
                cStyle = document.defaultView.getComputedStyle(elem, "");
            }
            var sNum;
            if (cStyle) {
                sNum = Number(cStyle.zIndex);
            } else {
                sNum = Number(elem.style.zIndex);
            }
            if (!isNaN(sNum)) {
                maxZIndex = Math.max(maxZIndex, sNum);
            }
        }
        return maxZIndex + 1;
    }
}
function bloqueoCargando() {
    var cargandoHtml = '<div id="fondoCargando"  style=" z-index:' + (zIndex() - 1) + '; position:fixed; top:0; left:0; width:110%; height:110%; background-color:transparent; background-position:center center; background-repeat:repeat; overflow:hidden; opacity: 0.8;" ></div>' +
            '<div style=" z-index:' + (zIndex() - 1) + '; position:fixed; top:0; left:0px; width:100%; height:110%; background-color: rgba(0, 0, 10, 0.65); background-position:center center; background-repeat:repeat; overflow:hidden;" >' +
            '<div style="margin: 10% auto; text-align: center;">' +
            '<div class="col-middle">' +
            '<div class="text-center text-center">' +
            '<div id="stage" >' +
            '<div class="logo-cargando" >' +
            '<img src="img/sicam32.png" style="max-width: 100%; width: 210px;" />' +
            '</div>' +
            '</div>' +
            '<div class="texto-cargando">cargando</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '';
    $('#cargando').html(cargandoHtml);
}
function desbloqueoCargando() {
    $('#cargando').html('');
}