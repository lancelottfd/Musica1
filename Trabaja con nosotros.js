/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.addEventListener("DOMContentLoaded", () => {
  // --- DATOS UBIGEO REDUCIDOS ---
  const departamentos = {
    arequipa: {
      arequipa: ["Cayma", "Cerro Colorado", "Miraflores", "Yanahuara"],
      camana: ["Ocoña", "Mariscal Cáceres"],
      islay: ["Mollendo", "Mejia"]
    },
    lima: {
      lima: ["Barranco", "Miraflores", "San Isidro", "Surco", "San Borja"],
      huaura: ["Huacho", "Hualmay"],
      callao: ["Bellavista", "La Perla"]
    },
    cusco: {
      cusco: ["Wanchaq", "San Sebastián", "Santiago"],
      urubamba: ["Ollantaytambo", "Maras"],
      canchis: ["Sicuani", "Combapata"]
    }
  };

  const depSelect = document.getElementById("departamento");
  const provSelect = document.getElementById("provincia");
  const distSelect = document.getElementById("distrito");

  // Cargar departamentos
  for (let dep in departamentos) {
    const option = new Option(capitalizar(dep), dep);
    depSelect.appendChild(option);
  }

  depSelect.addEventListener("change", () => {
    const dep = depSelect.value;
    provSelect.innerHTML = '<option value="">Seleccione...</option>';
    distSelect.innerHTML = '<option value="">Seleccione...</option>';

    if (departamentos[dep]) {
      for (let prov in departamentos[dep]) {
        const option = new Option(capitalizar(prov), prov);
        provSelect.appendChild(option);
      }
    }
  });

  provSelect.addEventListener("change", () => {
    const dep = depSelect.value;
    const prov = provSelect.value;
    distSelect.innerHTML = '<option value="">Seleccione...</option>';

    if (departamentos[dep] && departamentos[dep][prov]) {
      departamentos[dep][prov].forEach(dist => {
        const option = new Option(dist, dist.toLowerCase().replace(/\s+/g, "-"));
        distSelect.appendChild(option);
      });
    }
  });

  function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  // --- ENVÍO DEL FORMULARIO ---
  const form = document.querySelector(".form-section");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener datos
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const celular = document.getElementById("celular").value.trim();
    const departamento = depSelect.value;
    const provincia = provSelect.value;
    const distrito = distSelect.value;
    const sucursal = document.getElementById("sucursal").value;
    const tiempo = document.getElementById("tiempo").value;
    const puesto = document.getElementById("puesto").value;
    const conocimiento = document.getElementById("conocimiento").value;

    const horario1 = document.getElementById("horario1").checked;
    const horario2 = document.getElementById("horario2").checked;

    // Validaciones básicas
    if (!nombre || !apellido || !dni || !edad || !email || !celular || !departamento || !provincia || !distrito || !sucursal || !puesto) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("Correo electrónico no válido.");
      return;
    }

    if (localStorage.getItem(email)) {
      alert("Ya existe una solicitud registrada con este correo.");
      return;
    }

    const horarios = [];
    if (horario1) horarios.push("Mañana");
    if (horario2) horarios.push("Tarde");

    const solicitud = {
      nombre,
      apellido,
      dni,
      edad,
      email,
      celular,
      ubicacion: {
        departamento,
        provincia,
        distrito
      },
      sucursal,
      tiempo,
      puesto,
      conocimiento,
      horarios,
      fecha: new Date().toLocaleString()
    };

    localStorage.setItem(email, JSON.stringify(solicitud));
    alert("✅ ¡Solicitud enviada correctamente!");

    form.reset();
    provSelect.innerHTML = '<option value="">Seleccione...</option>';
    distSelect.innerHTML = '<option value="">Seleccione...</option>';
  });
});


