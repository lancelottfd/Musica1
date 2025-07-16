/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.addEventListener("DOMContentLoaded", () => {
    // Rellenar automáticamente el nombre del profesor desde la URL
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get("nombre");
    if (nombre) {
        document.getElementById("nombreProfesor").value = nombre.replace(/\+/g, " ");
    }

    // Capturar el formulario
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault(); 
        alert("¡Solicitud enviada correctamente! Nos contactaremos contigo pronto.");

        window.location.href = "AprenderATocar.html";
    });
});

