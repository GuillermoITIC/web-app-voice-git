document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos HTML necesarios
    const orderResultDiv = document.getElementById('orderResult');
    const controlTexto = document.getElementById("controlTexto");

    // Verificar la compatibilidad del navegador
    if ('webkitSpeechRecognition' in window) {
        // Crear una nueva instancia de reconocimiento de voz
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'es-ES'; // Establecer el idioma del reconocimiento
        let recognitionActive = false; // Variable para rastrear si el reconocimiento está activo

        // Definir el comportamiento cuando se detecta un resultado de reconocimiento de voz
        recognition.onresult = function (event) {
            // Obtener el texto reconocido y convertirlo a minúsculas para simplificar las comparaciones
            const result = event.results[0][0].transcript.toLowerCase();
            console.log('Orden identificada:', result);

            // Realizar acciones según el texto reconocido
            switch (true) {
                // Casos de acciones
                case result.includes("verdana"):
                    orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                    controlTexto.style.fontFamily = 'Verdana';
                    insertarJson("Tipo de letra Verdana");
                    break;
                // Caso: "ChatGPT"
                case result.includes("chat gpt"):
                    orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                    window.open('https://www.chatgpt.com/');
                    insertarJson("Abrir ChatGPT");
                    break;
                // Caso: "Gmail"
                case result.includes("gmail"):
                    orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                    window.open('https://mail.google.com/');
                    insertarJson("Abrir Gmail");
                    break;
                // Caso: "Quitar"
                case result.includes("quitar"):
                    orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                    closeCurrentTab(); // Llamar a la función para cerrar la pestaña actual
                    break;
                // Caso: "Cerrar"
                case result.includes("cerrar"):
                    orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                    closeBrowser(); // Llamar a la función para cerrar el navegador
                    break;
                // Caso: "abre youtube"
                case result.includes("youtube"):
                    orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                    window.open('https://www.youtube.com/');
                    insertarJson("Abrir YouTube");
                    break;
                // Agregar más casos según sea necesario

                default:
                    console.log("Orden no reconocida:", result);
                    break;
            }
        };

        // Definir el comportamiento cuando no se detectan resultados durante 2 segundos
        recognition.onnomatch = function (event) {
            console.log('No se detectó ninguna orden.');
        }
        // Función para iniciar el reconocimiento de voz
        function startRecognition() {
            if (!recognitionActive) {
                recognitionActive = true; // Actualizar el estado del reconocimiento antes de iniciar
                recognition.start(); // Iniciar el reconocimiento después de actualizar el estado
            }
        }
        // Función para detener el reconocimiento de voz
        function stopRecognition() {
            recognition.stop(); // Detener el reconocimiento
            recognitionActive = false; // Actualizar el estado del reconocimiento
        }

        // Iniciar el reconocimiento de voz al cargar la página
        startRecognition();

        // Reiniciar el reconocimiento de voz cada 2 segundos si no se detectan resultados
    setInterval(function () {
        if (recognitionActive) {
            recognition.onend = function() {
                recognitionActive = false;
                startRecognition(); // Iniciar un nuevo reconocimiento
            }
            stopRecognition(); // Detener el reconocimiento si está activo
        } else {
            startRecognition(); // Iniciar el reconocimiento si no está activo
        }
    }, 2000);


    // Función para enviar los datos a la API
    function insertarJson(ingresos) {
        return fetch('https://66176ba4ed6b8fa434829b58.mockapi.io/ingresos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingresos })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al subir el recurso');
            }
            return response.json();
        })
        .then(data => console.log('Recurso subido exitosamente:', data))
        .catch(error => console.error('Error:', error));
    }
}
});
