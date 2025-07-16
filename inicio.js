/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contador = document.querySelector('.contador-carrito');
    if (!contador) return;
    
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        const carrito = JSON.parse(carritoGuardado);
        const totalItems = carrito.items.reduce((total, item) => total + item.cantidad, 0);
        
        if (totalItems > 0) {
            contador.textContent = totalItems;
            contador.classList.add('visible');
        } else {
            contador.classList.remove('visible');
        }
    }
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-carrito';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.classList.add('mostrar');
    }, 100);
    
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}

// Eventos para los botones añadir carrito
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    
    document.querySelectorAll('.btn-agregar-carrito').forEach(btn => {
        btn.addEventListener('click', function() {
            const producto = {
                id: this.getAttribute('data-id'),
                nombre: this.getAttribute('data-nombre'),
                precio: parseFloat(this.getAttribute('data-precio')),
                imagen: this.getAttribute('data-imagen')
            };
            
            if (typeof agregarAlCarrito === 'function') {
                agregarAlCarrito(producto);
            } else {
                let carrito = {
                    items: [],
                    subtotal: 0,
                    descuento: 0,
                    total: 0
                };
                
                const carritoGuardado = localStorage.getItem('carrito');
                if (carritoGuardado) {
                    carrito = JSON.parse(carritoGuardado);
                }
                
                const itemExistente = carrito.items.find(item => item.id === producto.id);
                
                if (itemExistente) {
                    itemExistente.cantidad += 1;
                } else {
                    carrito.items.push({
                        id: producto.id,
                        nombre: producto.nombre,
                        precio: producto.precio,
                        imagen: producto.imagen,
                        cantidad: 1
                    });
                }
                
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }
            
            actualizarContadorCarrito();
            mostrarNotificacion(`${producto.nombre} añadido al carrito`);
        });
    });
});
        function redirigir() {
            const palabra = document.getElementById("buscador").value.toLowerCase().trim();

            if (palabra.includes("guitarra")) {
                window.location.href = "GUITARRAS.html";
            } else if (palabra.includes("bajo")) {
                window.location.href = "BAJOS.html";
            } else if (palabra.includes("batería") || palabra.includes("bateria")) {
                window.location.href = "BATERIA.html";
            } else if (palabra.includes("teclado") || palabra.includes("piano")) {
                window.location.href = "PIANOS.html";
            } else if (palabra.includes("accesorio") || palabra.includes("accesorios")) {
                window.location.href = "accesorios.html";
            } else {
                alert("No se encontraron resultados para: " + palabra);
            }
        }