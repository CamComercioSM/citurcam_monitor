/***
 ///CiTurCAM  
 ///Aplicaciones para el Monitor de Turnos.
 
 Esto muestra los turnos en atencion y llamando del CITURCAM. 
 ***/
var URL_SICAM = 'https://si.sicam32.net/';
//objeto app
var ApiSicam = {};
ApiSicam.clavePublica = "EXDD399P7hexEqY333k5eB9qoLHQ+aC3F+4kiyS8QzQ=";
ApiSicam.clavePrivada = "zZ62ejC33rV7X+qa03o6cipSIDG+uSZs7mkwQ5jcowQ=";
ApiSicam.url = "https://api.citurcam.com/";
ApiSicam.operacion = "";
ApiSicam.url_operacion = "https://api.citurcam.com/";
ApiSicam.metodo_operacion = "POST";
ApiSicam.tipo_contenido = 'application/x-www-form-urlencoded';
ApiSicam.parametros = [];
ApiSicam.PRUEBAS = false;
ApiSicam.ejecutar = function (operacion, datos, accion) {
    return obtenerDatosAPi(operacion, datos, accion);
}
function obtenerDatosAPi(operacion, parametros = [], accionDespuesConsulta = null, asincronico = true) {
    return ejecutarPeticionAJAX(
            operacion, parametros, accionDespuesConsulta,
            metodo = "GET",
            respuestaSoloDatos = true,
            tipoContenido = 'json',
            asincronico
            );
}





function crearObjetoGestionConexion(accionDespuesConsulta = null, respuestaSoloDatos = true) {
    var ajax;
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        ajax = new ActiveXObject("Microsoft.XMLHttp");
    }
    ajax.withCredentials = true;
    ajax.timeout = 3456;
    ajax.ontimeout = function (data) {
        console.log(ajax);
        console.log(ajax.method);
        console.log(ajax.url);
        console.log(data);
        console.log("Se acabo el tiempo y no respondió el servidor en ");
        setTimeout(function () {
            obtenerDatosAPi()
        }, 1234);

        ajax.abort();
        window.location.reload();
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
    return ajax;
}


function ejecutarPeticionAJAX(operacion, parametros = [], accionDespuesConsulta = null, metodo = "POST", respuestaSoloDatos = true, tipoContenido = 'json', asincronico = true) {
    var ObjAjax = crearObjetoGestionConexion(accionDespuesConsulta, respuestaSoloDatos);
    ApiSicam.operacion = operacion;
    ApiSicam.url_operacion = ApiSicam.url + ApiSicam.operacion;
    ApiSicam.metodo_operacion = metodo;
    ApiSicam.parametros = parametros;
    ApiSicam.tipo_contenido = tipoContenido;
    if (ObjAjax) {
        if (metodo === 'GET') {
            if (parametros.length > 0) {
                for (var posicion in parametros) {
                    if (parametros[posicion]) {
                        ApiSicam.url_operacion += "/" + parametros[posicion];
                    }
                }
            }
        }
        if (ApiSicam.PRUEBAS) {
            ApiSicam.url_operacion += "?modo=PRUEBAS";
        }
        console.log(ApiSicam.url_operacion);
        console.log(ApiSicam.parametros);
        ObjAjax.open(metodo, ApiSicam.url_operacion, asincronico, ApiSicam.clavePublica, ApiSicam.clavePrivada);
        ObjAjax.setRequestHeader("Authorization", 'Basic ' + btoa(ApiSicam.clavePublica + ':' + ApiSicam.clavePrivada));
        switch (tipoContenido) {
            case 'json':
                ObjAjax.setRequestHeader('Content-type', 'application/json');
                break;

            case 'txt':
                ObjAjax.setRequestHeader('Content-type', 'text/plain; charset=utf-8');
                break;

            case 'html':
                ObjAjax.setRequestHeader('Content-type', ' text/html; charset=UTF-8');
                break;

            case 'formdata':
                ObjAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                break;

            default:
                break;
        }
        try {
            ObjAjax.send(ApiSicam.parametros);
        } catch (e) {
            console.log('error en el SEND');
            console.log(e);
            ObjAjax.abort();
        }
}
}
function validarEstadoPeticion(ajax) {
    switch (ajax.status) {
        default:
        case 0:
            console.log("Respuesta desconocida. Estado: [" + ajax.status + "] ");
            return false;
            break;
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



ApiSicam.ejecutarPost = function (operacion, datos, accion) {
    return ejecutarPostAPI(operacion, datos, accion);
}
ApiSicam.ejecutarPostAPIFormData = function (operacion, datos, accion) {
    return ejecutarPostAPIFormData(operacion, datos, accion);
}




window.addEventListener ? window.addEventListener("load", ApiSicam, !1) : window.attachEvent("load", ApiSicam, !1);