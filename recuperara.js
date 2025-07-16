/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.getElementById("recuperarForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // Obtener datos del formulario
  const nombres = this.nombres.value.trim();
  const usuario = this.usuario.value.trim();
  const gmail = this.gmail.value.trim();
  const telefono = this.telefono.value.trim();
  
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Buscar el usuario que coincida con TODOS los datos
  const index = usuarios.findIndex(
    (u) =>
      u.nombres.toLowerCase() === nombres.toLowerCase() &&
      u.usuario.toLowerCase() === usuario.toLowerCase() &&
      u.gmail.toLowerCase() === gmail.toLowerCase() &&
      u.telefono === telefono
  );

  if (index === -1) {
    alert("No se encontró un usuario con esos datos. Verifica la información.");
    return;
  }

  const nuevaContrasena = prompt("¡Usuario verificado!\nIngresa tu nueva contraseña:");

  if (!nuevaContrasena || nuevaContrasena.trim().length < 4) {
    alert("Contraseña inválida. Debe tener al menos 4 caracteres.");
    return;
  }

  // Guardar  contraseña
  usuarios[index].contrasena = nuevaContrasena.trim();

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("¡Contraseña actualizada exitosamente! Ahora puedes iniciar sesión con tu nueva contraseña.");
  
  window.location.href = "Iniciar seccion.html";
});


