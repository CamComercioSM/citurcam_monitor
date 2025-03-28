// Ejemplo implementando el metodo POST:
async function conexionAPI(operacion = '', data = {}) {
        // Opciones por defecto estan marcadas con un *
        var datos = {'operacion':operacion, 'zonas': data};
        const response = await fetch("https://apisicam.net/citurcam/", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                        'Content-Type': 'application/json',
                        'origin': 'https://citurcam.com'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body:  JSON.stringify(datos) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
}

//
//
//function ejecutarPeticion(operacion, datos) {
//        fetch("https://api.citurcam.com/" + operacion, {
//                method: "POST",
//                body: JSON.stringify({"datos": datos}),
////                headers: {
////                        "Content-type": "application/json; charset=UTF-8"
////                }
//        }).then(response => response.json()).then(data => console.log(data));
//}
//
//
//function ejecutarConsultasPreparacion() {
//        ejecutarPeticion('mostrarTotalTurnosPendientesPorZonasPorTiposServicios', [74, 75]);
//}
//ejecutarConsultasPreparacion();