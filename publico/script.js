// Manejo de selección de tipo de servicio
document.querySelectorAll(".card-opcion").forEach(card => {
  card.addEventListener("click", function () {
    const tipo = card.dataset.tipo;

    // Ocultar todas las secciones
    document.getElementById("seccion-desarrollo-rediseño").style.display = "none";
    document.getElementById("seccion-rediseño-seo").style.display = "none";
    document.getElementById("seccion-productos-dominio").style.display = "none";
    document.getElementById("seccion-tienda").style.display = "none";
    document.getElementById("seccion-funcionalidades").style.display = "none";

    // Mostrar según tipo
    if (tipo === "desarrollo" || tipo === "rediseño") {
      document.getElementById("seccion-desarrollo-rediseño").style.display = "block";
      document.getElementById("seccion-tienda").style.display = "block";
      document.getElementById("seccion-productos-dominio").style.display = "block";
    }

    if (tipo === "rediseño" || tipo === "seo") {
      document.getElementById("seccion-rediseño-seo").style.display = "block";
    }

    if (tipo === "funcionalidades") {
      document.getElementById("seccion-productos-dominio").style.display = "block";
      document.getElementById("seccion-tienda").style.display = "block";
      document.getElementById("seccion-funcionalidades").style.display = "block";
    }

    function scrollToOffset(selector, offset = 0, behavior = "smooth") {
      const elemento = document.querySelector(selector);
      if (!elemento) return;
      const y = elemento.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: y, behavior });
    }

    if (["rediseño", "seo", "funcionalidades", "desarrollo"].includes(tipo)) {
      scrollToOffset("#scroll-ventana", -60);
    }

    document.getElementById("tipoServicio").value = tipo;
  });

  card.addEventListener('click', () => {
    document.querySelectorAll('.card-opcion').forEach(c => c.classList.remove('activo'));
    card.classList.add('activo');
  });
});

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.target.classList.contains("selected")) {
      mutation.target.scrollIntoView({ behavior: "smooth" });
    }
  }
});

document.querySelectorAll(".card-opcion").forEach(card => {
  observer.observe(card, { attributes: true });
});

// Manejo de campos condicionales
document.getElementById("tieneDiseno").addEventListener("sl-change", function () {
  const disenoNo = document.getElementById("diseno-no");
  disenoNo.style.display = this.value === "no" ? "block" : "none";
});

document.getElementById("tieneSitio").addEventListener("sl-change", function () {
  const sitioLink = document.getElementById("sitio-link");
  sitioLink.style.display = this.value === "si" ? "block" : "none";
});

// Validaciones
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Genera el contenido del resumen en el modal
function generarContenidoResumen() {
  const contenidoResumen = document.getElementById("contenidoResumen");

  const nombreEmpresa = document.getElementById("nombreEmpresa").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const tipoServicio = document.getElementById("tipoServicio").value.trim();
  const objetivo = document.getElementById("objetivo")?.value.trim() || "";
  const funcionalidades = document.getElementById("funcionalidades")?.value.trim() || "";
  const tieneDiseno = document.getElementById("tieneDiseno")?.value.trim() || "";
  const referenciasDiseno = document.getElementById("referenciasDiseno")?.value.trim() || "";
  const manualMarca = document.getElementById("manualMarca")?.value.trim() || "";
  const problemasTecnicos = document.getElementById("problemasTecnicos")?.value.trim() || "";
  const accesosMateriales = document.getElementById("accesosMateriales")?.value.trim() || "";
  const tieneSitio = document.getElementById("tieneSitio")?.value.trim() || "";
  const linkSitio = document.getElementById("linkSitio")?.value.trim() || "";
  const accesoHosting = document.getElementById("accesoHosting")?.value.trim() || "";
  const infoProductos = document.getElementById("infoProductos")?.value.trim() || "";
  const linkProductos = document.getElementById("linkProductos")?.value.trim() || "";
  const correoVentas = document.getElementById("correoVentas")?.value.trim() || "";
  const mediosPago = document.getElementById("mediosPago")?.value.trim() || "";
  const sistemaFacturacion = document.getElementById("sistemaFacturacion")?.value.trim() || "";

  let campos = [];

  if (nombreEmpresa) campos.push({ label: "Nombre del Proyecto", value: nombreEmpresa });
  if (correo) campos.push({ label: "Correo Electrónico", value: correo });
  if (tipoServicio) campos.push({ label: "Tipo de Servicio", value: tipoServicio });

  if (tipoServicio === "desarrollo" || tipoServicio === "rediseño" || tipoServicio === "funcionalidades") {
    if (objetivo) campos.push({ label: "Objetivo del Sitio", value: objetivo });
    if (funcionalidades) campos.push({ label: "Funcionalidades Solicitadas", value: funcionalidades });
    if (tieneDiseno) campos.push({ label: "¿Tiene diseño listo?", value: tieneDiseno });
    if (tieneDiseno === "no" && referenciasDiseno) campos.push({ label: "Referencias de Diseño", value: referenciasDiseno });
    if (tieneDiseno === "no" && manualMarca) campos.push({ label: "Manual de Marca", value: manualMarca });
  }

  if (tipoServicio === "rediseño" || tipoServicio === "seo") {
    if (problemasTecnicos) campos.push({ label: "Problemas Técnicos", value: problemasTecnicos });
    if (accesosMateriales) campos.push({ label: "Accesos o Materiales", value: accesosMateriales });
  }

  if (tipoServicio === "desarrollo" || tipoServicio === "rediseño" || tipoServicio === "funcionalidades") {
    if (tieneSitio) campos.push({ label: "¿Ya tienes sitio web?", value: tieneSitio });
    if (tieneSitio === "si" && linkSitio) campos.push({ label: "Link del Sitio", value: linkSitio });
    if (accesoHosting) campos.push({ label: "Acceso al Hosting", value: accesoHosting });
  }

  if (tipoServicio === "desarrollo" || tipoServicio === "funcionalidades") {
    if (infoProductos) campos.push({ label: "Productos", value: infoProductos });
    if (linkProductos) campos.push({ label: "Link a Productos", value: linkProductos });
    if (correoVentas) campos.push({ label: "Correo de Ventas", value: correoVentas });
    if (mediosPago) campos.push({ label: "Medios de Pago", value: mediosPago });
    if (sistemaFacturacion) campos.push({ label: "Sistema de Facturación", value: sistemaFacturacion });
  }

  if (campos.length === 0) {
    contenidoResumen.innerHTML = '<p style="color: #666; text-align: center;">⚠️ No se han completado campos aún.</p>';
    return;
  }

  const filas = campos.map(campo => `
    <tr>
      <td style="font-weight:bold; padding:8px 10px;"><strong>${campo.label}</strong></td>
      <td style="padding:8px 10px;">${campo.value}</td>
    </tr>
  `).join('');

  contenidoResumen.innerHTML = `
    <table style="width:100%; border-collapse: collapse;">
      ${filas}
    </table>
  `;
}

// Abre el modal y genera el contenido
function abrirModalResumen() {
  const modal = document.getElementById('modalResumen');
  if (!modal) return;

  generarContenidoResumen(); // Llena el contenido
  modal.style.display = 'block'; // Muestra el modal
}

// Cierra el modal
function cerrarModal() {
  const modal = document.getElementById('modalResumen');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Descargar PDF
async function descargarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Incorporar membrete
  const cargaMembrete = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    });
  };
  const membrete = await cargaMembrete('./assets/img/membrete-2.jpg');
  doc.addImage(membrete, 'JPEG', 0, 0, 210, 27);

  // Obtener datos para el PDF
  const nombreEmpresa = document.getElementById("nombreEmpresa").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const tipoServicio = document.getElementById("tipoServicio").value.trim();
  const objetivo = document.getElementById("objetivo")?.value.trim() || "";
  const funcionalidades = document.getElementById("funcionalidades")?.value.trim() || "";
  const tieneDiseno = document.getElementById("tieneDiseno")?.value.trim() || "";
  const referenciasDiseno = document.getElementById("referenciasDiseno")?.value.trim() || "";
  const manualMarca = document.getElementById("manualMarca")?.value.trim() || "";
  const problemasTecnicos = document.getElementById("problemasTecnicos")?.value.trim() || "";
  const accesosMateriales = document.getElementById("accesosMateriales")?.value.trim() || "";
  const tieneSitio = document.getElementById("tieneSitio")?.value.trim() || "";
  const linkSitio = document.getElementById("linkSitio")?.value.trim() || "";
  const accesoHosting = document.getElementById("accesoHosting")?.value.trim() || "";
  const infoProductos = document.getElementById("infoProductos")?.value.trim() || "";
  const linkProductos = document.getElementById("linkProductos")?.value.trim() || "";
  const correoVentas = document.getElementById("correoVentas")?.value.trim() || "";
  const mediosPago = document.getElementById("mediosPago")?.value.trim() || "";
  const sistemaFacturacion = document.getElementById("sistemaFacturacion")?.value.trim() || "";

  // Crear tabla
  const headers = ["Consulta", "Respuesta"];
  const data = [
    ['Nombre del Proyecto', nombreEmpresa],
    ['Correo Electrónico', correo],
    ['Tipo de Servicio', tipoServicio],
    ['Objetivo del Sitio', objetivo],
    ['Funcionalidades Solicitadas', funcionalidades],
    ['¿Tiene diseño listo?', tieneDiseno],
    ['Referencias de Diseño', referenciasDiseno],
    ['Manual de Marca', manualMarca],
    ['Problemas Técnicos', problemasTecnicos],
    ['Accesos o Materiales', accesosMateriales],
    ['¿Ya tienes sitio web?', tieneSitio],
    ['Link del Sitio', linkSitio],
    ['Acceso al Hosting', accesoHosting],
    ['Productos', infoProductos],
    ['Link a Productos', linkProductos],
    ['Correo de Ventas', correoVentas],
    ['Medios de Pago', mediosPago],
    ['Sistema de Facturación', sistemaFacturacion]
  ].filter(([_, value]) => value); // Solo campos con valor

  doc.text("Resumen del Formulario", 10, 35);
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 40,
    theme: 'grid',
    styles: { fontSize: 9 },
    columnStyles: { 0: { cellWidth: 80, fontStyle: 'bold' }, 1: { cellWidth: 100 } }
  });

  const finalY = doc.lastAutoTable.finalY || 20;
  const espacio = 15;
  doc.setFontSize(10);
  doc.text("Si crees que te falto algo podes escribirnos este mail info@contenidx.com.ar", 10, finalY + espacio);
  doc.text("Gracias <3", 10, finalY + espacio + 7);
  doc.text("contenidx.com.ar", 10, finalY + espacio + 14);

  doc.save("formulario_contenidx.pdf");
}

// Envío del formulario
async function enviarDatos() {
  const nombreEmpresa = document.getElementById("nombreEmpresa").value.trim();
  const inputEmpresa = document.getElementById("nombreEmpresa");
  const correo = document.getElementById("correo").value.trim();
  const tipoServicio = document.getElementById("tipoServicio").value.trim();

  if (!nombreEmpresa) {
    mostrarAlerta("⚠️ Por favor, ingresa el nombre del proyecto o empresa.");
    inputEmpresa.classList.add('acento');
    setTimeout(() => window.scrollTo(0, 0), 900);

    const inputInterno = inputEmpresa.shadowRoot.querySelector('input');
    inputInterno.addEventListener('input', () => inputEmpresa.classList.remove('acento'));
    inputInterno.addEventListener('focus', () => inputEmpresa.classList.remove('acento'));

    return false;
  }

  if (!correo) {
    mostrarAlerta("⚠️ El correo electrónico es obligatorio.");
    return false;
  }

  if (!isValidEmail(correo)) {
    mostrarAlerta("⚠️ Por favor, ingresa un correo electrónico válido.");
    return false;
  }

  if (!tipoServicio) {
    mostrarAlerta("⚠️ Por favor, selecciona un tipo de servicio.");
    return false;
  }

  const data = {
    nombreEmpresa,
    correo,
    tipoServicio,
    objetivo: document.getElementById("objetivo")?.value.trim() || "",
    funcionalidades: document.getElementById("funcionalidades")?.value.trim() || "",
    tieneDiseno: document.getElementById("tieneDiseno")?.value.trim() || "",
    referenciasDiseno: document.getElementById("referenciasDiseno")?.value.trim() || "",
    manualMarca: document.getElementById("manualMarca")?.value.trim() || "",
    ayudaMediosPago: document.getElementById("ayudaMediosPago")?.value.trim() || "",
    problemasTecnicos: document.getElementById("problemasTecnicos")?.value.trim() || "",
    accesosMateriales: document.getElementById("accesosMateriales")?.value.trim() || "",
    tieneSitio: document.getElementById("tieneSitio")?.value.trim() || "",
    linkSitio: document.getElementById("linkSitio")?.value.trim() || "",
    accesoHosting: document.getElementById("accesoHosting")?.value.trim() || "",
    infoProductos: document.getElementById("infoProductos")?.value.trim() || "",
    linkProductos: document.getElementById("linkProductos")?.value.trim() || "",
    correoVentas: document.getElementById("correoVentas")?.value.trim() || "",
    mediosPago: document.getElementById("mediosPago")?.value.trim() || "",
    sistemaFacturacion: document.getElementById("sistemaFacturacion")?.value.trim() || "",
    infoComprador: document.getElementById("infoComprador")?.value.trim() || "",
    extrasTienda: document.getElementById("extrasTienda")?.value.trim() || "",
    ayudaExtra: document.getElementById("ayudaExtra")?.value.trim() || ""
  };

  try {
    const response = await fetch("https://formulario-dinamico.onrender.com/api/formulario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      mostrarAlertaExito("✅ ¡Gracias! Tu información ha sido enviada.");
      return true;
    } else {
      mostrarAlerta("❌ Hubo un error al enviar tu formulario.");
      return false;
    }
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    mostrarAlerta("❌ Tenemos algunas fallas, escribinos al WPP!.");
    return false;
  }
}

// Alertas con Shoelace
async function mostrarAlerta(mensaje, tipo = 'warning') {
  const alert = document.createElement('sl-alert');
  alert.variant = tipo;
  alert.closable = true;
  alert.duration = 3000;
  alert.innerHTML = mensaje;
  document.body.appendChild(alert);
  await customElements.whenDefined('sl-alert');
  alert.show();
  alert.toast();
}

async function mostrarAlertaExito(mensaje, tipo = 'success') {
  const alert = document.createElement('sl-alert');
  alert.variant = tipo;
  alert.closable = true;
  alert.duration = 3000;
  alert.innerHTML = mensaje;
  document.body.appendChild(alert);
  await customElements.whenDefined('sl-alert');
  alert.show();
  alert.toast();
}

// Exponer funciones al global para onclick
window.abrirModalResumen = abrirModalResumen;
window.cerrarModal = cerrarModal;
window.descargarPDF = descargarPDF;
window.enviarDatos = enviarDatos;

// Evento del botón Enviar
document.addEventListener("DOMContentLoaded", () => {
  const btnEnviar = document.getElementById('btnEnviar');
  if (btnEnviar) {
    btnEnviar.addEventListener('click', async () => {
      btnEnviar.innerHTML = '<sl-spinner></sl-spinner>';
      btnEnviar.disabled = true;

      const exito = await enviarDatos();

      btnEnviar.innerHTML = '<sl-icon slot="suffix" name="arrow-right-square"></sl-icon> Enviar';
      btnEnviar.disabled = false;

      if (exito) {
        setTimeout(() => {
          location.reload();
          window.scrollTo(0, 0);
        }, 1500);
      }
    });
  }

  // Cerrar modal al hacer clic fuera
  const modal = document.getElementById('modalResumen');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        cerrarModal();
      }
    });
  }
});