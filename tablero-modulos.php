<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monitoreo de Módulos de Atención</title>
    <style>
        /* Estilos CSS para el diseño de tarjetas */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            padding: 20px;
        }

        .contenedor-tarjetas {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
        }

        .tarjeta {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 300px;
            transition: transform 0.3s ease;
        }

        .tarjeta:hover {
            transform: translateY(-5px);
        }

        .titulo-modulo {
            color: #333;
            margin-top: 0;
            font-size: 1.2em;
            border-bottom: 2px solid #007bff;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }

        .turno-actual {
            font-size: 2em;
            font-weight: bold;
            color: #28a745; /* Verde para turno activo */
            text-align: center;
            padding: 15px 0;
        }
        
        .turno-inactivo {
            font-size: 1.2em;
            font-weight: normal;
            color: #6c757d; /* Gris para módulo sin turno */
            text-align: center;
            padding: 15px 0;
        }
        
        .info-secundaria {
            font-size: 0.9em;
            color: #666;
            margin-top: 5px;
        }

        .loading-message {
            text-align: center;
            font-size: 1.5em;
            color: #007bff;
        }

    </style>
</head>
<body>

    <h1 style="text-align: center; color: #007bff;">Estado de Módulos de Atención</h1>

    <div id="resultado" class="contenedor-tarjetas">
        <p class="loading-message">Cargando datos...</p>
    </div>

    <script>
        const API_URL = 'https://api.citurcam.com/atendiendoPorModulosPorZonasAtencion';
        const PUESTO_TRABAJO_ID = 74; // El valor de 'datos' que se envía por POST
        const INTERVALO_MS = 30000; // 5 segundos

        // --- NUEVAS CONSTANTES Y VARIABLES PARA EL CONTADOR ---
// Reutilizamos INTERVALO_MS (ej: 5000)
const INTERVALO_SEGS = INTERVALO_MS / 1000;
let segundosRestantes = INTERVALO_SEGS;

// Función para actualizar el mensaje del contador
function actualizarMensajeContador() {
    // Usamos el mismo contenedor principal, pero podemos añadir un elemento para el mensaje
    let contadorSpan = document.getElementById('contador-recarga-mensaje');
    
    // Si el elemento no existe, lo creamos y lo añadimos al body o a un lugar visible
    if (!contadorSpan) {
        contadorSpan = document.createElement('span');
        contadorSpan.id = 'contador-recarga-mensaje';
        contadorSpan.style.display = 'block';
        contadorSpan.style.textAlign = 'center';
        contadorSpan.style.fontWeight = 'bold';
        contadorSpan.style.marginTop = '10px';
        
        // Asumimos que lo añadimos al final del body para que sea visible
        document.body.prepend(contadorSpan);
    }

    if (segundosRestantes > 0) {
        contadorSpan.textContent = `Actualizando en... ${segundosRestantes} segundos`;
    } else {
        contadorSpan.textContent = `Cargando datos...`;
    }
}

// 1. Contador que se ejecuta cada segundo en paralelo
setInterval(() => {
    segundosRestantes--;
    if (segundosRestantes < 0) {
        // Mantiene el valor en 0 (o lo resetea al valor máximo si la función principal es lenta)
        segundosRestantes = 0; 
    }
    actualizarMensajeContador();
}, 1000);

// --- FUNCIÓN PRINCIPAL CORREGIDA ---
async function obtenerDatosModulos() {
    const resultadoDiv = document.getElementById('resultado');
    
    // **ACCIÓN CLAVE:** Reiniciamos el contador inmediatamente al llamar la función
    segundosRestantes = INTERVALO_SEGS;

    // Mostrar mensaje de carga si es la primera vez o si la lista está vacía
    if (resultadoDiv.innerHTML.trim() === '' || resultadoDiv.querySelector('.loading-message')) {
        resultadoDiv.innerHTML = '<p class="loading-message">Actualizando datos...</p>';
    }

    try {
        // Prepara los datos (formato x-www-form-urlencoded que tu API acepta)
        const datosFormulario = new URLSearchParams();
        // Usamos 'datos[]' para que PHP lo interprete como un array, resolviendo el error de TypeError
        datosFormulario.append('datos[]', PUESTO_TRABAJO_ID); 

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: datosFormulario.toString()
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Verifica el estado de la respuesta y si hay datos
        if (data.RESPUESTA === 'EXITO' && data.DATOS && Array.isArray(data.DATOS)) {
            mostrarModulos(data.DATOS);
        } else {
            resultadoDiv.innerHTML = '<p class="loading-message" style="color: red;">Error: Respuesta de API no exitosa o sin datos.</p>';
            console.error('Respuesta de API:', data.MENSAJE || 'Respuesta inesperada');
        }

    } catch (error) {
        console.error('Error al obtener los datos:', error);
        resultadoDiv.innerHTML = `<p class="loading-message" style="color: red;">Error de conexión: ${error.message}. Reintentando...</p>`;
    }
}

        /**
         * Crea y muestra las tarjetas en el DOM.
         * @param {Array} modulos - Arreglo de objetos de módulos de atención.
         */
        function mostrarModulos(modulos) {
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = ''; // Limpiar el contenido anterior

            modulos.forEach(modulo => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjeta');

                const titulo = document.createElement('h3');
                titulo.classList.add('titulo-modulo');
                titulo.textContent = modulo.moduloAtencionTITULO;

                const turnoDiv = document.createElement('div');
                let turnoTexto;
                
                // Comprueba si hay un turno activo (turnoCODIGOCORTO o turnoID no son null)
                if (modulo.turnoCODIGOCORTO) {
                    turnoTexto = `Turno: ${modulo.turnoCODIGOCORTO}`;
                    turnoDiv.classList.add('turno-actual');
                } else {
                    turnoTexto = 'EN ESPERA';
                    turnoDiv.classList.add('turno-inactivo');
                }
                
                turnoDiv.textContent = turnoTexto;

                const infoAdicional = document.createElement('p');
                infoAdicional.classList.add('info-secundaria');
                infoAdicional.innerHTML = `
                    **Puesto de Trabajo:** ${modulo.puestoTrabajoTITULO}<br>
                    **Sede:** ${modulo.sedeTITULO}
                `;

                tarjeta.appendChild(titulo);
                tarjeta.appendChild(turnoDiv);
                tarjeta.appendChild(infoAdicional);
                
                resultadoDiv.appendChild(tarjeta);
            });
        }

        // 1. Ejecuta la función inmediatamente al cargar la página.
        obtenerDatosModulos();

        // 2. Configura la ejecución de la función cada 5 segundos (5000 milisegundos).
        setInterval(obtenerDatosModulos, INTERVALO_MS);
    </script>

</body>
</html>