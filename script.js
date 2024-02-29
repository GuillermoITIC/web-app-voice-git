document.addEventListener('DOMContentLoaded', function () {
    const resultContainer = document.getElementById('result-container');
    const resultElement = document.getElementById('result');
    const startListeningButton = document.getElementById('start-listening');
 
    // Agregar la funcionalidad de reconocimiento de voz
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
       const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
 
       recognition.lang = 'es-ES';
 
       recognition.onresult = function (event) {
          const transcript = event.results[0][0].transcript;
          resultElement.textContent = 'Orden Identificada: ' + transcript;
       };
 
       recognition.onerror = function (event) {
          console.error('Error en el reconocimiento de voz:', event.error);
          resultElement.textContent = 'Error en el reconocimiento de voz. Intenta de nuevo.';
       };
 
       startListeningButton.addEventListener('click', function () {
          recognition.start();
          resultElement.textContent = 'Escuchando...';
       });
    } else {
       resultElement.textContent = 'El reconocimiento de voz no está soportado en este navegador.';
       startListeningButton.disabled = true;
    }
 });
 