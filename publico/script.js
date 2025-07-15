document.getElementById("tipoServicio").addEventListener("change", function () {
  const tipo = this.value;

  document.getElementById("seccion-desarrollo-rediseño").style.display = "none";
  document.getElementById("seccion-rediseño-seo").style.display = "none";
  document.getElementById("seccion-productos-dominio").style.display = "none";
  document.getElementById("seccion-tienda").style.display = "none";

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
});


document.getElementById("tieneDiseno").addEventListener("change", function () {
  const disenoNo = document.getElementById("diseno-no");
  disenoNo.style.display = this.value === "no" ? "block" : "none";
});

document.getElementById("tieneSitio").addEventListener("change", function () {
  const sitioLink = document.getElementById("sitio-link");
  sitioLink.style.display = this.value === "si" ? "block" : "none";
});

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
// Obtener valores actuales del formulario para el resumen
function mostrarResumen() {
  const contenedor = document.getElementById("resumen");
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
    contenedor.innerHTML = "<p>⚠️ No se han completado campos aún.</p>";
    contenedor.style.display = "block";
    return;
  }

  const filas = campos.map(campo => `
    <tr>
      <td style="font-weight:bold; padding:5px;">${campo.label}</td>
      <td style="padding:5px;">${campo.value}</td>
    </tr>
  `).join("");

  const contenido = `
    <h3>📄 Informacion que estas por enviar al equipo de CX</h3>
    <table style="width:100%; border-collapse: collapse;">
      ${filas}
    </table>
  `;

  contenedor.innerHTML = contenido;
  contenedor.style.display = "block";
  contenedor.style.border = "2px solid #007bff";
  setTimeout(() => {
    contenedor.style.border = "none";
  }, 1000);
}


async function descargarPDF() {
  const { jsPDF } = window.jspdf; 
  const doc = new jsPDF();

  // Obtener valores actuales del formulario para el pdf de descarga
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

  // Filtrar solo campos con valor
  let campos = [];

  if (nombreEmpresa) campos.push({ label: "Nombre del Proyecto", value: nombreEmpresa });
  if (correo) campos.push({ label: "Correo Electrónico", value: correo });
  if (tipoServicio) campos.push({ label: "Tipo de Servicio", value: tipoServicio });

  // Solo si es desarrollo/rediseño/funcionalidades
  if (tipoServicio === "desarrollo" || tipoServicio === "rediseño" || tipoServicio === "funcionalidades") {
    if (objetivo) campos.push({ label: "Objetivo del Sitio", value: objetivo });
    if (funcionalidades) campos.push({ label: "Funcionalidades Solicitadas", value: funcionalidades });
    if (tieneDiseno) campos.push({ label: "¿Tiene diseño listo?", value: tieneDiseno });
    if (tieneDiseno === "no" && referenciasDiseno) campos.push({ label: "Referencias de Diseño", value: referenciasDiseno });
    if (tieneDiseno === "no" && manualMarca) campos.push({ label: "Manual de Marca", value: manualMarca });
  }

  // Sección Rediseño / SEO
  if (tipoServicio === "rediseño" || tipoServicio === "seo") {
    if (problemasTecnicos) campos.push({ label: "Problemas Técnicos", value: problemasTecnicos });
    if (accesosMateriales) campos.push({ label: "Accesos o Materiales", value: accesosMateriales });
  }

  // Datos del sitio actual
  if (tipoServicio === "desarrollo" || tipoServicio === "rediseño" || tipoServicio === "funcionalidades") {
    if (tieneSitio) campos.push({ label: "¿Ya tienes sitio web?", value: tieneSitio });
    if (tieneSitio === "si" && linkSitio) campos.push({ label: "Link del Sitio", value: linkSitio });
    if (accesoHosting) campos.push({ label: "Acceso al Hosting", value: accesoHosting });
  }

  // Sección Tienda Online
  if (tipoServicio === "desarrollo" || tipoServicio === "funcionalidades") {
    if (infoProductos) campos.push({ label: "Productos", value: infoProductos });
    if (linkProductos) campos.push({ label: "Link a Productos", value: linkProductos });
    if (correoVentas) campos.push({ label: "Correo de Ventas", value: correoVentas });
    if (mediosPago) campos.push({ label: "Medios de Pago", value: mediosPago });
    if (sistemaFacturacion) campos.push({ label: "Sistema de Facturación", value: sistemaFacturacion });
  }

  // Crear tabla para el PDF
  const headers = ["Campo", "Valor"];
  const data = campos.map(campo => [campo.label, campo.value]);
  doc.text("Resumen del Formulario", 10, 10);
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 20,
    theme: 'grid',
    styles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 80 }, 
    },
  });
  const finalY = doc.lastAutoTable.finalY || 20;
  const espacio = 15; 
  doc.setFontSize(10);
  doc.text("Si crees que te falto algo podes escribirnos este mail info@contenidx.com.ar", 10, finalY + espacio);
  doc.text("Gracias <3", 10, finalY + espacio + 7); 
  doc.text("Contenidx.com.ar", 10, finalY + espacio + 14); 

  doc.save("formulario_contenidx.pdf");
}


async function enviarDatos() {
  const data = {
    nombreEmpresa: document.getElementById("nombreEmpresa").value,
    correo: document.getElementById("correo").value,
    tipoServicio: document.getElementById("tipoServicio").value,
    objetivo: document.getElementById("objetivo").value,
    funcionalidades: document.getElementById("funcionalidades").value,
    tieneDiseno: document.getElementById("tieneDiseno").value,
    referenciasDiseno: document.getElementById("referenciasDiseno").value,
    manualMarca: document.getElementById("manualMarca").value,
    ayudaMediosPago: document.getElementById("ayudaMediosPago")?.value || "",
    problemasTecnicos: document.getElementById("problemasTecnicos").value,
    accesosMateriales: document.getElementById("accesosMateriales").value,
    tieneSitio: document.getElementById("tieneSitio").value,
    linkSitio: document.getElementById("linkSitio").value,
    accesoHosting: document.getElementById("accesoHosting").value,
    infoProductos: document.getElementById("infoProductos").value,
    linkProductos: document.getElementById("linkProductos").value,
    correoVentas: document.getElementById("correoVentas").value,
    mediosPago: document.getElementById("mediosPago").value,
    sistemaFacturacion: document.getElementById("sistemaFacturacion").value,
    infoComprador: document.getElementById("infoComprador")?.value || "",
    extrasTienda: document.getElementById("extrasTienda")?.value || "",
    ayudaExtra: document.getElementById("ayudaExtra")?.value || ""
  };
  if (!nombreEmpresa) {
    alert("⚠️ Por favor, ingresa el nombre del proyecto o empresa.");
    return;
  }

  if (!correo) {
    alert("⚠️ El correo electrónico es obligatorio.");
    return;
  }

  if (!isValidEmail(correo)) {
    alert("⚠️ Por favor, ingresa un correo electrónico válido.");
    return;
  }

  if (!tipoServicio) {
    alert("⚠️ Por favor, selecciona un tipo de servicio.");
    return;
  }
  const response = await fetch("/api/formulario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    alert("✅ ¡Gracias! Tu información ha sido enviada.");
  } else {
    alert("❌ Hubo un error al enviar tu formulario.");
  }
}
  
