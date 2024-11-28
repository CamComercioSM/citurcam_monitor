/***
 ///CiTurCAM  
 ///Aplicaciones para el Monitor de Turnos.
 
 Esto muestra los turnos en atencion y llamando del CITURCAM. 
 ***/
//alert('Estamos realizando un mantenimiento. Vuelve en 1 hora.');
//alert('OJO: Estamos realizando un mantenimiento. Vuelve en 1 hora.');
function cargarDependenciasJS(url) {
    var script = document.createElement("script");
    script.src = url;
    script.defer = true;
    document.head.appendChild(script);
}
var URL_SICAM = 'https://si.sicam32.net/';
//objeto app
var ApiSicam = {};
ApiSicam.clavePublica = "EXDD399P7hexEqY333k5eB9qoLHQ+aC3F+4kiyS8QzQ=";
ApiSicam.clavePrivada = "zZ62ejC33rV7X+qa03o6cipSIDG+uSZs7mkwQ5jcowQ=";
ApiSicam.url = "https://api.sicam32.net/";
ApiSicam.PRUEBAS = false;
ApiSicam.operacion = null;
ApiSicam.datos = null;
ApiSicam.accion = null;
ApiSicam.reconexion = 0;
ApiSicam.ESPERANDO_RESPUESTA = false;
ApiSicam.ejecutar = function (operacion, datos, accion) {
    ApiSicam.operacion = operacion;
    ApiSicam.datos = datos;
    ApiSicam.accion = accion;
    return obtenerDatosAPi(operacion, datos, accion);
}
ApiSicam.ejecutarPost = function (operacion, datos, accion) {
    return ejecutarPostAPI(operacion, datos, accion);
}
ApiSicam.ejecutarPostAPIFormData = function (operacion, datos, accion) {
    return ejecutarPostAPIFormData(operacion, datos, accion);
}

function crearObjetoGestionConexion(accionDespuesConsulta = null, respuestaSoloDatos = true) {
    var ajax;
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        ajax = new ActiveXObject("Microsoft.XMLHttp");
    }
    ajax.withCredentials = true;
    ajax.timeout = 23456;
    ajax.ontimeout = function (data) {
        ajax.abort();
        console.log(ajax);
        console.log(data);
        console.log("Se acabo el tiempo y no respondió el servidor en ");
        avisoCaidaInternet('reconectando.......' + ApiSicam.operacion);
        setTimeout(function () {
            if (ApiSicam.reconexion >= 9) {
                liberarServidor();
                ApiSicam.reconexion = 0;
            }
        }, 3210);
        setTimeout(function () {
            ApiSicam.reconexion++;
            console.log("reconectando " + ApiSicam.reconexion);
            obtenerDatosAPi(ApiSicam.operacion, ApiSicam.datos, ApiSicam.accion);
        }, 2345);

    };
    ajax.onreadystatechange = function (data) {
        switch (ajax.readyState) {
            case 4:
                return validarEstadoPeticion(this);
                break;
        }
    };
    ajax.onload = function (data) {
        if (validarEstadoPeticion(this)) {
            try {
                var respuesta = JSON.parse(this.responseText);
            } catch (e) {
                console.log("La respuesta de la API no cumple con un formato valido.");
                console.log(this.responseText);
                console.log("Error");
                console.log(e);
            }
            try {
                if (accionDespuesConsulta) {
                    if (respuestaSoloDatos) {
                        accionDespuesConsulta(respuesta.DATOS);
                    } else {
                        accionDespuesConsulta(respuesta);
                    }
                }
            } catch (e) {
                console.log("Error en la ejecucion de la funcion de respuesta / callback.");
                console.log(accionDespuesConsulta);
                console.log("Error");
                console.log(e);
                console.log("Sys");
                console.log(this);
                console.log("Data");
                console.log(data);
            }
        }
    };
    ajax.error = function (request, status, error) {
        console.log("error en la conexion ajax.");
        console.log(request);
        console.log(status);
        console.log(error);
    };

//    ApiSicam.ESPERANDO_RESPUESTA = true;
//    setTimeout(function () {
//        if (ApiSicam.ESPERANDO_RESPUESTA) {
//            ApiSicam.ESPERANDO_RESPUESTA = false;
//            ajax.abort();
//            liberarServidor();
//        }
//    }, 12345);
//    console.log(ajax);

    return ajax;
}
function obtenerDatosAPi(operacion, parametros = array(), accionDespuesConsulta = null, asincronico = true) {
    var ObjAjax = crearObjetoGestionConexion(accionDespuesConsulta);
    var url_operacion = ApiSicam.url + operacion;
    if (parametros) {
        for (var posicion in parametros) {
            if (parametros[posicion]) {
                url_operacion += "/" + parametros[posicion];
            }
        }
    }
    if (ObjAjax) {
        if (ApiSicam.PRUEBAS) {
            url_operacion += "?modo=PRUEBAS";
        }
//        console.log(url_operacion);
        ObjAjax.open("GET", url_operacion, asincronico, ApiSicam.clavePublica, ApiSicam.clavePrivada);
        ObjAjax.setRequestHeader("Authorization", 'Basic ' + btoa(ApiSicam.clavePublica + ':' + ApiSicam.clavePrivada));
        ObjAjax.setRequestHeader('Content-Type', 'application/json');
        try {
            ObjAjax.send();
        } catch (e) {
            console.log('error en el SEND');
            console.log(e);
            ObjAjax.abort();
        }
}
}
function ejecutarPostAPI(operacion, parametros, accionDespuesConsulta = null, asincronico = true) {
    var ObjAjax = crearObjetoGestionConexion(accionDespuesConsulta, false);
    var url_operacion = ApiSicam.url + operacion;
    if (ObjAjax) {
        if (ApiSicam.PRUEBAS) {
            url_operacion += "?modo=PRUEBAS";
        }
        console.log(url_operacion);
        ObjAjax.open("POST", url_operacion, asincronico, ApiSicam.clavePublica, ApiSicam.clavePrivada);
        ObjAjax.setRequestHeader("Authorization", 'Basic ' + btoa(ApiSicam.clavePublica + ':' + ApiSicam.clavePrivada));
        ObjAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        try {
            console.log(parametros);
            ObjAjax.send(parametros);
        } catch (e) {
            console.log('error en el SEND');
            console.log(e);
            ObjAjax.abort();
        }
}
}
function ejecutarPostAPIFormData(operacion, parametros, accionDespuesConsulta = null, asincronico = true) {
    var ObjAjax = crearObjetoGestionConexion(accionDespuesConsulta, false);
    var url_operacion = ApiSicam.url + operacion;
    if (ObjAjax) {
        if (ApiSicam.PRUEBAS) {
            url_operacion += "?modo=PRUEBAS";
        }
        console.log(url_operacion);
        ObjAjax.open("POST", url_operacion, asincronico, ApiSicam.clavePublica, ApiSicam.clavePrivada);
        ObjAjax.setRequestHeader("Authorization", 'Basic ' + btoa(ApiSicam.clavePublica + ':' + ApiSicam.clavePrivada));
        //ObjAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        try {
            console.log(parametros);
            ObjAjax.send(parametros);
        } catch (e) {
            console.log('error en el SEND');
            console.log(e);
            ObjAjax.abort();
        }
}
}
function validarEstadoPeticion(ajax) {
    switch (ajax.status) {
        case 200:
//            console.log("Exito");
            return true;
            break;
        case 401:
            console.log("Fallo autenticación.");
            break;
        case 404:
            console.log("No existe la ruta.");
            break;
        case 405:
            console.log("Metodo REST no permitido para la operación.");
            break;
        case 500:
            console.log("Error en el Servidor.");
            break;
        default:
            console.log("Respuesta desconocida.");
            break;
    }
    if (typeof desbloqueoCargando === "function") {
        desbloqueoCargando();
    }
    if (typeof ocultarCargando === "function") {
        ocultarCargando();
    }
    ajax.abort();
    return false;
}


function liberarServidor() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var res = xhttp.responseText;
            if (res.length > 0) {
                setTimeout(function () {
                    window.location.reload();
                }, 5432);
            }
        }
    }
    xhttp.open("POST", ApiSicam.url + "cerrar/conexion/activa", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}
window.addEventListener ? window.addEventListener("load", ApiSicam, !1) : window.attachEvent("load", ApiSicam, !1);