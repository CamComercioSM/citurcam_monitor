var carrusel = null;
var ModulosActivos = new Array();

function mostrarModulosAtencionActivos( anchoModulo, altoModulo, despuesCargar){
    var jqxhr = $.ajax({
        method: "POST",
        url: "api.php",
        dataType : "json",
        data: { operacion: "modulosActivos" }
      }).done(function(data) {
        if(data.RESPUESTA === 'EXITO'){
            var Things = data.DATOS;
            for (var i = 0; i  < Things.length; i++) {
                var Modulo = [];
                Modulo["id"] = Things[i].moduloAtencionID;
                Modulo["codigo"] = Things[i].moduloAtencionCODIGO;
                Modulo["nombre"] = Things[i].moduloAtencionTITULO;
                ModulosActivos.push( Modulo ); 
                $("#carousel").append(
                    '<div id="modulo-id-' + Modulo["id"] + '" class="table turno-atendiendo">'
                    +'<div id="modulo-turno-' + Modulo["id"] + '" class="col-xs-8 nombre-turno " >LIBRE</div>'
                    +'<div id="modulo-codigo-' + Modulo["id"] + '" class="col-xs-4 modulo-turno " style="background-image: url(/img/fondo-turno-llamando.png);" >' + Modulo["nombre"] + '</div>'
                    +'</div>'
                );
            }
            var pasos = 4;
            if( ModulosActivos.length < pasos ){
                pasos = ModulosActivos.length;
            }
			carrusel = $( "#carousel" ).rcarousel({
              width: anchoModulo, height: altoModulo,
              step: 1, visible: pasos,
    		  speed: 2345,
              auto: {
              	enabled: true,
              	interval: 2345,
              	direction: "next"
              }
			});
			
			despuesCargar();
			
        }
      })
      .fail(function(data) {
        console.log( "Falló la consulta. Contactar con el Centro TICS." );
        console.log( data );
      });
      
}


var TurnosLlamando = new Array();
var tiempoTurnoLlamando;
function mostrarTurnoLlamando(tiempo){
    var jqxhr = $.ajax({
        method: "POST",
        url: "api.php",
        dataType : "json",
        data: { operacion: "turnosLlamando" }
      }).done(function(data) {
        TurnosLlamando = new Array();
        if(data.RESPUESTA === 'EXITO'){
            var TurnosRecibidos = data.DATOS;
            if(TurnosRecibidos.length){
                for (var i in TurnosRecibidos) {
                    
                    var Turno = [];
                    Turno["id"] = TurnosRecibidos[i].turnoID;
                    Turno["codigo"] = TurnosRecibidos[i].turnoCODIGO;
                    Turno["nombre"] = TurnosRecibidos[i].Persona.personaNOMBRES + " " + TurnosRecibidos[i].Persona.personaAPELLIDOS;
                    Turno["identificacion"] = TurnosRecibidos[i].Persona.personaIDENTIFICACION;
                    Turno["moduloID"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionID;
                    Turno["modulo"] = TurnosRecibidos[i].ModuloAtencion.moduloAtencionTITULO;
                    
                    TurnosLlamando.push( Turno ); 
                    
                    
                    // console.log(TurnosRecibidos[i].Persona.personaNOMBRES + " " + TurnosRecibidos[i].Persona.personaAPELLIDOS);
                    // console.log(TurnosRecibidos[i].Persona.personaIDENTIFICACION);
                    // console.log(TurnosRecibidos[i].ModuloAtencion.moduloAtencionCODIGO);
                    // console.log(TurnosRecibidos[i].TipoCliente.tipoClienteCODIGO);
                    // console.log(TurnosRecibidos[i].TipoCliente.tipoClienteTITULO);
                }
            }
        }
        
        clearTimeout(tiempoTurnoLlamando);
        tiempoTurnoLlamando = setTimeout(mostrarTurnoLlamando, tiempo );
        
      }).fail(function(data) {
        console.log( "Falló la consulta. Contactar con el Centro TICS." );
        console.log( data );
      });
      
}

var mostrando = 0;
var tiempoMostrarTurnoLlamando;
function mostrarDatosTurnoLlamando( tiempo ){
    if(TurnosLlamando.length > 0){
        $("#nombre-turno-llamando").html(TurnosLlamando[mostrando].nombre);
        $("#codigo-modulo-llamando").html(TurnosLlamando[mostrando].modulo);
        cargarNuevoTurno(
            TurnosLlamando[mostrando].moduloID,
            TurnosLlamando[mostrando].modulo,
             TurnosLlamando[mostrando].nombre
        );
    }else{
        $("#nombre-turno-llamando").html("");
        $("#codigo-modulo-llamando").html("");
    }
    // clearTimeout(tiempoMostrarTurnoLlamando);
    // tiempoMostrarTurnoLlamando = setTimeout(mostrarDatosTurnoLlamando, tiempo );
}
function cargarNuevoTurno(moduloID, moduloCODIGO, turnoNOMBRE) {
    // $("#carousel #modulo-id-"+moduloID).remove();
    // $("#carousel #modulo-id-"+moduloID).addClass('hidden');
    // alert( turnoNOMBRE );
//     var $div, $jqElements = $();
// 	var div = '<div id="modulo-id-' + moduloID + '" class="table turno-atendiendo">'
//         +'<div id="modulo-turno-' + moduloID + '" class="col-xs-8 nombre-turno " >' ++ '' + turnoNOMBRE + '</div>'
//         +'<div id="modulo-codigo-' + moduloID + '" class="col-xs-4 modulo-turno " >' + moduloCODIGO + '</div>'
//         +'</div>';
    
    var data = carrusel.data( "data" );
    for( var i in data.paths ){
        var elemCarrusel = data.paths[i][0];
        if( elemCarrusel.id == 'modulo-id-' + moduloID + '' ){
            // console.log(elemCarrusel);
            $("#carousel #modulo-turno-"+moduloID).html( turnoNOMBRE );
            $div = $( elemCarrusel );
            $div.find('#modulo-turno-' + moduloID).html( turnoNOMBRE  );
        }
    }
    
    
// 	$( "#carousel" ).rcarousel( "append", div );							
    // $("#carousel .wrapper").prepend( div );
}



function mostrarSiguienteLlamando(){
    mostrando++;
    if(mostrando >= TurnosLlamando.length) mostrando = 0;
}












function mostrarTurnoAtendiendo(){
    var jqxhr = $.ajax({
        method: "POST",
        url: "api.php",
        dataType : "json",
        data: { operacion: "turnosAtendiendo" }
      }).done(function(data) {
        console.log(data);
        if(data.RESPUESTA === 'EXITO'){
            var Things = data.DATOS;
            for (var i = Things.length - 1; i >= 0; i--) {
                console.log(Things[i].turnoCODIGO);
                console.log(Things[i].Persona.personaNOMBRES);
                console.log(Things[i].Persona.personaAPELLIDOS);
                console.log(Things[i].Persona.personaIDENTIFICACION);
                console.log(Things[i].ModuloAtencion.moduloAtencionCODIGO);
                console.log(Things[i].ModuloAtencion.moduloAtencionCODIGOTITULO);
                console.log(Things[i].TipoCliente.tipoClienteCODIGO);
                console.log(Things[i].TipoCliente.tipoClienteTITULO);
            }
        }
      })
      .fail(function(data) {
        console.log( "Falló la consulta. Contactar con el Centro TICS." );
        console.log( data );
      });
      
}