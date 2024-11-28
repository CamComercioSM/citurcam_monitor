<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>

<div style="text-align: center;" >
    <div style="font-size: 200%; width: 100%;" >Llamando al turno...</div>
    <table id="tbl-turnos" border="1" align="center" style="font-size: 170%; width: 98%; margin:auto;" >
        <tr class="row" style=" font-size: 100%; background-color: #000; color: #fff;">
            <td class="col-md-5">TURNO</td>
            <td class="col-md-7">MODULO</td>
        </tr>
        <tbody id="turnos-llamando" ><tr class="row" ><td id="codigo-turno" class="col-md-5" style="font-size: 150%;">???</td><td id="modulo-turno" class="col-md-7" style="font-size: 150%;">????</td></tr></tbody>        
    </table>
</div>

<div style="display: none;" >
    <audio id="sonido-turno" controls="controls" autoplay="">
        <source src="audio/Ding-dong-intercom.mp3" type="audio/mp3" />
        <source src="audio/Door-bell.mp3" type="audio/mp3" />
        Your browser does not support the audio tag.
    </audio>
</div>

<script type="text/javascript" >
    var relojAnimacion = null;
    var audio1 = new Audio('audio/Ding-dong-intercom.mp3');
    var audio2 = new Audio('audio/Door-bell.mp3');
    var arrLlamando = [];
    var arrLlamandoAntes = [];
    setInterval(
            function () {
                ejecutarOperacionApi(
                        'https://api.sicam.ccsm.org.co/turnos/siguiente/sede/1',
                        null, function (objJSON) {

                            console.log(JSON.stringify(objJSON));

                            $("#turnos-llamando").html("");
                            $("#turnos-llamando").fadeOut();
                            arrLlamando = [];
                            for (var i = 0; i < objJSON.turnos.length; i++) {
                                console.log('#' + objJSON.turnos[i]['turnosID']);
                                $("#turnos-llamando").append(
                                        '<tr class="row" >' +
                                        '<td id="codigo-turno" class="col-md-5" style="font-size: 150%;">' + objJSON.turnos[i]['turnoTITULOCODIGO'].substring(objJSON.turnos[i]['turnoTITULOCODIGO'].length - 3, objJSON.turnos[i]['turnoTITULOCODIGO'].length) + '</td>' +
                                        '<td id="modulo-turno" class="col-md-7" style="font-size: 120%;">' + objJSON.turnos[i]['modulosAtencionCODIGO'].substring(objJSON.turnos[i]['modulosAtencionCODIGO'].length - 13, objJSON.turnos[i]['modulosAtencionCODIGO'].length) + '</td>' +
                                        '</tr>'
                                        );
                                $("#turnos-llamando").slideDown();
                                //$("#turnos-llamando").fadeOut();
                                arrLlamando.push(objJSON.turnos[i]['turnoTITULOCODIGO']);
                            }

                            var cambio = false;
                            if (arrLlamando.length !== arrLlamandoAntes.length) {
                                cambio = true;
                                //audio2.play();
                            }

                            for (var i = 0; i < arrLlamando.length; i++) {
                                var encontrado = false;
                                for (var j = 0; j < arrLlamandoAntes.length; j++) {
                                    if (arrLlamando[i] == arrLlamandoAntes[j]) {
                                        encontrado = true;
                                    }
                                }
                                if (!encontrado) {
                                    cambio = true;
                                    audio1.play();
                                }
                            }

                            arrLlamandoAntes = arrLlamando;

                            if (cambio) {
                                clearTimeout(relojAnimacion);
                                $("#tbl-turnos").addClass("siguiente-turno");
                                relojAnimacion = setTimeout(function () {
                                    $("#tbl-turnos").removeClass("siguiente-turno")
                                }, 5310);
                            } else {
                            }


                        }
                );
            }
    , 753);
</script>


