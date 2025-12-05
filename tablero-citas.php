<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Tablero de Citas - Citurcam</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        html,
        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            font-family: Arial, sans-serif;
            background: #f4f6fb;
            color: #222;
        }

        .layout {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        /* HEADER SUPERIOR */
        .header {
            padding: 10px 20px;
            background: linear-gradient(90deg, #0059c9, #2196f3);
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header-titulo {
            font-size: 1.5rem;
            font-weight: bold;
        }

        .header-derecha {
            display: flex;
            align-items: center;
            gap: 20px;
            font-size: 0.9rem;
        }

        #contador {
            font-weight: bold;
        }

        #ultima-actualizacion {
            font-style: italic;
        }

        /* BARRA DE FILTROS Y RESUMEN */
        .barra-superior {
            padding: 10px 20px;
            background: #ffffff;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 15px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            z-index: 1;
        }

        .filtro-bloque {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #333;
        }

        .filtro-bloque label {
            font-size: 0.9rem;
        }

        .filtro-bloque select {
            padding: 5px 10px;
            border-radius: 4px;
            border: 1px solid #ccd2e3;
            background: #f8f9ff;
            color: #222;
        }

        .resumen-estadisticas {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-left: auto;
        }

        .chip-resumen {
            background: #ffffff;
            border-radius: 16px;
            padding: 6px 10px;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 6px;
            border: 1px solid #d4d9ea;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
            white-space: nowrap;
        }

        .chip-resumen span.valor {
            font-weight: bold;
            color: #0059c9;
        }

        /* CONTENIDO PRINCIPAL (TABLERO) */
        .contenido {
            flex: 1;
            overflow-y: auto;
            padding: 15px 20px;
        }

        .contenedor-tarjetas {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: flex-start;
        }

        .tarjeta-modulo {
            background: #ffffff;
            color: #222;
            width: 340px;
            border-radius: 10px;
            box-shadow: 0 3px 6px rgba(15, 35, 95, 0.12);
            padding: 12px 14px;
            border-left: 6px solid #2196f3;
            display: flex;
            flex-direction: column;
            max-height: 80vh;
        }

        .titulo-modulo {
            font-size: 1rem;
            font-weight: bold;
            margin-bottom: 3px;
        }

        .subtitulo-modulo {
            font-size: 0.8rem;
            color: #6c757d;
            margin-bottom: 6px;
        }

        .kpis-modulo {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            font-size: 0.75rem;
            margin-bottom: 6px;
        }

        .kpis-modulo span {
            background: #f4f6fb;
            border-radius: 10px;
            padding: 2px 6px;
            border: 1px solid #e0e4f0;
        }

        .lista-citas {
            overflow-y: auto;
            padding-right: 4px;
            border-top: 1px solid #eef1f7;
            margin-top: 6px;
        }

        .bloque-cita {
            padding: 7px 8px;
            margin-top: 6px;
            background: #f9fbff;
            border-radius: 6px;
            display: grid;
            grid-template-columns: 60px 1fr;
            grid-column-gap: 8px;
            align-items: flex-start;
            font-size: 0.82rem;
            border: 1px solid #e2e7f3;
        }

        .bloque-cita-hora {
            font-weight: bold;
            font-size: 0.9rem;
            color: #0059c9;
        }

        .bloque-cita-detalles {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .fila-estado-servicio {
            display: flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;
        }

        .estado-cita {
            font-size: 0.8rem;
        }

        .estado-sin-asignar {
            color: #6c757d;
        }

        .estado-pendiente {
            color: #d39e00;
            font-weight: bold;
        }

        .estado-atendido {
            color: #28a745;
            font-weight: bold;
        }

        .estado-cancelado {
            color: #dc3545;
            font-weight: bold;
        }

        .chip-servicio {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 10px;
            font-size: 0.7rem;
            color: #fff;
            align-self: flex-start;
        }

        /* Colores por servicio */
        .servicio-CAE {
            background: #007bff;
        }

        .servicio-CAJA {
            background: #28a745;
        }

        .servicio-RNT {
            background: #6f42c1;
        }

        .servicio-REVI {
            background: #fd7e14;
        }

        .servicio-DEFAULT {
            background: #495057;
        }

        .detalle-ids {
            font-size: 0.75rem;
            color: #555;
        }

        .detalle-ids span {
            margin-right: 8px;
        }

        .tiempos-cita {
            font-size: 0.75rem;
            color: #333;
        }

        .tiempos-cita strong {
            font-weight: 600;
        }

        .fechas-crudas {
            font-size: 0.7rem;
            color: #7a8699;
        }

        .observaciones-cita {
            font-size: 0.7rem;
            color: #555;
        }

        .links-cita {
            font-size: 0.7rem;
            margin-top: 2px;
        }

        .links-cita a {
            color: #0059c9;
            text-decoration: none;
        }

        .links-cita a:hover {
            text-decoration: underline;
        }

        .mensaje-sin-citas {
            font-size: 0.8rem;
            color: #999;
            margin-top: 4px;
            font-style: italic;
        }

        .loading-message {
            text-align: center;
            font-size: 1.2rem;
            color: #0059c9;
            margin-top: 40px;
        }

        .mensaje-error {
            text-align: center;
            color: #dc3545;
            margin-top: 20px;
        }

        /* Colores de TARJETA según estado */
        .cita-bg-sin-asignar {
            background: #f1f3f5 !important;
            border-left-color: #adb5bd !important;
            color: #343a40 !important;
        }

        .cita-bg-pendiente {
            background: #fff4ce !important;
            border-left-color: #ffc107 !important;
            color: #664d03 !important;
        }

        .cita-bg-atendiendo {
            background: #d1e7ff !important;
            border-left-color: #0d6efd !important;
            color: #084298 !important;
        }

        .cita-bg-atendido {
            background: #d3f9d8 !important;
            border-left-color: #28a745 !important;
            color: #0f5132 !important;
        }

        .cita-bg-cancelado {
            background: #ffe3e3 !important;
            border-left-color: #dc3545 !important;
            color: #842029 !important;
        }

        .cita-bg-default {
            background: #e9ecef !important;
            border-left-color: #6c757d !important;
            color: #495057 !important;
        }
    </style>
</head>

<body>

    <div class="layout">

        <!-- HEADER SUPERIOR -->
        <div class="header">
            <div class="header-titulo">
                Tablero de Citas del Día
            </div>
            <div class="header-derecha">
                <div id="contador">Cargando...</div>
                <div id="ultima-actualizacion">Última actualización: --</div>
            </div>
        </div>

        <!-- BARRA DE FILTROS + RESUMEN -->
        <div class="barra-superior">
            <div class="filtro-bloque">
                <label for="filtroServicio">Filtrar por servicio:</label>
                <select id="filtroServicio">
                    <option value="">Todos los servicios</option>
                    <!-- Se llena dinámicamente -->
                </select>
            </div>
            <div class="filtro-bloque">
                <label for="filtroFecha">Fecha:</label>
                <select id="filtroFecha">
                    <option value="">Cargando...</option>
                </select>
            </div>


            <div class="resumen-estadisticas">
                <div class="chip-resumen">
                    Total: <span id="res-total" class="valor">0</span>
                </div>
                <div class="chip-resumen">
                    Sin asignar: <span id="res-sin-asignar" class="valor">0</span>
                </div>
                <div class="chip-resumen">
                    Pendientes: <span id="res-pendiente" class="valor">0</span>
                </div>
                <div class="chip-resumen">
                    Atendidas: <span id="res-atendido" class="valor">0</span>
                </div>
                <div class="chip-resumen">
                    Canceladas: <span id="res-cancelado" class="valor">0</span>
                </div>
                <div class="chip-resumen">
                    Virtuales: <span id="res-virtual" class="valor">0</span>
                </div>
                <div class="chip-resumen">
                    Presenciales: <span id="res-presencial" class="valor">0</span>
                </div>
                <div class="chip-resumen">
                    Prom. Asig→Atención: <span id="res-prom-asig-atenc" class="valor">—</span>
                </div>
                <div class="chip-resumen">
                    Prom. Atención→Fin: <span id="res-prom-atenc-fin" class="valor">—</span>
                </div>
                <div class="chip-resumen">
                    Prom. Cita→Fin: <span id="res-prom-cita-fin" class="valor">—</span>
                </div>
            </div>
        </div>

        <!-- CONTENIDO PRINCIPAL -->
        <div class="contenido">
            <div id="contenedorTarjetas" class="contenedor-tarjetas">
                <p class="loading-message">Cargando información...</p>
            </div>
            <div id="mensajeError" class="mensaje-error"></div>
        </div>
    </div>

    <script>
        // ================================
        // CONFIGURACIÓN BÁSICA
        // ================================
        const SEDE_ID = "10";
        const FECHA_CITA = new Date().toISOString().split('T')[0]; // AAAA-MM-DD
        const OPERACION_ENDPOINT = "calendarioCitasFecha"; // lo dejamos igual a tu versión funcional
        const INTERVALO_SEGUNDOS = 300; // 5 minutos

        let segundosRestantes = INTERVALO_SEGUNDOS;
        let ultimoResultado = null;
        let ultimoMapaEstados = {}; // { citaID: "ESTADO" }
        let audioContext = null;

        // ================================
        // CONEXIÓN AL ENDPOINT
        // (mantenemos exactamente tu formato)
        // ================================
        if (typeof window.mostrarModalDeCarga !== 'function') {
            window.mostrarModalDeCarga = function() {};
        }

        window.conectarseEndPoint = async function(operacion, params = {}) {
            const api = 'https://api.citurcam.com/' + operacion;

            if (typeof params !== 'object' || params === null) {
                params = params.toString();
            }
            mostrarModalDeCarga();
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify(params)
            });
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.status);
            }
            return await response.json();
        };

        // ================================
        // UTILIDADES DE FECHAS Y TIEMPOS
        // ================================
        function parseDateTime(str) {
            if (!str || typeof str !== 'string') return null;
            // Espera formato "YYYY-MM-DD HH:MM:SS"
            const normalizado = str.replace(' ', 'T');
            const d = new Date(normalizado);
            if (isNaN(d.getTime())) return null;
            return d;
        }

        function diffMs(inicioStr, finStr) {
            const ini = parseDateTime(inicioStr);
            const fin = parseDateTime(finStr);
            if (!ini || !fin) return null;
            const ms = fin.getTime() - ini.getTime();
            if (!isFinite(ms) || ms < 0) return null;
            return ms;
        }

        // Formato C: minutos + HH:MM:SS
        function formatearDuracionMs(ms) {
            if (ms == null) return '—';
            const totalSeg = Math.round(ms / 1000);
            const min = Math.round(ms / 60000);

            let resto = totalSeg;
            const h = Math.floor(resto / 3600);
            resto = resto % 3600;
            const m = Math.floor(resto / 60);
            const s = resto % 60;

            const hh = String(h).padStart(2, '0');
            const mm = String(m).padStart(2, '0');
            const ss = String(s).padStart(2, '0');

            return `${min} min (${hh}:${mm}:${ss})`;
        }

        function formatearDuracionPromedio(sumMs, count) {
            if (!count || !sumMs) return '—';
            const promedio = sumMs / count;
            return formatearDuracionMs(promedio);
        }

        function soloHora(str) {
            if (!str || typeof str !== 'string') return '--:--';
            return str.substring(11, 16);
        }

        // ================================
        // CONTADOR VISUAL
        // ================================
        setInterval(() => {
            segundosRestantes--;
            if (segundosRestantes < 0) {
                segundosRestantes = 0;
            }
            document.getElementById('contador').textContent =
                'Actualizando en ' + segundosRestantes + ' segundos...';
        }, 1000);

        // ================================
        // FUNCIÓN PRINCIPAL DE CARGA
        // ================================
        async function cargarTableroCitas(fechaSeleccionada = FECHA_CITA) {

            segundosRestantes = INTERVALO_SEGUNDOS;
            const contenedor = document.getElementById('contenedorTarjetas');
            const mensajeError = document.getElementById('mensajeError');
            mensajeError.textContent = '';
            contenedor.innerHTML = '<p class="loading-message">Actualizando información...</p>';

            try {
                const params = {
                    sedeID: SEDE_ID,
                    citaFCHCITA: fechaSeleccionada
                };

                const data = await window.conectarseEndPoint(OPERACION_ENDPOINT, params);

                // Guardamos último resultado
                ultimoResultado = data;

                // Detector de cambios de estado
                detectarCambiosEstados(data);

                // Actualizamos filtros y tablero
                poblarFiltroServicios(data);
                renderTablero(data);

                // Actualizar hora de última actualización
                const ahora = new Date();
                const strHora = ahora.toLocaleTimeString('es-CO', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                document.getElementById('ultima-actualizacion').textContent =
                    'Última actualización: ' + strHora;

            } catch (error) {
                console.error(error);
                contenedor.innerHTML = '';
                mensajeError.textContent = 'Error al cargar datos de citas: ' + error.message;
            }
        }

        // ================================
        // SONIDO CUANDO CAMBIA CUALQUIER ESTADO
        // ================================
        function detectarCambiosEstados(data) {
            if (!data || !data.datos) return;

            const nuevosEstados = {};
            let huboCambios = false;

            data.datos.forEach(bloque => {
                (bloque.citas || []).forEach(cita => {
                    const id = cita.citaID;
                    const estado = (cita.citaESTADOCITA || '').toUpperCase();
                    nuevosEstados[id] = estado;
                    if (ultimoMapaEstados[id] && ultimoMapaEstados[id] !== estado) {
                        huboCambios = true;
                    }
                });
            });

            if (huboCambios) {
                reproducirBeep();
            }

            ultimoMapaEstados = nuevosEstados;
        }

        function reproducirBeep() {
            try {
                if (!audioContext) {
                    audioContext = new(window.AudioContext || window.webkitAudioContext)();
                }
                const duracion = 0.25;
                const frecuencia = 880;

                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(frecuencia, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.start();
                oscillator.stop(audioContext.currentTime + duracion);
            } catch (e) {
                console.warn('No se pudo reproducir el beep:', e);
            }
        }

        // ================================
        // FILTRO DE SERVICIOS
        // ================================
        function poblarFiltroServicios(data) {
            const select = document.getElementById('filtroServicio');
            const valorAnterior = select.value || '';

            // Limpiar (dejando opción "todos")
            select.innerHTML = '<option value="">Todos los servicios</option>';

            if (data && data.TiposServicios) {
                Object.entries(data.TiposServicios).forEach(([codigo, info]) => {
                    const opt = document.createElement('option');
                    opt.value = codigo;
                    opt.textContent = info.titulo + ' (' + codigo + ')';
                    select.appendChild(opt);
                });
            }

            // Restaurar selección si sigue existiendo
            if (valorAnterior) {
                const opcion = Array.from(select.options).find(o => o.value === valorAnterior);
                if (opcion) select.value = valorAnterior;
            }
        }

        document.getElementById('filtroServicio').addEventListener('change', () => {
            if (ultimoResultado) {
                renderTablero(ultimoResultado);
            }
        });

        // ================================
        // RENDERIZAR TABLERO (TARJETAS)
        // ================================
        function renderTablero(data) {
            const contenedor = document.getElementById('contenedorTarjetas');
            contenedor.innerHTML = '';
            const filtroServicio = document.getElementById('filtroServicio').value;

            if (!data || !data.datos || !data.modulos) {
                contenedor.innerHTML = '<p class="loading-message">No hay datos para mostrar.</p>';
                actualizarResumen([]);
                return;
            }

            // Mapa de citas por módulo
            const mapaCitasPorModulo = {};
            const todasLasCitas = [];

            data.datos.forEach(bloque => {
                (bloque.citas || []).forEach(cita => {
                    todasLasCitas.push(cita);
                    if (!mapaCitasPorModulo[cita.moduloAtencionID]) {
                        mapaCitasPorModulo[cita.moduloAtencionID] = [];
                    }
                    mapaCitasPorModulo[cita.moduloAtencionID].push(cita);
                });
            });

            // Actualizar resumen general
            actualizarResumen(todasLasCitas);

            // Tarjetas por módulo
            data.modulos.forEach(modulo => {
                const citasModulo = (mapaCitasPorModulo[modulo.moduloAtencionID] || []).slice();

                // Aplicar filtro de servicio si está seleccionado
                const citasFiltradas = citasModulo.filter(cita => {
                    if (!filtroServicio) return true;
                    return cita.turnoTipoServicioCODIGO === filtroServicio;
                });

                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjeta-modulo');

                const colorBorde = colorPorServicio(modulo.turnoTipoServicioCODIGO);
                tarjeta.style.borderLeftColor = colorBorde;

                const titulo = document.createElement('div');
                titulo.classList.add('titulo-modulo');
                titulo.textContent = modulo.moduloAtencionTITULO || modulo.moduloAtencionDESCRIPCION;

                const subtitulo = document.createElement('div');
                subtitulo.classList.add('subtitulo-modulo');
                subtitulo.textContent = (modulo.moduloAtencionMODO || '') + ' · ' + (modulo.turnoTipoServicioTITULO || '');

                // KPIs por módulo (conteos por estado)
                const kpis = document.createElement('div');
                kpis.classList.add('kpis-modulo');
                const totalModulo = citasModulo.length;
                let sinAsignarM = 0,
                    pendienteM = 0,
                    atendidoM = 0,
                    canceladoM = 0;

                citasModulo.forEach(c => {
                    const est = (c.citaESTADOCITA || '').toUpperCase();
                    if (est === 'SIN ASIGNAR') sinAsignarM++;
                    else if (est === 'PENDIENTE') pendienteM++;
                    else if (est === 'ATENDIDO') atendidoM++;
                    else if (est === 'CANCELADO' || est === 'CANCELADA') canceladoM++;
                });

                kpis.innerHTML = `
                <span>Total: ${totalModulo}</span>
                <span>Sin asignar: ${sinAsignarM}</span>
                <span>Pend.: ${pendienteM}</span>
                <span>Atend.: ${atendidoM}</span>
                <span>Cancel.: ${canceladoM}</span>
            `;

                const listaCitas = document.createElement('div');
                listaCitas.classList.add('lista-citas');

                if (citasFiltradas.length === 0) {
                    const msg = document.createElement('div');
                    msg.classList.add('mensaje-sin-citas');
                    msg.textContent = 'Sin citas para este servicio / filtro.';
                    listaCitas.appendChild(msg);
                } else {
                    // Ordenar por fecha/hora
                    citasFiltradas.sort((a, b) =>
                        new Date(a.citaFCHCITA) - new Date(b.citaFCHCITA)
                    );

                    citasFiltradas.forEach(cita => {
                        const bloque = document.createElement('div');
                        bloque.classList.add('bloque-cita');

                        const hora = document.createElement('div');
                        hora.classList.add('bloque-cita-hora');
                        hora.textContent = soloHora(cita.citaFCHCITA);

                        const detalles = document.createElement('div');
                        detalles.classList.add('bloque-cita-detalles');

                        // Fila estado + servicio
                        const filaEstadoServ = document.createElement('div');
                        filaEstadoServ.classList.add('fila-estado-servicio');                        
                        // Determinar estado real de la cita
                        let estadoTexto = (cita.citaESTADOCITA || '').toUpperCase();

                        // Si tiene fecha de cancelación → es CANCELADO, sin importar el estado reportado
                        if (cita.citaFCHCANCELACION && cita.citaFCHCANCELACION !== "null") {
                            estadoTexto = "CANCELADO";
                        }

                        const spanEstado = document.createElement('span');
                        spanEstado.classList.add('estado-cita');
                        spanEstado.textContent = estadoTexto || 'SIN ESTADO';

                        switch (estadoTexto) {
                            case 'SIN ASIGNAR':
                                spanEstado.classList.add('estado-sin-asignar');
                                break;
                            case 'PENDIENTE':
                                spanEstado.classList.add('estado-pendiente');
                                break;
                            case 'ATENDIDO':
                                spanEstado.classList.add('estado-atendido');
                                break;
                            case 'CANCELADO':
                            case 'CANCELADA':
                                spanEstado.classList.add('estado-cancelado');
                                break;
                            default:
                                spanEstado.classList.add('estado-sin-asignar');
                        }

                        // Chip de servicio
                        const chip = document.createElement('span');
                        chip.classList.add('chip-servicio');
                        const codServ = cita.turnoTipoServicioCODIGO || 'DEFAULT';
                        chip.classList.add('servicio-' + (codServ in {
                            CAE: 1,
                            CAJA: 1,
                            RNT: 1,
                            REVI: 1
                        } ? codServ : 'DEFAULT'));
                        chip.textContent = codServ;

                        filaEstadoServ.appendChild(spanEstado);
                        filaEstadoServ.appendChild(chip);

                        // IDs (cita, persona, colaborador)
                        const detalleIds = document.createElement('div');
                        detalleIds.classList.add('detalle-ids');
                        detalleIds.innerHTML = `
                        <span>#Cita: ${cita.citaID}</span>
                        <span>PersonaID: ${cita.personaID ?? '—'}</span>
                        <span>ColabID: ${cita.colaboradorID ?? '—'}</span>
                    `;

                        // Tiempos (formato C)
                        const msAsigAtenc = diffMs(cita.citaFCHASIGNACION, cita.citaFCHATENCION);
                        const msAtencFin = diffMs(cita.citaFCHATENCION, cita.citaFCHAATENDIDO);
                        const msCitaFin = diffMs(cita.citaFCHCITA, cita.citaFCHAATENDIDO);

                        const tiempos = document.createElement('div');
                        tiempos.classList.add('tiempos-cita');
                        tiempos.innerHTML = `
                        <div><strong>Asig → Atención:</strong> ${formatearDuracionMs(msAsigAtenc)}</div>
                        <div><strong>Atención → Fin:</strong> ${formatearDuracionMs(msAtencFin)}</div>
                        <div><strong>Cita → Fin:</strong> ${formatearDuracionMs(msCitaFin)}</div>
                    `;

                        // Fechas crudas (solo horas de trazas)
                        const fechasCrudas = document.createElement('div');
                        fechasCrudas.classList.add('fechas-crudas');
                        fechasCrudas.innerHTML = `
                        Prog: ${soloHora(cita.citaFCHCITA)} · 
                        Asig: ${soloHora(cita.citaFCHASIGNACION)} · 
                        Atenc: ${soloHora(cita.citaFCHATENCION)} · 
                        Fin: ${soloHora(cita.citaFCHAATENDIDO)} · 
                        Canc: ${soloHora(cita.citaFCHCANCELACION)}
                    `;

                        // Observaciones (si tiene)
                        if (cita.citaOBSERVACIONES && cita.citaOBSERVACIONES.trim() !== '') {
                            const obs = document.createElement('div');
                            obs.classList.add('observaciones-cita');
                            obs.textContent = 'Obs: ' + cita.citaOBSERVACIONES.trim();
                            detalles.appendChild(obs);
                        }

                        // Links Calendar / Meet
                        if (cita.citaENLACECALENDAR || cita.citaENLACEMEET) {
                            const links = document.createElement('div');
                            links.classList.add('links-cita');
                            if (cita.citaENLACECALENDAR) {
                                const aCal = document.createElement('a');
                                aCal.href = cita.citaENLACECALENDAR;
                                aCal.target = '_blank';
                                aCal.textContent = '📅 Calendar';
                                links.appendChild(aCal);
                            }
                            if (cita.citaENLACECALENDAR && cita.citaENLACEMEET) {
                                links.appendChild(document.createTextNode(' · '));
                            }
                            if (cita.citaENLACEMEET) {
                                const aMeet = document.createElement('a');
                                aMeet.href = cita.citaENLACEMEET;
                                aMeet.target = '_blank';
                                aMeet.textContent = '🎥 Meet';
                                links.appendChild(aMeet);
                            }
                            detalles.appendChild(links);
                        }

                        detalles.appendChild(filaEstadoServ);
                        detalles.appendChild(detalleIds);
                        detalles.appendChild(tiempos);
                        detalles.appendChild(fechasCrudas);

                        bloque.appendChild(hora);
                        bloque.appendChild(detalles);


                        // Asignar color según el estado de la cita
                        const estadoNorm = estadoTexto.toLowerCase();

                        if (estadoNorm === "sin asignar") {
                            bloque.classList.add("cita-bg-sin-asignar");
                        } else if (estadoNorm === "pendiente") {
                            bloque.classList.add("cita-bg-pendiente");
                        } else if (estadoNorm === "atendiendo") {
                            bloque.classList.add("cita-bg-atendiendo");
                        } else if (estadoNorm === "atendido") {
                            bloque.classList.add("cita-bg-atendido");
                        } else if (estadoNorm === "cancelado" || estadoNorm === "cancelada") {
                            bloque.classList.add("cita-bg-cancelado");
                        } else {
                            bloque.classList.add("cita-bg-default");
                        }

                        listaCitas.appendChild(bloque);
                    });
                }

                tarjeta.appendChild(titulo);
                tarjeta.appendChild(subtitulo);
                tarjeta.appendChild(kpis);
                tarjeta.appendChild(listaCitas);

                contenedor.appendChild(tarjeta);
            });
        }

        // ================================
        // RESUMEN SUPERIOR
        // ================================
        function actualizarResumen(citas) {
            let total = citas.length;
            let sinAsignar = 0;
            let pendiente = 0;
            let atendido = 0;
            let cancelado = 0;
            let virtual = 0;
            let presencial = 0;

            let sumAsigAtenc = 0,
                countAsigAtenc = 0;
            let sumAtencFin = 0,
                countAtencFin = 0;
            let sumCitaFin = 0,
                countCitaFin = 0;

            citas.forEach(cita => {
                const est = (cita.citaESTADOCITA || '').toUpperCase();
                if (est === 'SIN ASIGNAR') sinAsignar++;
                else if (est === 'PENDIENTE') pendiente++;
                else if (est === 'ATENDIDO') atendido++;
                else if (est === 'CANCELADO' || est === 'CANCELADA') cancelado++;

                const tipo = (cita.citaTIPO || '').toUpperCase();
                if (tipo === 'VIRTUAL') virtual++;
                else if (tipo === 'PRESENCIAL') presencial++;

                const msAA = diffMs(cita.citaFCHASIGNACION, cita.citaFCHATENCION);
                if (msAA != null) {
                    sumAsigAtenc += msAA;
                    countAsigAtenc++;
                }

                const msAF = diffMs(cita.citaFCHATENCION, cita.citaFCHAATENDIDO);
                if (msAF != null) {
                    sumAtencFin += msAF;
                    countAtencFin++;
                }

                const msCF = diffMs(cita.citaFCHCITA, cita.citaFCHAATENDIDO);
                if (msCF != null) {
                    sumCitaFin += msCF;
                    countCitaFin++;
                }
            });

            document.getElementById('res-total').textContent = total;
            document.getElementById('res-sin-asignar').textContent = sinAsignar;
            document.getElementById('res-pendiente').textContent = pendiente;
            document.getElementById('res-atendido').textContent = atendido;
            document.getElementById('res-cancelado').textContent = cancelado;
            document.getElementById('res-virtual').textContent = virtual;
            document.getElementById('res-presencial').textContent = presencial;

            document.getElementById('res-prom-asig-atenc').textContent =
                formatearDuracionPromedio(sumAsigAtenc, countAsigAtenc);
            document.getElementById('res-prom-atenc-fin').textContent =
                formatearDuracionPromedio(sumAtencFin, countAtencFin);
            document.getElementById('res-prom-cita-fin').textContent =
                formatearDuracionPromedio(sumCitaFin, countCitaFin);
        }

        // ================================
        // COLOR POR SERVICIO (BORDER TARJETAS)
        // ================================
        function colorPorServicio(codigo) {
            switch (codigo) {
                case 'CAE':
                    return '#007bff';
                case 'CAJA':
                    return '#28a745';
                case 'RNT':
                    return '#6f42c1';
                case 'REVI':
                    return '#fd7e14';
                default:
                    return '#17a2b8';
            }
        }

        async function cargarFechasHabilitadas() {
            try {
                const params = {
                    sedeID: SEDE_ID
                };
                const data = await window.conectarseEndPoint("buscarFechasCitasHabilitasPorSede", params);

                const select = document.getElementById("filtroFecha");
                select.innerHTML = "";

                if (data.FechasHabilitadas && data.FechasHabilitadas.length > 0) {
                    data.FechasHabilitadas.forEach(item => {
                        const op = document.createElement("option");
                        op.value = item.fecha;
                        op.textContent = item.fecha;
                        select.appendChild(op);
                    });
                }

                // Seleccionar por defecto la fecha actual si existe
                if (select.querySelector(`option[value="${FECHA_CITA}"]`)) {
                    select.value = FECHA_CITA;
                } else {
                    select.selectedIndex = 0;
                }

            } catch (e) {
                console.error("Error cargando fechas habilitadas:", e);
            }
        }

        function cargarTableroCitasPorFecha(fecha) {
            // Cambia la fecha y recarga el tablero
            cargarTableroCitas(fecha);
        }


        document.getElementById("filtroFecha").addEventListener("change", function() {
            // Reemplaza la fecha global y recarga el tablero
            cargarTableroCitasPorFecha(this.value);
        });



        // ================================
        // ARRANQUE Y AUTO-REFRESCO
        // ================================
        cargarFechasHabilitadas();
        cargarTableroCitas();
        setInterval(() => cargarTableroCitas(document.getElementById("filtroFecha").value), INTERVALO_SEGUNDOS * 1000);
    </script>

</body>

</html>