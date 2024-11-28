<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>

<div style="text-align: center;" >
    <div style="font-size: 200%; width: 100%;" >Estamos atendiendo al ...</div>
    <table class="table table-condensed table-striped" style="font-size: 125%; width: 100%;">
        <thead>
            <tr class="row" >
                <th class="col-md-5" >Turno</th>
                <th class="col-md-7" >Modulo</th>
            </tr>
        </thead>
        <tbody id="turnos-atendiendo"></tbody>
    </table>
</div>


<script type="text/javascript" >
    setInterval(
            function () {
                ejecutarOperacionApi(
                        'https://api.sicam.ccsm.org.co/turnos/atendiendo/sede/1',
                        null, function (objJSON) {
                            $("#turnos-atendiendo").html("");
                            for (var i = 0; i < objJSON.turnos.length; i++) {
                                console.log('#' + objJSON.turnos[i]['turnosID']);
                                $("#turnos-atendiendo").append(
                                        '<tr class="row" >' +
                                        '<td id="codigo-turno" class="col-md-5" style="font-size: 150%;">' + objJSON.turnos[i]['turnoTITULOCODIGO'].substring( objJSON.turnos[i]['turnoTITULOCODIGO'].length-3,objJSON.turnos[i]['turnoTITULOCODIGO'].length) + '</td>' +
                                        '<td id="modulo-turno" class="col-md-7" style="font-size: 120%;">' + objJSON.turnos[i]['modulosAtencionCODIGO'].substring( objJSON.turnos[i]['modulosAtencionCODIGO'].length-13,objJSON.turnos[i]['modulosAtencionCODIGO'].length) + '</td>' +
                                        '</tr>'
                                        );
                                $("#turnos-atendiendo").fadeIn();
                            }
                        }
                );
            }
    , 753);
</script>