/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


document.getElementById("registroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener los datos
  const nombres = this.nombres.value.trim();
  const usuario = this.usuario.value.trim();
  const contrasena = this.contrasena.value.trim();
  const confirmar = this.confirmar.value.trim();
  const gmail = this.gmail.value.trim();
  const telefono = this.telefono.value.trim();

  // Validar que las contraseñas coincidan
  if (contrasena !== confirmar) {
    alert("Las contraseñas no coinciden. Por favor, verifica.");
    return;
  }

  // Crear objeto usuario
  const nuevoUsuario = {
    nombres,
    usuario,
    contrasena,
    gmail,
    telefono
  };

  // Obtener usuarios existentes del localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar que el nombre de usuario no exista
  const existe = usuarios.some(u => u.usuario === usuario);
  if (existe) {
    alert("El nombre de usuario ya existe. Por favor, elige otro.");
    return;
  }

  // Agregar nuevo usuario
  usuarios.push(nuevoUsuario);

  // Guardar en localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("¡Registro exitoso!");

  // Redireccionar o limpiar formulario
  this.reset();
  window.location.href = "Iniciar seccion.html";
});
