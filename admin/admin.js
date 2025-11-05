async function checkPassword() {
  const pass = document.getElementById("password").value;
  const botCheck = document.getElementById("bot-check").value;
  if (botCheck !== "3") {
    alert("❌ Respuesta incorrecta. ¿Eres un robot?");
    return;
  }

  try {
    const res = await fetch("https://backend-formulario.onrender.com/api/admin/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ password: pass })
    });

    const data = await res.json();

    if (data.success) {
      sessionStorage.setItem('adminToken', data.token);
      document.getElementById("login-form").style.display = "none";
      document.getElementById("panel").style.display = "block";
      cargarLeads();
    } else {
      alert("❌ Contraseña incorrecta");
    }
  } catch (error) {
    console.error("❌ Error al conectar:", error);
    alert("Hubo un error al verificar la contraseña.");
  }
}

async function cargarLeads() {
  try {
    const res = await fetch("https://backend-formulario.onrender.com/api/leads", {
      headers: {
        'x-admin-token': sessionStorage.getItem('adminToken')
      }
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    let leads = await res.json();

    // Filtrar por tipo de servicio
    const filtroTipo = document.getElementById("filtroTipo").value;
    if (filtroTipo) {
      leads = leads.filter(l => l.tipoServicio === filtroTipo);
    }

    // Filtrar por clasificación
    const filtroClasificacion = document.getElementById("filtroClasificacion").value;
    if (filtroClasificacion) {
      leads = leads.filter(l => l.clasificacionLead === filtroClasificacion);
    }

    const tbody = document.querySelector("#tabla-leads tbody");
    const total = document.getElementById("total");

    tbody.innerHTML = ""; 

    if (!leads.length) {
      tbody.innerHTML = "<tr><td colspan='5'>No hay leads que coincidan.</td></tr>";
      total.textContent = "0";
      return;
    }

    leads.forEach(lead => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${new Date(lead.fecha).toLocaleDateString()}</td>
        <td>${lead.nombreEmpresa || "-"}</td>
        <td>${lead.tipoServicio || "-"}</td>
        <td>${lead.correo || "-"}</td>
        <td>${lead.clasificacionLead || "-"}</td>
      `;
      tbody.appendChild(tr);
    });

    total.textContent = leads.length;

  } catch (error) {
    console.error("❌ Error al cargar leads:", error);
    alert("Hubo un error al cargar los leads. Revisa la consola.");
  }
}

// ✅ Función para exportar a CSV
function exportarCSV() {
  const rows = [
    ["Fecha", "Nombre", "Tipo de Servicio", "Correo", "Clasificación"]
  ];

  const tbody = document.querySelector("#tabla-leads tbody");
  Array.from(tbody.querySelectorAll("tr")).forEach(tr => {
    const cells = Array.from(tr.querySelectorAll("td")).map(td => td.innerText);
    rows.push(cells);
  });

  const csvContent = "text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `leads-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}